export * from "lodash-es";
export * from "./token";
export * from "./env-vars";
export * from "./algorithm";
export * from "./config";
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

/**
 * 检查一个字符串是否是 URL
 * @param {string} url - 要检查的字符串
 */
export function isUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
