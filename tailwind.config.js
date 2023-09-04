/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            img: {
              display: "inline-block",
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
              marginTop: "1em",
              marginBottom: "1em",
            },
            li: {
              marginTop: "0px",
              marginBottom: "0px",
            },
            "ul, ol": {
              marginTop: "2px",
              marginBottom: "2px",
            },
            "> ul > li > *:first-child": {
              marginTop: "0px",
            },
            "> ul > li > *:last-child": {
              marginBottom: "0px",
            },
          },
        },
      },
    },
  },
  daisyui: {
    themes: ["fantasy", "dracula"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
