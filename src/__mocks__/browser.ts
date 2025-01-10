import { setupWorker, type SetupWorker } from "msw/browser";
import * as handleModule from "./handlers";
import type { RequestHandler, WebSocketHandler } from "msw";

// @ts-ignore
const handlers: Array<RequestHandler | WebSocketHandler> = Object.keys(handleModule).map((key) => handleModule[key]);

// https://msw.nodejs.cn/docs/api/setup-worker/start/
const worker: SetupWorker = setupWorker(...handlers);
export const startMockServer = () => {
  return worker.start({
    onUnhandledRequest: "bypass",
    quiet: false, // enable debug output
  });
};
