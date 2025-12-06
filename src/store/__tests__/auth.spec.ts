import { createPinia, setActivePinia, storeToRefs } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { resetStorage, setupRouterMock } from "@/__tests__/helpers";
import { RouteNames } from "@/router";
import { AUTH_USER_KEY, useAuth } from "@/store/auth";
import { hasToken } from "@/tools/token-manager";

describe("auth store", () => {
  beforeEach(() => {
    resetStorage();
    setActivePinia(createPinia());
  });

  it("验证表单数据,如果不符合验证规则就设置错误信息", async () => {
    const store = useAuth();
    const { loginForm, validateErrors } = storeToRefs(store);

    loginForm.value = {
      account: "",
      password: "",
    };
    await store.validateLoginForm();
    expect(validateErrors.value).toEqual({
      account: "邮箱格式有误",
      password: "密码至少6位",
    });

    loginForm.value = {
      account: "123456",
      password: "123456",
    };
    await store.validateLoginForm();
    expect(validateErrors.value).toEqual({
      account: "邮箱格式有误",
      password: "",
    });

    loginForm.value = {
      account: "test@example.com",
      password: "123456",
    };
    await store.validateLoginForm();
    expect(validateErrors.value).toEqual({
      account: "",
      password: "",
    });
  });

  it("提交登录表单应该设置loading状态, 提交完成后应该再次设置loading状态", async () => {
    const store = useAuth();
    const { loginForm } = storeToRefs(store);
    loginForm.value = { account: "test@test.com", password: "123456" };
    expect(store.isLoading).toBe(false);

    const promise = store.submitLoginForm();
    expect(store.isLoading).toBe(true);

    await promise;
    expect(store.isLoading).toBe(false);
  });

  it("登录成功后,应该设置登录用户的数据和登录状态", async () => {
    const store = useAuth();
    const { loginForm, isLogin, authUser } = storeToRefs(store);
    expect(isLogin.value).toBe(false);
    expect(authUser.value).toEqual({});
    console.log(">>>>>>>>>>", authUser.value);

    // 通过数据验证 -> 发送登录请求
    loginForm.value = { account: "123456@example.com", password: "123456" };
    await store.submitLoginForm();
    expect(isLogin.value).toBe(true);
    expect(authUser.value).toHaveProperty("id");
  });

  it("登录成功后,应该重置登录表单数据", async () => {
    const store = useAuth();
    const { loginForm } = storeToRefs(store);

    loginForm.value = { account: "123456@example.com", password: "123456" };
    await store.submitLoginForm();

    expect(store.loginForm).toEqual({
      account: "",
      password: "",
    });
  });

  it("登录成功后,应该保存登录凭证", async () => {
    const store = useAuth();
    const { loginForm } = storeToRefs(store);
    expect(hasToken()).toBe(false);

    loginForm.value = { account: "123456@example.com", password: "123456" };
    await store.submitLoginForm();

    expect(hasToken()).toBe(true);
  });

  it("登录成功后,应该保存已经登录的用户数据到 localStorage", async () => {
    expect(localStorage.getItem(AUTH_USER_KEY)).toBeNull();

    const store = useAuth();
    const { loginForm } = storeToRefs(store);

    loginForm.value = { account: "123456@example.com", password: "123456" };
    await store.submitLoginForm();

    expect(localStorage.getItem(AUTH_USER_KEY)).not.toBeNull();
  });

  it("登录成功后,应该自动跳到首页", async () => {
    const routerMock = setupRouterMock();
    const store = useAuth();
    const { loginForm } = storeToRefs(store);

    loginForm.value = { account: "123456@example.com", password: "123456" };
    await store.submitLoginForm();

    await routerMock.getPendingNavigation(); // 等待当前正在进行的导航完成
    expect(routerMock.currentRoute.value.name).toBe(RouteNames.Home);
  });

  it("退出登录后,应该删除已经登录的用户数据", async () => {
    const store = useAuth();
    const { loginForm } = storeToRefs(store);

    // login first
    loginForm.value = { account: "123456@example.com", password: "123456" };
    await store.submitLoginForm();
    expect(store.isLogin).toBe(true);
    expect(store.authUser).not.toEqual({});

    // logout
    store.logout();

    expect(store.isLogin).toBe(false);
    expect(store.authUser).toEqual({});
  });

  it("退出登录后,应该删除 token", async () => {
    const store = useAuth();
    const { loginForm } = storeToRefs(store);

    // login first
    loginForm.value = { account: "123456@example.com", password: "123456" };
    await store.submitLoginForm();
    expect(store.isLogin).toBe(true);
    expect(store.authUser).not.toEqual({});

    // logout
    store.logout();
    expect(hasToken()).toBe(false);
  });

  it("退出登录后,应该自动回到登录页", async () => {
    const routerMock = setupRouterMock();
    const store = useAuth();
    const { loginForm } = storeToRefs(store);

    // login first
    loginForm.value = { account: "123456@example.com", password: "123456" };
    await store.submitLoginForm();
    expect(store.isLogin).toBe(true);

    // logout
    store.logout();
    await routerMock.getPendingNavigation(); // 等待当前正在进行的导航完成
    expect(routerMock.currentRoute.value.name).toBe(RouteNames.Login);
  });
});
