import { RouteNames } from "./routes";
import { hasToken } from "@/tools/token";
import type { Router } from "vue-router";

/**
 * 设置路由守卫
 * @param {VueRouter} router - vue-router实例
 * @description
 * 1. 检查登录守卫
 *  - 如果是公共路由,或者已经登录了,都可以继续 router
 *  - 如果不是公共路由,或者没有登录,都重定向到登录页
 */
export function setupRouterGuards(router: Router) {
  setupAuthGuard(router);
}

/**
 * 设置登录路由守卫
 * @param {VueRouter} router - vue-router实例
 * @description
 * 1. 检查是否是公共路由
 * 2. 检查是否已经登录了
 * 3. 如果是公共路由, 或者已经登录了, 都可以继续访问
 * 4. 如果不是公共路由, 或者没有登录, 都重定向到登录页
 */
export function setupAuthGuard(router: Router) {
  router.beforeEach((to, _form, next) => {
    if (to.meta.isPublic || hasToken()) {
      return next();
    }
    return next({ name: RouteNames.Login });
  });
}
