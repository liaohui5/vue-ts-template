import { createApp } from "vue";
import { setupRouter } from "@/router";
import { setupStore } from "@/store";
import { setupElementPlus } from "@/plugins/element-plus";
import { env } from "@/tools";
import App from "./App.vue";
import "./style.css";

async function setupMSW() {
  if (env.VITE_APP_MOCK_API_ENABLED) {
    // @ts-ignore
    const { startMockServer } = await import("./__mocks__/browser.ts");
    startMockServer();
  }
}

async function setupApp() {
  const app = createApp(App);
  setupElementPlus(app);
  setupStore(app);
  await setupRouter(app);
  app.mount("#app");
}

async function run() {
  await setupMSW();
  await setupApp();
}

await run();
