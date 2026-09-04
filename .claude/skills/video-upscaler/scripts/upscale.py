#!/usr/bin/env python3
"""Local AI video upscaler built on Real-ESRGAN (ONNX Runtime, CPU or GPU).

Decodes a video to frames, runs each frame through a super-resolution network,
and re-encodes at the target resolution. Audio and frame timing are preserved.

Everything runs on this machine: no API keys, no upload, no per-minute billing.

    python3 upscale.py in.mp4 out.mp4 --height 1440

Long jobs are resumable. Upscaled frames are written to a work directory as
they finish, and re-running the same command skips the ones already done.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import os
import shutil
import subprocess
import sys
import time
import urllib.request
from dataclasses import dataclass
from pathlib import Path

import numpy as np

# Real-ESRGAN weights converted to ONNX. Pinned by digest so a swapped or
# truncated download is caught before it silently degrades output.
MODELS = {
    "realesrgan-x2": {
        "url": "https://huggingface.co/SceneWorks/real-esrgan-onnx/resolve/main/real_esrgan_x2.onnx",
        "sha256": "7115ba92e8a1bfa63d68558ef006ef3d91273a068d321b1439f8bb1c9179002c",
        "scale": 2,
    },
    "realesrgan-x4": {
        "url": "https://huggingface.co/SceneWorks/real-esrgan-onnx/resolve/main/real_esrgan_x4.onnx",
        # Filled in on first download; see _verify_digest.
        "sha256": None,
        "scale": 4,
    },
}

DEFAULT_MODEL_DIR = Path(
    os.environ.get("VIDEO_UPSCALER_MODELS", Path.home() / ".cache" / "video-upscaler")
)


def log(msg: str) -> None:
    print(msg, file=sys.stderr, flush=True)


# --------------------------------------------------------------------------
# ffmpeg discovery
# --------------------------------------------------------------------------

def find_ffmpeg() -> str:
    """Locate an ffmpeg binary, preferring one already on PATH."""
    exe = shutil.which("ffmpeg")
    if exe:
        return exe
    try:
        import imageio_ffmpeg

        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        pass
    sys.exit(
        "ffmpeg not found. Install it, or: pip install imageio-ffmpeg"
    )


def find_ffprobe(ffmpeg: str) -> str | None:
    exe = shutil.which("ffprobe")
    if exe:
        return exe
    cand = Path(ffmpeg).with_name("ffprobe")
    return str(cand) if cand.exists() else None


# --------------------------------------------------------------------------
# Source probing
# --------------------------------------------------------------------------

@dataclass
class SourceInfo:
    width: int
    height: int
    fps: str          # exact rational, e.g. "24/1" — never rounded to float
    duration: float
    nframes: int
    has_audio: bool


def probe(path: Path, ffmpeg: str) -> SourceInfo:
    """Read stream geometry. Uses ffprobe when available, else parses ffmpeg."""
    ffprobe = find_ffprobe(ffmpeg)
    if ffprobe:
        out = subprocess.run(
            [ffprobe, "-v", "error", "-print_format", "json",
             "-show_streams", "-show_format", str(path)],
            capture_output=True, text=True, check=True,
        ).stdout
        data = json.loads(out)
        streams = data.get("streams", [])
        v = next((s for s in streams if s.get("codec_type") == "video"), None)
        if v is None:
            sys.exit(f"No video stream in {path}")
        has_audio = any(s.get("codec_type") == "audio" for s in streams)
        fps = v.get("r_frame_rate") or "25/1"
        duration = float(data.get("format", {}).get("duration") or 0.0)
        nb = v.get("nb_frames")
        if nb and nb.isdigit() and int(nb) > 0:
            nframes = int(nb)
        else:
            num, _, den = fps.partition("/")
            rate = float(num) / float(den or 1)
            nframes = int(round(duration * rate))
        return SourceInfo(int(v["width"]), int(v["height"]), fps,
                          duration, nframes, has_audio)

    # ffprobe absent (e.g. the imageio-ffmpeg static build ships ffmpeg only).
    proc = subprocess.run([ffmpeg, "-hide_banner", "-i", str(path)],
                          capture_output=True, text=True)
    text = proc.stderr
    import re

    m = re.search(r"Video:.*?, (\d+)x(\d+)", text)
    if not m:
        sys.exit(f"Could not determine video dimensions for {path}")
    w, h = int(m.group(1)), int(m.group(2))
    fm = re.search(r"(\d+(?:\.\d+)?) fps", text)
    rate = float(fm.group(1)) if fm else 25.0
    fps = f"{round(rate * 1000)}/1000"
    dm = re.search(r"Duration: (\d+):(\d+):(\d+\.\d+)", text)
    duration = (int(dm.group(1)) * 3600 + int(dm.group(2)) * 60
                + float(dm.group(3))) if dm else 0.0
    has_audio = "Audio:" in text
    return SourceInfo(w, h, fps, duration, int(round(duration * rate)), has_audio)


# --------------------------------------------------------------------------
# Model handling
# --------------------------------------------------------------------------

def _sha256(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def _verify_digest(path: Path, expected: str | None, name: str) -> None:
    actual = _sha256(path)
    if expected is None:
        log(f"  note: no pinned digest for {name}; downloaded sha256={actual}")
        return
    if actual != expected:
        path.unlink(missing_ok=True)
        sys.exit(
            f"Model digest mismatch for {name}.\n"
            f"  expected {expected}\n  got      {actual}\n"
            "Refusing to run on unverified weights."
        )


def ensure_model(name: str, model_dir: Path) -> tuple[Path, int]:
    if name not in MODELS:
        sys.exit(f"Unknown model {name!r}. Choose from: {', '.join(MODELS)}")
    spec = MODELS[name]
    model_dir.mkdir(parents=True, exist_ok=True)
    dest = model_dir / f"{name}.onnx"
    if not dest.exists():
        log(f"Fetching {name} -> {dest}")
        tmp = dest.with_suffix(".part")
        try:
            with urllib.request.urlopen(spec["url"], timeout=300) as r, open(tmp, "wb") as fh:
                shutil.copyfileobj(r, fh)
        except Exception as exc:
            tmp.unlink(missing_ok=True)
            sys.exit(f"Could not download {name}: {exc}")
        _verify_digest(tmp, spec["sha256"], name)
        tmp.rename(dest)
    else:
        _verify_digest(dest, spec["sha256"], name)
    return dest, spec["scale"]


class Upscaler:
    """Tiled super-resolution over an ONNX Real-ESRGAN graph.

    Tiles overlap and are blended with a linear feather so seams do not show.
    Tiling also bounds peak memory, which is what lets 4K sources run in a
    couple of GB instead of tens.
    """

    def __init__(self, model_path: Path, scale: int, tile: int, overlap: int,
                 threads: int):
        import onnxruntime as ort

        opts = ort.SessionOptions()
        opts.intra_op_num_threads = threads
        opts.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL
        providers = [p for p in ("CUDAExecutionProvider", "CPUExecutionProvider")
                     if p in ort.get_available_providers()]
        self.sess = ort.InferenceSession(str(model_path), opts, providers=providers)
        self.input_name = self.sess.get_inputs()[0].name
        self.scale = scale
        self.tile = tile
        self.overlap = overlap
        self.provider = self.sess.get_providers()[0]

    def _run(self, chunk: np.ndarray) -> np.ndarray:
        out = self.sess.run(None, {self.input_name: chunk})[0]
        return out[0]

    def upscale(self, img: np.ndarray) -> np.ndarray:
        """img: HxWx3 uint8 -> (H*scale)x(W*scale)x3 uint8."""
        h, w, _ = img.shape
        x = img.astype(np.float32).transpose(2, 0, 1)[None] / 255.0
        s = self.scale

        if self.tile <= 0 or (h <= self.tile and w <= self.tile):
            out = self._run(x)
        else:
            stride = max(1, self.tile - self.overlap)
            acc = np.zeros((3, h * s, w * s), dtype=np.float32)
            wsum = np.zeros((1, h * s, w * s), dtype=np.float32)
            ys = list(range(0, max(1, h - self.overlap), stride))
            xs = list(range(0, max(1, w - self.overlap), stride))
            for y0 in ys:
                for x0 in xs:
                    y1 = min(y0 + self.tile, h)
                    x1 = min(x0 + self.tile, w)
                    # Keep edge tiles full-size by pulling their origin back,
                    # so every tile sees the same context the model expects.
                    y0a = max(0, y1 - self.tile)
                    x0a = max(0, x1 - self.tile)
                    patch = x[:, :, y0a:y1, x0a:x1]
                    res = self._run(patch)
                    ph, pw = y1 - y0a, x1 - x0a
                    mask = self._feather(ph * s, pw * s,
                                         left=x0a > 0, top=y0a > 0,
                                         right=x1 < w, bottom=y1 < h)
                    acc[:, y0a * s:y1 * s, x0a * s:x1 * s] += res * mask
                    wsum[:, y0a * s:y1 * s, x0a * s:x1 * s] += mask
            out = acc / np.maximum(wsum, 1e-8)

        out = np.clip(out.transpose(1, 2, 0), 0.0, 1.0)
        return (out * 255.0 + 0.5).astype(np.uint8)

    def _feather(self, h: int, w: int, left: bool, top: bool,
                 right: bool, bottom: bool) -> np.ndarray:
        """Linear ramp on interior edges only; frame borders stay at full weight."""
        ramp = max(1, self.overlap * self.scale)
        wy = np.ones(h, dtype=np.float32)
        wx = np.ones(w, dtype=np.float32)
        r = np.linspace(0.0, 1.0, ramp, dtype=np.float32)
        if top:
            wy[:ramp] = np.minimum(wy[:ramp], r)
        if bottom:
            wy[-ramp:] = np.minimum(wy[-ramp:], r[::-1])
        if left:
            wx[:ramp] = np.minimum(wx[:ramp], r)
        if right:
            wx[-ramp:] = np.minimum(wx[-ramp:], r[::-1])
        return (wy[:, None] * wx[None, :])[None, :, :]


# --------------------------------------------------------------------------
# Pipeline
# --------------------------------------------------------------------------

def extract_frames(ffmpeg: str, src: Path, out_dir: Path, expected: int) -> list[Path]:
    out_dir.mkdir(parents=True, exist_ok=True)
    existing = sorted(out_dir.glob("f_*.png"))
    if existing and (expected <= 0 or len(existing) >= expected):
        log(f"Reusing {len(existing)} extracted frames")
        return existing
    for p in existing:
        p.unlink()
    log("Extracting frames...")
    subprocess.run(
        [ffmpeg, "-hide_banner", "-loglevel", "error", "-y", "-i", str(src),
         "-vsync", "0", str(out_dir / "f_%06d.png")],
        check=True,
    )
    frames = sorted(out_dir.glob("f_*.png"))
    if not frames:
        sys.exit("Frame extraction produced no frames")
    log(f"Extracted {len(frames)} frames")
    return frames


def fit_to_target(img: np.ndarray, tw: int, th: int) -> np.ndarray:
    """Resample to the exact target when the model's integer scale overshoots."""
    from PIL import Image

    if img.shape[1] == tw and img.shape[0] == th:
        return img
    return np.asarray(
        Image.fromarray(img).resize((tw, th), Image.LANCZOS), dtype=np.uint8
    )


