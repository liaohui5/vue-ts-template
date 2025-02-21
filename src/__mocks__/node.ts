import { setupServer, type SetupServer } from "msw/node";
import { handlers } from "./handlers";

// https://msw.nodejs.cn/docs/api/setup-worker/start/
const server: SetupServer = setupServer(...handlers);
export const startMockServer = () => {
  return server.listen({
    onUnhandledRequest: "bypass", // 忽略未处理的请求
  });
};

export const closeMockServer = () => server.close();
export const resetMockServer = () => server.resetHandlers();
