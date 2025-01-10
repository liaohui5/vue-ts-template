import { describe, expect, it } from "vitest";
import { setupRouterMock } from "@/__tests__/helpers";
import { RouteNames } from "@/router";
import { hasToken, removeToken, saveToken } from "@/tools/token";

describe("router", () => {
  describe("检查登录路由守卫", () => {
    it("没有登录时,访问需要登录的页面应该重定向到登录页", async () => {
      removeToken(); // 删除 token, 验证登录需要用到 token 是否存在
      expect(hasToken()).toBe(false);

      const routerMock = setupRouterMock();
      await routerMock.push({ name: RouteNames.Home });

      expect(routerMock.currentRoute.value.name).toBe(RouteNames.Login);
    });

    it("已经登录后,访问需要登录的页面应该正常访问", async () => {
      saveToken("some-token-string"); // 模拟登录的状态

      const routerMock = setupRouterMock();
      await routerMock.push({ name: RouteNames.Home });

      expect(routerMock.currentRoute.value.name).toBe(RouteNames.Home);
    });
  });
});
