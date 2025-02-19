import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],

  daisyui: {
    themes: [
      "emerald",
      {
        elementui: {
          primary: "#409eff",
          info: "#909399",
          success: "#67c23a",
          warning: "#e6a23c",
          error: "#fa6c6c",
          "base-100": "#ffffff",
          "--rounded-box": "0.25rem",
          "--rounded-btn": ".125rem",
          "--rounded-badge": ".125rem",
          "--tab-radius": "0.25rem",
          "--animation-btn": "0",
          "--animation-input": "0",
          "--btn-focus-scale": "1",
        },
      },
    ],
  },
};
