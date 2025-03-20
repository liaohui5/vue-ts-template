/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss() as unknown as any,
  ],

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

  build: {
    target: "esnext",
  },
});