def encode(ffmpeg: str, frame_dir: Path, out: Path, info: SourceInfo,
           src: Path, crf: int, preset: str, keep_audio: bool) -> None:
    log("Encoding...")
    cmd = [ffmpeg, "-hide_banner", "-loglevel", "error", "-stats", "-y",
           "-framerate", info.fps, "-i", str(frame_dir / "u_%06d.png")]
    if keep_audio and info.has_audio:
        cmd += ["-i", str(src), "-map", "0:v:0", "-map", "1:a:0",
                "-c:a", "copy", "-shortest"]
    cmd += ["-c:v", "libx264", "-preset", preset, "-crf", str(crf),
            "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(out)]
    subprocess.run(cmd, check=True)


def human(sec: float) -> str:
    sec = int(sec)
    h, m, s = sec // 3600, (sec % 3600) // 60, sec % 60
    return f"{h}h{m:02d}m" if h else (f"{m}m{s:02d}s" if m else f"{s}s")


def main() -> None:
    ap = argparse.ArgumentParser(
        description="AI-upscale a video locally with Real-ESRGAN.")
    ap.add_argument("input")
    ap.add_argument("output")
    g = ap.add_mutually_exclusive_group()
    g.add_argument("--height", type=int,
                   help="target height, e.g. 1440 (width follows aspect)")
    g.add_argument("--scale", type=float, help="target multiplier, e.g. 2")
    ap.add_argument("--model", default="realesrgan-x2", choices=sorted(MODELS))
    ap.add_argument("--tile", type=int, default=384,
                    help="tile size; 0 for whole-frame (more RAM)")
    ap.add_argument("--overlap", type=int, default=24)
    ap.add_argument("--threads", type=int, default=os.cpu_count() or 4)
    ap.add_argument("--crf", type=int, default=16)
    ap.add_argument("--preset", default="slow")
    ap.add_argument("--workdir", default=None,
                    help="scratch dir for frames (default: alongside output)")
    ap.add_argument("--keep-workdir", action="store_true")
    ap.add_argument("--no-audio", action="store_true")
    ap.add_argument("--model-dir", default=str(DEFAULT_MODEL_DIR))
    ap.add_argument("--limit", type=int, default=0,
                    help="process only the first N frames (for a quick test)")
    args = ap.parse_args()

    src = Path(args.input).expanduser()
    if not src.exists():
        sys.exit(f"No such file: {src}")
    out = Path(args.output).expanduser()
    out.parent.mkdir(parents=True, exist_ok=True)

    ffmpeg = find_ffmpeg()
    info = probe(src, ffmpeg)
    log(f"Source: {info.width}x{info.height}  {info.fps} fps  "
        f"{info.duration:.2f}s  ~{info.nframes} frames  "
        f"audio={'yes' if info.has_audio else 'no'}")

    if args.height:
        th = args.height
        tw = int(round(info.width * th / info.height))
        tw -= tw % 2
    elif args.scale:
        tw = int(round(info.width * args.scale)) & ~1
        th = int(round(info.height * args.scale)) & ~1
    else:
        tw, th = info.width * 2, info.height * 2

    model_path, mscale = ensure_model(args.model, Path(args.model_dir).expanduser())
    need = max(tw / info.width, th / info.height)
    if need > mscale + 1e-6:
        log(f"  warning: target is {need:.2f}x but {args.model} produces "
            f"{mscale}x; the remainder is a lanczos resize, not AI detail.")
    log(f"Target: {tw}x{th}  (model {args.model}, {mscale}x)")

    work = Path(args.workdir).expanduser() if args.workdir else \
        out.parent / f".{out.stem}_upscale_work"
    work.mkdir(parents=True, exist_ok=True)
    raw_dir, up_dir = work / "src", work / "up"
    up_dir.mkdir(parents=True, exist_ok=True)

    frames = extract_frames(ffmpeg, src, raw_dir, info.nframes)
    if args.limit:
        frames = frames[:args.limit]

    up = Upscaler(model_path, mscale, args.tile, args.overlap, args.threads)
    log(f"Runtime: {up.provider}, {args.threads} threads, "
        f"tile={args.tile} overlap={args.overlap}")

    from PIL import Image

    todo = [(i, f) for i, f in enumerate(frames, 1)
            if not (up_dir / f"u_{i:06d}.png").exists()]
    done_already = len(frames) - len(todo)
    if done_already:
        log(f"Resuming: {done_already} frames already upscaled")

    t0 = time.time()
    for n, (idx, fpath) in enumerate(todo, 1):
        img = np.asarray(Image.open(fpath).convert("RGB"), dtype=np.uint8)
        big = up.upscale(img)
        big = fit_to_target(big, tw, th)
        Image.fromarray(big).save(up_dir / f"u_{idx:06d}.png", compress_level=1)
        el = time.time() - t0
        rate = el / n
        log(f"  frame {done_already + n}/{len(frames)}  "
            f"{rate:.1f}s/frame  elapsed {human(el)}  "
            f"eta {human(rate * (len(todo) - n))}")

    produced = sorted(up_dir.glob("u_*.png"))
    if not produced:
        sys.exit("No upscaled frames were produced")
    if args.limit and len(produced) < len(frames):
        log("note: --limit set, encoding a partial clip")

    encode(ffmpeg, up_dir, out, info, src, args.crf, args.preset,
           keep_audio=not args.no_audio)

    if not args.keep_workdir:
        shutil.rmtree(work, ignore_errors=True)

    size = out.stat().st_size / 1048576
    log(f"\nDone: {out}  ({tw}x{th}, {size:.1f} MB, "
        f"total {human(time.time() - t0)})")


if __name__ == "__main__":
    main()
