import { env } from "./env-vars";

export * from "lodash-es";
export * from "./password";
export * from "./env-vars";
export * from "./md5";
export * from "./mock";
export * as notify from "./notify";
export * as progress from "./progress";
export * as tokenManager from "./token-manager";
export * from "./uuid";

/**
 * 仅在开发环境下输出日志信息
 * @param {...*} args - 要打印的参数列表
 */
export function log(...args: Array<unknown>) {
  if (env.DEV) {
    console.log(...args);
  }
}

/**
 * 仅在开发环境下输出日志信息
 * @param {...*} args - 要打印的参数列表
 */
export function errorLog(...args: Array<unknown>) {
  if (env.DEV) {
    console.error(...args);
  }
}

/**
 * 检查一个字符串是否是 URL
 * @param {string} url - 要检查的字符串
 */
export function isURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (_e: unknown) {
    return false;
  }
}
