import { createPinia } from "pinia";
import type { App } from "vue";

/**
 * @description: 在app上安装pinia
 * @param {Object} app - app实例
 */
export function setupStore(app: App) {
  app.use(createPinia());
}

export * from "@/store/auth";
