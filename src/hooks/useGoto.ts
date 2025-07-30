import { getRouterInstance, RouteNames } from "@/router";


export function useGoto() {
  /**
   * @description 重定向到指定的路由
   * @param {RouteNames} RouteName - 路由名称
   * @example
   * import { RouteNames } from "@/router";
   * const { redirect } = useGoto();
   * redirect(RouteNames.Login);
   */
  function redirect(RouteName: RouteNames) {
    return getRouterInstance()?.replace({ name: RouteName });
  }

  const redirectToLogin = () => redirect(RouteNames.Login);
  const redirectToHome = () => redirect(RouteNames.Home);

  return {
    redirectToLogin,
    redirectToHome,
  };
}
