// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        accent: "#34D399" // green accent
      },
      backgroundImage: {
        dotted: "url('/images/dotted-bg.svg')"
      },
      backdropBlur: {
        xs: "2px"
      }
    }
  },
  plugins: []
};
