import { v4 as uuidv4 } from "uuid";
import { isFunction } from "./index";
import MD5 from "crypto-js/md5";

// 重新导出 lodash 函数, 避免在 monorepo 项目中多次安装
export * from "lodash-es";

// 重新导出 env 和 config 变量, 处理过后的变量
export * from "./config";
export * from "./env-vars";

// 重新导出 progress 和 notify 工具
export * as progress from "./progress";
export * as notify from "./notify";
export * as tokenStore from "./token";

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

/**
 * 返回字符串的md5值
 * @param {string} str - 最小值
 * @returns {string} 返回值
 */
export const md5 = (str: string): string => MD5(str).toString();

/**
 * 生成一个 UUID 字符串(通用唯一标识符)
 * 使用 Web Crypto API 的 randomUUID 方法，如果不可用则使用 uuidv4 实现
 *
 * @returns {string} 返回一个符合 UUID v4 格式的字符串
 * example："123e4567-e89b-12d3-a456-426614174000"
 *
 * @example
 * const id = uuid();
 */
export const uuid = (): string => {
  if (window && isFunction(window?.crypto?.randomUUID)) {
    return window.crypto.randomUUID();
  }
  return uuidv4();
};
