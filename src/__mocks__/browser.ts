import { setupWorker, type SetupWorker } from "msw/browser";
import { handlers } from "./handlers";

// https://msw.nodejs.cn/docs/api/setup-worker/start/
const worker: SetupWorker = setupWorker(...handlers);
export const startMockServer = () => {
  return worker.start({
    onUnhandledRequest: "bypass",
    quiet: false, // enable debug output
  });
};
