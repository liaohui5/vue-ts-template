import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, reactive, ref, toRaw } from "vue";
import * as api from "@/api/auth";
import { useGoto } from "@/hooks/useGoto";
import { log, tokenManager } from "@/tools";
import { showErrMsg } from "@/tools/notify";
import type { LoginFormType, LoginResponseType } from "@/types/auth";
import { validate } from "@/validation";
import { LoginFormRules } from "@/validation/auth.rule";

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
    const results = await validate<LoginFormType>(formData, LoginFormRules);
    if (results.passed) {
      validateErrMsg.email = "";
      validateErrMsg.password = "";
      return results;
    }
    // console.log("errors", results.errors)
    validateErrMsg.email = results.errors.email?._errors[0] || "";
    validateErrMsg.password = results.errors.password?._errors[0] || "";
    return results;
  }

  const isLoading = ref(false);
  const authUser = useLocalStorage(AUTH_USER_KEY, {} as LoginResponseType);
  const isLogin = computed<boolean>(() => Boolean(authUser.value.id));
  async function submitLoginForm() {
    isLoading.value = true;
    const results = await validateLoginForm();
    if (!results.passed) {
      isLoading.value = false;
      return;
    }

    try {
      const res = await api.login(results.data!);
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
    authUser.value = {} as LoginResponseType;
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
