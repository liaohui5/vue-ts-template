/// <reference types="vitest/config" />
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],

  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./src/__tests__/setupMSW.ts"],
  },

  resolve: {
    alias: {
      "@": "/src/",
    },
  },
});
