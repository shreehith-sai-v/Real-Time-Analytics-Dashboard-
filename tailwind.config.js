/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        mist: "#e2e8f0",
        sea: "#0f766e",
        ember: "#ea580c",
        signal: "#0891b2",
      },
      boxShadow: {
        panel: "0 20px 60px -30px rgba(15, 23, 42, 0.35)",
      },
    },
  },
  plugins: [],
};
