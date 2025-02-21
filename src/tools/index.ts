import { v4 as uuidv4 } from "uuid";
import { isFunction } from "lodash-es";

// 从其他模块导出
export * from "lodash-es";
export * from "./token";
export * from "./env-vars";
export * from "./algorithm";
export * as progress from "./progress";

/**
 * 开发环境下的日志打印函数
 * 仅在开发环境下输出日志信息
 * @param {...*} args - 要打印的参数列表
 */
export const debug = log;
export function log(...args: Array<unknown>) {
  if (import.meta.env.DEV) {
    console.log(...args);
  }
}

/**
 * 生成一个 UUID (通用唯一标识符)
 * 优先使用 Web API 的 randomUUID 方法，如果不可用则回退到 uuidv4 实现
 *
 * @returns {string} 返回一个符合 UUID v4 格式的字符串
 * example："123e4567-e89b-12d3-a456-426614174000"
 *
 * @example
 * const id = uuid();
 *
 * @throws {Error} 如果在非浏览器环境下运行可能会抛出错误
 */
export const uuid = (): string => {
  if (window && isFunction(window?.crypto?.randomUUID)) {
    return window.crypto.randomUUID();
  }
  return uuidv4();
};
