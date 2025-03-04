import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import inspect from "vite-plugin-inspect";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // inspect(), 会影响单元测试
  ],

  resolve: {
    alias: {
      "@": "/src/",
    },
  },

  build: {
    target: "esnext",
  },
});
