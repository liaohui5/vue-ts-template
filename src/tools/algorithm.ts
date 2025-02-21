import { v4 as uuidv4 } from "uuid";
import { isFunction } from "./index";
import MD5 from "crypto-js/md5";

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
