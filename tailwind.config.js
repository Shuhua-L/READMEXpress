/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            img: {
              display: "inline",
              marginTop: "2px",
              marginBottom: "2px",
              marginRight: "2px",
            },
            a: {
              color: "#3182ce",
              textDecoration: "none",
              fontWeight: "inherit",
              "&:hover": {
                color: "#2c5282",
                textDecoration: "underline",
              },
            },
            pre: {
              color: "#333",
              backgroundColor: "#f0f0f0",
              overflowX: "auto",
              fontWeight: "300",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
