import { describe, expect, it } from "vitest";
import { mountSetupComponentWithRouterMock } from "@/__tests__/helpers";
import { useGoto } from "@/hooks/useGoto";
import { RouteNames } from "@/router";

// TODO: 应该测试 redirect 和 goto 方法, 看 history 区别
// 这些别名便捷方法, 不需要测试, 出错的几率较小
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
