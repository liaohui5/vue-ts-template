import { createApp } from "vue";
import { setupRouter } from "@/router";
import { setupStore } from "@/store";
import { setupElementPlus, setupMSW } from "@/plugins";
import App from "./App.vue";
import "./style.css";

function bootstrap() {
  setupMSW();

  const app = createApp(App);
  setupElementPlus(app);
  setupStore(app);
  setupRouter(app);
  app.mount("#app");
}

bootstrap();
