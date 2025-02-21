import { mergeConfig, defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

const vitestConfig = defineConfig({
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./src/__tests__/setupMSW.ts"],
  },
});

export default mergeConfig(viteConfig, vitestConfig);
