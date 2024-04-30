import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  mode:'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        primary: '#202225',
        secondary: '#5865f2',
        gray:{
          900:'#202225',
          800:'#2f3136',
          700:'#36393f',
          600:'#4f545C',
          400:'#d4d7dc',
          300:'#e3e5e8',
          200:'#ebedef',
          100: '#f2f3f5',
        }
      },
    },
  },
  plugins: [],
};
export default config;