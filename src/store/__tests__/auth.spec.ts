import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { AUTH_USER_KEY, useAuth } from "@/store";
import { deleteToken, hasToken } from "@/tools/token";
import { startMockServer, closeMockServer, resetMockServer } from "@/__tests__/helpers";

// 注意这个token要和 __mocks__/handlers.ts 中的 token 一致
// 不要直接从 __mocks__/handlers.ts 导入, 形成强依赖
const mockToken = "msw-mock-token-string";
const formData = {
  email: "example@qq.com",
  password: "123456",
};

describe("auth store", () => {
  beforeAll(() => {
    startMockServer(); // 启动 mock server
  });
  afterAll(() => {
    closeMockServer(); // 关闭 mock server
  });

  beforeEach(() => {
    resetMockServer(); // 重置 mock server

    setActivePinia(createPinia());
    localStorage.clear();
    deleteToken();
  });

  it("登录后应该设置保存登录用户信息", async () => {
    expect(localStorage.getItem(AUTH_USER_KEY)).toBe(null);

    const store = useAuth();
    await store.login(formData);
    expect(store.authUser.token).toBe(mockToken);

    expect(localStorage.getItem(AUTH_USER_KEY)).toBeTypeOf("string");
  });

  it("登录后应该设置保存token", async () => {
    expect(hasToken()).toBe(false);

    const store = useAuth();
    await store.login(formData);

    expect(hasToken()).toBe(true);
  });

  it("退出应该重置登录用户信息", async () => {
    // 登录
    const store = useAuth();
    await store.login(formData);
    expect(store.authUser.token).toBe(mockToken);
    expect(hasToken()).toBe(true);

    // 退出登录
    store.logout();
    expect(store.authUser.token).toBe("");
  });

  it("登录后应该设置删除token", async () => {
    // 登录
    const store = useAuth();
    await store.login(formData);
    expect(store.authUser.token).toBe(mockToken);
    expect(hasToken()).toBe(true);

    // 退出登录
    store.logout();
    expect(store.authUser.token).toBe("");
    expect(hasToken()).toBe(false);
  });
});
