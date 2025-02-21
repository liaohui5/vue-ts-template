/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        white: "var(--el-color-white)",
        black: "var(--el-color-black)",
        primary: "var(--el-color-primary)",
        success: "var(--el-color-success)",
        warning: "var(--el-color-warning)",
        danger: "var(--el-color-danger)",
        error: "var(--el-color-error)",
        info: "var(--el-color-info)",
      },
      padding: {
        card: "var(--el-card-padding)",
      },
      // borderRadius: {
      //   base: "4px",
      //   small: "2px",
      //   round: "20px",
      //   circle: "100%",
      // },
    },
  },
};
