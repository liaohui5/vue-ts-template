import { createApp } from "vue";
import { setupRouter } from "@/router";
import { setupStore } from "@/store";
import { setupElementPlus, setupMSW } from "@/plugins";
import App from "./App.vue";
import "./style.css";

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
