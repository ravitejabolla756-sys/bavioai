import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "24px",
      screens: {
        "2xl": "1200px"
      }
    },
    extend: {
      colors: {
        background: "var(--bg-base)",
        foreground: "var(--text-primary)",
        surface: "var(--bg-raised)",
        card: "var(--card-bg)",
        overlay: "var(--bg-overlay)",
        border: "var(--border-solid)",
        primary: "var(--brand)",
        "primary-hover": "var(--brand-hover)",
        secondary: "var(--text-secondary)",
        muted: "var(--text-muted)",
        success: "var(--accent-green)",
        warning: "var(--accent-amber)",
        danger: "var(--accent-red)",
        info: "var(--accent-blue)"
      },
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        heading: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.4)",
        saffron: "0 0 0 1px rgba(123,47,190,0.24), 0 18px 48px rgba(123,47,190,0.14)",
        button: "0 0 24px rgba(123,47,190,0.24)",
        success: "0 0 20px rgba(34,197,94,0.2)"
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: "-200% center" },
          to: { backgroundPosition: "200% center" }
        },
        gradientShift: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        pulseSoft: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.4" }
        },
        waveBar: {
          "0%,100%": { transform: "scaleY(0.3)" },
          "50%": { transform: "scaleY(1)" }
        },
        marqueeLeft: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" }
        },
        marqueeRight: {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" }
        },
        floatSoft: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        }
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "gradient-shift": "gradientShift 4s ease infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "wave-bar": "waveBar 1.1s ease-in-out infinite",
        "marquee-left": "marqueeLeft 30s linear infinite",
        "marquee-right": "marqueeRight 26s linear infinite",
        "float-soft": "floatSoft 8s ease-in-out infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
