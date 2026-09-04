---
name: video-upscaler
version: 2.0.0
display_name: Video Upscaler
description: "AI-upscale video locally with Real-ESRGAN. Runs on this machine via ONNX Runtime - no API keys, no upload, no per-minute billing."
tags: [video, upscale, enhance, real-esrgan, super-resolution, onnx, ffmpeg]
---

## What this does

Upscales video using a real super-resolution neural network (Real-ESRGAN),
running entirely on the local machine through ONNX Runtime. It reconstructs
detail rather than interpolating between existing pixels, which is the
difference between this and an `ffmpeg scale` filter.

Everything is local. No API key, no account, nothing uploaded, no per-minute
cost. The tradeoff is compute time — see **Performance** before starting a job.

## Usage

```bash
python3 scripts/upscale.py INPUT OUTPUT --height 1440
```

Common options:

| Flag | Default | Meaning |
| :--- | :--- | :--- |
| `--height N` | — | Target height; width follows the source aspect ratio |
| `--scale N` | — | Target multiplier instead of a height (`--scale 2`) |
| `--model` | `realesrgan-x2` | `realesrgan-x2` or `realesrgan-x4` |
| `--tile N` | `384` | Tile size; `0` processes whole frames (more RAM) |
| `--overlap N` | `24` | Tile overlap, blended with a linear feather |
| `--threads N` | all cores | Inference threads |
| `--crf N` | `16` | x264 quality; lower is better and larger |
| `--limit N` | `0` | Process only the first N frames — use this to test first |
| `--no-audio` | off | Drop the audio track instead of copying it |
| `--keep-workdir` | off | Keep intermediate frames after finishing |

**Always dry-run with `--limit 3` first.** It exercises the whole pipeline in
a couple of minutes and tells you the real per-frame cost before you commit to
a long job.

## Requirements

```bash
pip install onnxruntime numpy pillow imageio-ffmpeg
```

`ffmpeg` is used from `PATH` if present; otherwise the static binary from
`imageio-ffmpeg` is used automatically. Weights download on first run to
`~/.cache/video-upscaler` (override with `--model-dir` or
`$VIDEO_UPSCALER_MODELS`) and are verified against a pinned SHA-256 — a
truncated or swapped download aborts the run rather than quietly degrading
output.

## How it works

1. **Probe** the source for geometry, exact rational frame rate, and audio.
2. **Extract** frames to PNG.
3. **Upscale** each frame through Real-ESRGAN in overlapping tiles, blended
   with a linear feather so tile seams do not appear.
4. **Fit** to the exact target if the model's integer scale overshoots (the
   remainder is a Lanczos resize — the tool warns when this happens).
5. **Encode** with x264 at the source's exact frame rate, copying audio through.

Tiling is what bounds peak memory: 720p at `--tile 384` peaks near 1 GB where
whole-frame inference needs about 2.8 GB, and the gap widens with resolution.

**Resumable.** Upscaled frames are written as they finish, and re-running the
same command skips completed frames. A multi-hour job that dies picks up where
it stopped rather than starting over.

## Performance

Measured on 4 cores of an Intel Xeon @ 2.10GHz, no GPU, `realesrgan-x2`:

| Source | Per frame | 10s @ 24fps (240 frames) |
| :--- | :--- | :--- |
| 720p → 1440p, `--tile 384` | ~30 s | ~2 hours |
| 720p → 1440p, whole-frame | ~32 s | ~2.1 hours |

This is CPU-bound and scales roughly with pixel count. A CUDA GPU changes the
picture completely — ONNX Runtime picks `CUDAExecutionProvider` automatically
when `onnxruntime-gpu` is installed, typically a 20–50x speedup.

Plan accordingly: this is well suited to short clips and overnight batches, and
poorly suited to anything feature-length on CPU.

## Limitations

- **Real-ESRGAN is a single-frame model.** It has no temporal awareness, so it
  cannot enforce consistency across frames the way a video-native model
  (SeedVR2, Topaz Astra) does. On most footage this is invisible; on fine
  moving texture it can shimmer slightly between frames.
- **It cannot exceed its training.** Heavy compression artifacts, motion blur,
  and genuinely missing detail are not recoverable.
- **Detail is plausible, not true.** A generative upscaler invents detail
  consistent with its training data. Do not use it where the output must be
  forensically faithful to the source.
- **`realesrgan-x2` is the quality choice for 2x.** Using `realesrgan-x4` and
  downscaling is slower and generally not better for a 2x target.

## History

Version 1.0.0 of this skill (from `wells1137/media-skills`) was documentation
only: it described a `fal.ai`-backed HTTP service but shipped no
implementation, and every endpoint pointed at a `http://<your_backend_url>`
placeholder. It could not run. This version replaces it with a working local
pipeline. The original is preserved in this repository's git history.

If you specifically want the hosted Topaz / SeedVR2 models the original
described, that is a different tool: it needs a deployed service and a paid
`fal.ai` key, and it trades locality and privacy for speed and temporal
consistency.
