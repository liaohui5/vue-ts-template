import { beforeEach, describe, expect, it } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { AUTH_USER_KEY, useAuth } from "@/store";
import { hasToken } from "@/tools/token";
import { resetStorage, setupRouterMock } from "@/__tests__/helpers";
import { RouteNames } from "@/router";

describe("auth store", () => {
  beforeEach(() => {
    resetStorage();
    setActivePinia(createPinia());
  });

  it("验证表单数据,如果不符合验证规则就设置错误信息", async () => {
    const store = useAuth();

    store.loginForm.email = "";
    store.loginForm.password = "";
    await store.validateLoginForm();
    expect(store.validateErrMsg.email).toBe("邮箱格式有误");
    expect(store.validateErrMsg.password).toBe("密码不能为空");

    store.loginForm.email = "invalid_email";
    store.loginForm.password = "123";
    await store.validateLoginForm();
    expect(store.validateErrMsg.email).toBe("邮箱格式有误");
    expect(store.validateErrMsg.password).toBe("密码至少6位");

    store.loginForm.email = "exmaple@test.com";
    store.loginForm.password = "password_string";
    await store.validateLoginForm();
    expect(store.validateErrMsg.email).toBe("");
    expect(store.validateErrMsg.password).toBe("");
  });

  it("提交登录表单应该设置loading状态, 提交完成后应该再次设置loading状态", async () => {
    const store = useAuth();
    expect(store.isLoading).toBe(false);

    const promise = store.submitLoginForm();
    expect(store.isLoading).toBe(true);

    await promise;
    expect(store.isLoading).toBe(false);
  });

  it("登录成功后,应该设置已经登录的用户数据", async () => {
    const store = useAuth();

    expect(store.isLogin).toBe(false);
    expect(store.authUser).toEqual({});

    // 通过数据验证 -> 发送请求
    store.loginForm.email = "example@test.com";
    store.loginForm.password = "password_string";
    await store.submitLoginForm();

    expect(store.isLogin).toBe(true);
  });

  it("登录成功后,应该重置登录表单数据", async () => {
    const store = useAuth();

    // 通过数据验证 -> 发送请求
    store.loginForm.email = "example@test.com";
    store.loginForm.password = "password_string";
    await store.submitLoginForm();

    expect(store.isLogin).toBe(true);
    expect(store.loginForm).toEqual({
      email: "",
      password: "",
    });
  });

  it("登录成功后,应该保存 token", async () => {
    const store = useAuth();
    expect(hasToken()).toBe(false);

    // 通过数据验证 -> 发送请求
    store.loginForm.email = "example@test.com";
    store.loginForm.password = "password_string";
    await store.submitLoginForm();
    expect(hasToken()).toBe(true);
  });

  it("登录成功后,应该保存已经登录的用户数据到 localStorage", async () => {
    expect(localStorage.getItem(AUTH_USER_KEY)).toBeNull();

    // 通过数据验证 -> 发送请求
    const store = useAuth();
    store.loginForm.email = "example@test.com";
    store.loginForm.password = "password_string";
    await store.submitLoginForm();

    expect(localStorage.getItem(AUTH_USER_KEY)).not.toBeNull();
  });

  it("登录成功后,应该自动跳到首页", async () => {
    const routerMock = setupRouterMock();
    const store = useAuth();

    // 通过数据验证 -> 发送请求
    store.loginForm.email = "example@test.com";
    store.loginForm.password = "password_string";
    await store.submitLoginForm();

    await routerMock.getPendingNavigation(); // 等待当前正在进行的导航完成
    expect(routerMock.currentRoute.value.name).toBe(RouteNames.Home);
  });

  it("退出登录后,应该删除已经登录的用户数据", async () => {
    const store = useAuth();

    // 先登录
    store.loginForm.email = "example@test.com";
    store.loginForm.password = "password_string";
    await store.submitLoginForm();

    expect(store.isLogin).toBe(true);
    expect(store.authUser).not.toEqual({});

    store.logout();

    expect(store.isLogin).toBe(false);
    expect(store.authUser).toEqual({});
  });

  it("退出登录后,应该删除 token", async () => {
    const store = useAuth();

    // 先登录
    store.loginForm.email = "example@test.com";
    store.loginForm.password = "password_string";
    await store.submitLoginForm();
    expect(hasToken()).toBe(true);

    store.logout();
    expect(hasToken()).toBe(false);
  });

  it("退出登录后,应该自动回到登录页", async () => {
    const routerMock = setupRouterMock();

    const store = useAuth();

    // 先登录
    store.loginForm.email = "example@test.com";
    store.loginForm.password = "password_string";
    await store.submitLoginForm();
    await routerMock.getPendingNavigation(); // 等待当前正在进行的导航完成
    expect(routerMock.currentRoute.value.name).toBe(RouteNames.Home);

    // 退出登录
    store.logout();
    await routerMock.getPendingNavigation(); // 等待当前正在进行的导航完成
    expect(routerMock.currentRoute.value.name).toBe(RouteNames.Login);
  });
});
