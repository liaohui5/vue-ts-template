import { afterAll, afterEach, beforeAll } from "vitest";
import { startMockServer, closeMockServer, resetMockServer } from "../__mocks__/node";

// 启动 mock service worker 服务
beforeAll(startMockServer);

// 关闭 mock service worker 服务
afterAll(closeMockServer);

// 重置 mock service worker 服务
afterEach(resetMockServer);
