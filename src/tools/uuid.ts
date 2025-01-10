import { v4 as uuidv4 } from "uuid";
import { isFunction } from "lodash-es";

/**
 * 生成一个 UUID (通用唯一标识符)
 * 优先使用 Web Crypto API 的 randomUUID 方法，如果不可用则回退到 uuidv4 实现
 *
 * @returns {string} 返回一个符合 UUID v4 格式的字符串
 * 例如："123e4567-e89b-12d3-a456-426614174000"
 *
 * @example
 * const id = uuid();
 * console.log(id); // "123e4567-e89b-12d3-a456-426614174000"
 *
 * @throws {Error} 如果在非浏览器环境下运行可能会抛出错误
 */
export const uuid = () => {
  if (window && isFunction(window?.crypto?.randomUUID)) {
    return window.crypto.randomUUID();
  }
  return uuidv4();
};
