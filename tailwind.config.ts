import type { Config } from "tailwindcss";

/**
 * "Estate Record" design system.
 *
 * The palette is taken from the photographs on the site rather than from the
 * idea of "garden = green": ink is the near-black bottle green of Victorian
 * glasshouse ironwork, chalk is limestone paper, and the one accent is
 * ceanothus blue — the flower colour that keeps recurring in Josh's own photos
 * (ceanothus, alliums, wisteria, campanula). Colours are HSL triplets so the
 * shadcn components keep working unchanged.
 */
export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        // The desktop nav needs ~940px to sit beside the wordmark without
        // colliding, which is below Tailwind's lg and above Chrome's 980px
        // "Desktop site" width on phones.
        nav: '960px',
      },
      fontFamily: {
        // Fraunces for display only, Karla for everything read in sentences,
        // IBM Plex Mono for labels, distances, postcodes and captions.
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        // Kept so any stray `font-heading` still resolves to the display face.
        heading: ['var(--font-display)', 'Georgia', 'serif'],
      },
      colors: {
        // — the design system —
        ink: {
          DEFAULT: "hsl(var(--ink))",
          raise: "hsl(var(--ink-raise))",
          rule: "hsl(var(--rule-dark))",
        },
        chalk: {
          DEFAULT: "hsl(var(--chalk))",
          mount: "hsl(var(--chalk-mount))",
          wash: "hsl(var(--limewash))",
        },
        stone: {
          DEFAULT: "hsl(var(--stone))",
          light: "hsl(var(--stone-light))",
        },
        ceanothus: {
          DEFAULT: "hsl(var(--ceanothus))",
          light: "hsl(var(--ceanothus-light))",
        },
        rule: "hsl(var(--rule))",

        // — shadcn's names, re-pointed at the system above —
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      maxWidth: {
        // A comfortable reading measure for long-form service and area copy.
        measure: '42rem',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 2px)",
      },
      transitionTimingFunction: {
        // Everything eases out of a spring rather than in and out of nothing.
        estate: 'cubic-bezier(0.22, 1, 0.36, 1)',
        plate: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      boxShadow: {
        // Diffused and green-tinted rather than grey, so plates sit on the
        // chalk instead of floating over it.
        plate: '0 18px 50px -28px hsl(156 30% 8% / 0.45)',
        lift: '0 34px 80px -40px hsl(156 30% 8% / 0.55)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
