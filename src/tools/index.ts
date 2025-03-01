export * from "lodash-es";
export * from "./token";
export * from "./env-vars";
export * from "./algorithm";
export * as progress from "./progress";
export * as notify from "./notify";

/**
 * 仅在开发环境下输出日志信息
 * @param {...*} args - 要打印的参数列表
 */
export function infoLog(...args: Array<unknown>) {
  if (import.meta.env.DEV) {
    console.info(...args);
  }
}

/**
 * 仅在开发环境下输出日志信息
 * @param {...*} args - 要打印的参数列表
 */
export function errorLog(...args: Array<unknown>) {
  if (import.meta.env.DEV) {
    console.error(...args);
  }
}
