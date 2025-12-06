import { getRouterInstance, RouteNames } from "@/router";

export const $goto = useGoto();
export function useGoto() {
  function redirect(RouteName: RouteNames, params = {}) {
    return getRouterInstance()?.replace({ name: RouteName, params });
  }

  function toPage(RouteName: RouteNames, params = {}) {
    return getRouterInstance()?.push({ name: RouteName, params });
  }

  const redirectToLogin = () => redirect(RouteNames.Login);
  const redirectToHome = () => redirect(RouteNames.Home);

  return {
    redirect,
    toPage,
    redirectToLogin,
    redirectToHome,
  };
}
