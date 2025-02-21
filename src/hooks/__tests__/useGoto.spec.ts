import { useGoto } from "@/hooks/useGoto";
import { RouteNames } from "@/router";
import { mountSetupComponentWithRouterMock } from "@/__tests__/helpers";
import { describe, expect, it } from "vitest";

describe("useGoto", () => {
  it("应该重定向到登录页", async () => {
    const { router } = mountSetupComponentWithRouterMock(() => {
      // 这是在组件的 setup 函数中执行
      useGoto().redirectToLogin();
    });
    await router.getPendingNavigation(); // 等待当前正在进行的导航完成
    expect(router.currentRoute.value.name).toBe(RouteNames.Login);
  });

  it("应该重定向到首页", async () => {
    const { router } = mountSetupComponentWithRouterMock(() => {
      useGoto().redirectToHome();
    });
    await router.getPendingNavigation();
    expect(router.currentRoute.value.name).toBe(RouteNames.Home);
  });
});
