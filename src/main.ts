import { createApp } from "vue";
import { setupElementPlus } from "@/plugins/element-plus";
import { setupMSW } from "@/plugins/msw";
import { setupRouter } from "@/router";
import { setupStore } from "@/store";
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
