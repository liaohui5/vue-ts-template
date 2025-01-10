import type { App } from "vue";
import { createRouter, createWebHashHistory, type Router } from "vue-router";
import { routes } from "./routes";
import { setupRouterGuards } from "./guards";

export * from "./routes";
export * from "./guards";
export function setupRouter(app: App) {
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  setupRouterGuards(router);
  setRouterInstance(router);

  app.use(router);

  return router.isReady();
}

let _router: Router | undefined;
export function setRouterInstance(router: Router) {
  _router = router;
}

export function getRouterInstance() {
  return _router;
}
