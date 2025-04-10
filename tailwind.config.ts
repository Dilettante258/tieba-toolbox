import type {Config} from "tailwindcss";
import aria from "tailwindcss-react-aria-components";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        serif: ['var(--font-ubuntu)'],
        mono: ['var(--font-ubuntu-mono)'],
      },
    },
  },
  plugins: [
    aria()
  ]
} satisfies Config;
