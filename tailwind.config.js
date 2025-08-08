// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        animation: {
          slowpulse: "slowpulse 20s infinite",
        },
      },
    },
  },
  plugins: [],
};
