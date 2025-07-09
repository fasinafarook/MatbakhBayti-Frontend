module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0E0E0E",
        primary: "#FACC15",
        text: "#F5F5F5",
        muted: "#B0B0B0",
        card: "#1F1F1F",
      },
      fontFamily: {
        heading: ['"Playfair Display"', "serif"],
        body: ['"Inter"', "sans-serif"],
        dancing: ['"Dancing Script"', "cursive"],
        playfair: ['"Playfair Display"', "serif"],
      },
    },
  },
  plugins: [],
};
