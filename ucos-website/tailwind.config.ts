import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "HelveticaNeue", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        body: ["var(--font-body)", "HelveticaNeue", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#f5f9ec",
          100: "#e6f0d5",
          200: "#cfe1ad",
          300: "#b6cf81",
          400: "#93b355",
          500: "#719430",
          600: "#5f7d28",
          700: "#4d6522",
          800: "#3f531f",
          900: "#34441d"
        },
        accent: {
          50: "#edf3f9",
          100: "#d2e1ef",
          200: "#a7c3df",
          300: "#75a2ca",
          400: "#4d84b3",
          500: "#326897",
          600: "#214c7c",
          700: "#1d4168",
          800: "#1b3755",
          900: "#1a3048"
        }
      },
      boxShadow: {
        soft: "0 20px 45px -25px rgba(33, 76, 124, 0.25)"
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(circle at 20% 20%, rgba(113, 148, 48, 0.16), transparent 45%), radial-gradient(circle at 80% 0%, rgba(33, 76, 124, 0.14), transparent 40%), linear-gradient(160deg, #f9fbf6 10%, #f4f8fc 45%, #ffffff 100%)"
      },
      fontSize: {
        "brand-h1": "34px",
        "brand-h2": "40px",
        "brand-body": "15px"
      },
      borderRadius: {
        brand: "3px"
      }
    }
  },
  plugins: []
};

export default config;
