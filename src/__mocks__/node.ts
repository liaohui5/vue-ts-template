import { setupServer, type SetupServer } from "msw/node";
import * as handleModule from "./handlers";
import type { RequestHandler, WebSocketHandler } from "msw";

// @ts-ignore
const handlers: Array<RequestHandler | WebSocketHandler> = Object.keys(handleModule).map((key) => handleModule[key]);

// https://msw.nodejs.cn/docs/api/setup-worker/start/
const server: SetupServer = setupServer(...handlers);
export const startMockServer = () => {
  return server.listen({
    onUnhandledRequest: "bypass",
  });
};

export const closeMockServer = () => server.close();
export const resetMockServer = () => server.resetHandlers();
