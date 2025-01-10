import { defineStore } from "pinia";
import { deleteToken, saveToken } from "@/tools/token";
import { useLocalStorage } from "@vueuse/core";
import * as api from "@/api";
import type { LoginFrom, LoginResponseView } from "@/types/auth";

export const AUTH_USER_KEY = "__auth_user__";
export const useAuth = defineStore("auth", () => {
  // 已经登录的用户信息
  const defaultUser = { token: "" } as LoginResponseView;
  const authUser = useLocalStorage(AUTH_USER_KEY, defaultUser);

  // 登录
  async function login(data: LoginFrom) {
    const res = await api.login(data);
    saveToken(res.token);
    authUser.value = res;
  }

  // 注销
  function logout() {
    authUser.value = defaultUser;
    deleteToken();
  }

  return {
    authUser,
    logout,
    login,
  };
});
