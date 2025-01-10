/**
 * 开发环境下的日志打印函数
 * 仅在开发环境下输出日志信息
 * @param {...*} args - 要打印的参数列表
 */
export const log = (...args: unknown[]) => {
  if (import.meta.env.DEV) {
    console.log(...args);
  }
};
