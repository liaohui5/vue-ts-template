import { setupServer, type SetupServer } from "msw/node";

const handlerModules = import.meta.glob("./handlers/**.ts", { eager: true });

/* @ts-ignore */
export const handlers = Object.values(handlerModules).map(Object.values).flat();

// for node.js env
// https://msw.nodejs.cn/docs/api/setup-worker/start/
const server: SetupServer = setupServer(...handlers);
export const closeMockServer = () => server.close();
export const resetMockServer = () => server.resetHandlers();
export function startMockServer() {
  return server.listen({
    onUnhandledRequest: "bypass", // 忽略未处理的请求
  });
}
