import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        themeColor: '#344468'
      },
      fontFamily: {
        'arial-black' : ['"Arial Black"', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
} satisfies Config;
