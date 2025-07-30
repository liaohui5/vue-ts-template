import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import * as api from "@/api/auth";
import { useGoto } from "@/hooks/useGoto";
import { log, tokenManager } from "@/tools";
import { showErrMsg } from "@/tools/notify";
import type { LoginFormType, LoginResponseType } from "@/types/auth";
import { validate } from "@/validation";
import { LoginFormRules } from "@/validation/auth.rule";
import { useLoading } from "@/hooks/useLoading";

const goto = useGoto();
export const AUTH_USER_KEY = "__auth_user__";
export const useAuth = defineStore("auth", () => {
  const loginForm = ref<LoginFormType>({
    account: "",
    password: "",
  });

  function resetLoginForm() {
    loginForm.value.account = "";
    loginForm.value.password = "";
  }

  const validateErrors = ref<LoginFormType>({
    account: "",
    password: "",
  });
  function setValidateErrors(errors: LoginFormType) {
    validateErrors.value.account = errors.account;
    validateErrors.value.password = errors.password;
  }
  function clearValidateErrors() {
    validateErrors.value.account = "";
    validateErrors.value.password = "";
  }

  async function validateLoginForm() {
    const results = await validate<LoginFormType>(loginForm.value, LoginFormRules);
    if (results.passed) {
      clearValidateErrors();
      return results;
    }

    log("[validatedForm]validate results errors:", results.errors);
    setValidateErrors({
      account: results.errors.account?._errors[0] || "",
      password: results.errors.password?._errors[0] || "",
    });
    return results;
  }

  const loading = useLoading();
  const authUser = useLocalStorage(AUTH_USER_KEY, {} as LoginResponseType);
  const isLogin = computed<boolean>(() => Boolean(authUser.value.id));
  function setAuthUser(authUer: LoginResponseType) {
    authUser.value = authUer;
  }
  async function submitLoginForm() {
    loading.show();
    const results = await validateLoginForm();
    if (!results.passed) {
      loading.hide();
      return;
    }

    try {
      const loginRes = await api.login(loginForm.value);
      log("[submitLoginForm]login response", loginRes);
      setAuthUser(loginRes);
      tokenManager.saveToken(authUser.value.token);
      await goto.redirectToHome();
      resetLoginForm();
    } catch (e) {
      showErrMsg("登录失败,请稍后重试");
      log("登录失败,请稍后重试:", e);
    } finally {
      loading.hide();
    }
  }

  async function logout() {
    tokenManager.removeToken();
    setAuthUser({} as LoginResponseType);
    await goto.redirectToLogin();
  }

  return {
    isLoading: loading.isLoading,
    isLogin,
    authUser,
    loginForm,
    validateErrors,
    logout,
    resetLoginForm,
    submitLoginForm,
    validateLoginForm,
  };
});
