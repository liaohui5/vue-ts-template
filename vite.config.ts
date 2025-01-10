/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import inspect from "vite-plugin-inspect";

// https://vite.dev/config/
export default defineConfig({
  // inspect 插件会影响 Vitest 测试
  // plugins: [vue(), inspect()],
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/src/",
    },
  },

  test: {
    environment: "happy-dom",
  },
});
