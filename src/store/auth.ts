import type { LoginFormType, LoginResponseVO } from "@/types/auth";
import { validate, flatErrors } from "@/validation";
import { LoginFormRules } from "@/validation/auth.rule";
import { defineStore } from "pinia";
import { computed, reactive, ref, toRaw } from "vue";
import { showErrMsg } from "@/tools/notify";
import { tokenManager, log } from "@/tools";
import { useLocalStorage } from "@vueuse/core";
import { useGoto } from "@/hooks/useGoto";
import * as api from "@/api/auth";

export const AUTH_USER_KEY = "__auth_user__";
export const useAuth = defineStore("auth", () => {
  const goto = useGoto();

  const loginForm = reactive<LoginFormType>({
    email: "",
    password: "",
  });
  function resetLoginForm() {
    loginForm.email = "";
    loginForm.password = "";
  }

  const validateErrMsg = reactive<LoginFormType>({
    email: "",
    password: "",
  });
  async function validateLoginForm() {
    const formData = toRaw(loginForm);
    const results = await validate(formData, LoginFormRules);
    if (results.passed) {
      validateErrMsg.email = "";
      validateErrMsg.password = "";
      return results;
    }
    const err = flatErrors<LoginFormType>(results.errors);
    validateErrMsg.email = err.email || "";
    validateErrMsg.password = err.password || "";
    return results;
  }

  const isLoading = ref(false);
  const authUser = useLocalStorage<LoginResponseVO>(AUTH_USER_KEY, {} as LoginResponseVO);
  const isLogin = computed<boolean>(() => Boolean(authUser.value.id));
  async function submitLoginForm() {
    isLoading.value = true;
    const results = await validateLoginForm();
    if (!results.passed) {
      isLoading.value = false;
      return;
    }

    try {
      const res = await api.login(results.data);
      authUser.value = res;
      tokenManager.saveToken(authUser.value.token);
      goto.redirectToHome();
      resetLoginForm();
    } catch (e) {
      showErrMsg("登录失败,请稍后重试");
      log("登录失败,请稍后重试:", e);
    } finally {
      isLoading.value = false;
    }
  }

  async function logout() {
    tokenManager.deleteToken();
    authUser.value = {} as LoginResponseVO;
    goto.redirectToLogin();
  }

  return {
    isLoading,
    isLogin,
    authUser,
    loginForm,
    validateErrMsg,
    logout,
    resetLoginForm,
    submitLoginForm,
    validateLoginForm,
  };
});
