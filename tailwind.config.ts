import { link } from "fs";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        default: ['"Comfortaa"', 'sans-serif'],
      },
      colors: {
        light: {
          primary: "#D9D9D9", // dark greyish
          secondary: "#ECECEC", // lighter
        },
        dark: {
          primary: "#1B1B1B", // darkest shade
          secondary: "#282828", // light shade
        },
        accent: {
          link: "#73B8F8",
          lightinput: "#D9D9D9",
          darkinput: "#555555",
          buttonhover: "#0085FF"
        }
      }
    },
  },
  plugins: [],
};
export default config;
