import { vi } from "vitest";
import { setRouterInstance, setupRouterGuards } from "@/router";
import { mount, config } from "@vue/test-utils";
import { routes } from "@/router";
import {
  createRouterMock,
  injectRouterMock,
  VueRouterMock,
  type RouterMock,
  type RouterMockOptions,
} from "vue-router-mock";

/**
 * 设置路由模拟器(RouterMock 是专门用于测试 vue-router 的库)
 *
 * 此函数用于创建和配置一个路由模拟器，该模拟器可以在测试环境中模拟路由行为
 * 它允许根据提供的配置选项自定义路由模拟的行为，例如是否使用实际导航，是否运行路由守卫等
 *
 * @returns 返回一个配置好的路由模拟器实例
 */
export function setupRouterMock(): RouterMock {
  const options: RouterMockOptions = {
    routes,
    useRealNavigation: true, // 使用真实的导航会调用路由守卫, 如果为假则不会调用路由守卫
  };

  const routerMock = createRouterMock({
    spy: {
      create: (fn) => vi.fn(fn),
      reset: (spy) => spy.mockClear(),
    },
    ...options,
  });

  setupRouterGuards(routerMock);
  setRouterInstance(routerMock);
  return routerMock;
}

/**
 * 利用  Vue Test Utils 和 VueRouterMock 模拟设置组件测试环境
 *
 * @param setup - 组件的 setup 函数
 * @returns 返回一个包含组件和路由模拟器实例的对象
 */
export function mountSetupComponentWithRouterMock(setup: () => void) {
  // 为 Vue Test Utils 安装插件, 添加 routerMock 实例到 VueWrapper
  // https://test-utils.vuejs.org/zh/guide/extending-vtu/plugins.html
  config.plugins.VueWrapper.install(VueRouterMock);
  const routerMock = setupRouterMock();
  injectRouterMock(routerMock);

  const vueComponentWithRouterMock = {
    render() {},
    setup,
  };

  const wrapper = mount(vueComponentWithRouterMock);
  const router = wrapper.router;

  // 注入之前先重置路由状态, 如果不重置的话, 会被路由守卫影响
  // 路由守卫的测试逻辑在 router.spec.ts 中做测试
  // 如果你希望在测试组件的时候一起测试路由守卫, 也可以注释它
  router.reset();

  return {
    wrapper,
    router,
  };
}

/**
 * 重置 localStorage 和 sessionStorage 状态
 **/
export function resetStorage() {
  localStorage.clear();
  sessionStorage.clear();
}
