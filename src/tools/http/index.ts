import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import type { ZodTypeAny } from "zod";
import { env, errorLog } from "@/tools";
import { genRequestId, requestValidate, withToken } from "./interceptors/request";
import { responseValidate, unwrapBody } from "./interceptors/response";

// 直接导出
export * from "./interceptors/request";
export * from "./interceptors/response";

/* prettier-ignore */
export type RequestInterceptor<T> = (config: AxiosRequestConfig<T>) => AxiosRequestConfig<T> | Promise<AxiosRequestConfig<T>>;
export type ResponseInterceptor<T> = (response: AxiosResponse<T>) => AxiosResponse<T> | Promise<AxiosResponse<T>>;

/**
 * 创建一个HTTP客户端
 *
 * 此函数通过给定的基础配置和请求/响应拦截器来创建一个Axios HTTP客户端
 * 它允许在发送请求前后和接收响应前后执行自定义逻辑
 *
 * @param baseConfig - 基础请求配置，用于axios.create
 * @param reqInterceptors - 请求拦截器数组，用于在请求发送之前执行逻辑
 * @param resInterceptors - 响应拦截器数组，用于在响应接收后执行逻辑
 * @returns 返回一个配置好拦截器的Axios实例
 */
export function createHttpClient(
  baseConfig: AxiosRequestConfig,
  reqInterceptors: Array<RequestInterceptor<unknown>> = [],
  resInterceptors: Array<ResponseInterceptor<unknown>> = [],
): AxiosInstance {
  const client = axios.create(baseConfig);

  for (let i = 0; i < reqInterceptors.length; i++) {
    const item = reqInterceptors[i];
    /* @ts-ignore */
    client.interceptors.request.use(item);
  }

  for (let i = 0; i < resInterceptors.length; i++) {
    const item = resInterceptors[i];
    client.interceptors.response.use(item);
  }

  return client;
}

/**
 * 验证输入输出数据是否符合指定的规则
 *
 * @param label 验证的标签，用于在错误信息中标识验证的类型
 * @param rules 验证规则，使用 ZodTypeAny 类型进行定义
 * @param data 需要验证的数据对象
 * @throws 如果数据不符合规则，则抛出包含验证错误详情的异常
 */
export function validateIO<T extends object>(label: string, rules: ZodTypeAny, data: T) {
  const result = rules.safeParse(data);
  if (!result.success) {
    const errorMsg = `[validateIO] ${label} validation failed`;
    errorLog(errorMsg, result.error.issues);
    throw new Error(errorMsg);
  }
}

/////////////////////////////////////////////////////////////////
// 验证响应数据
// 只有 .env 中的 VITE_APP_API_VLIDATION_ENABLED 为 true 的时候才
// 校验响应内容, 建议只在开发模式下启用校验, 方便快速调试响应值是否符合规则
// 生产模式下不进行校验, 因为生产模式下, 响应的数据已经返回了,
// 所以即使校验了数据, 也并没有什么实际作用
/////////////////////////////////////////////////////////////////
const reqInterceptors = [requestValidate, genRequestId, withToken];
const resInterceptors = [unwrapBody];
if (env.VITE_APP_API_VLIDATION_ENABLED) {
  resInterceptors.unshift(responseValidate);
}

/////////////////////////////////////////////////////////////////
// 默认的 http 实例
/////////////////////////////////////////////////////////////////
export const http = createHttpClient(
  {
    baseURL: env.VITE_APP_API_BASE_URL,
    timeout: 10 * 1000, // 10s
    headers: {
      "Content-Type": "application/json",
    },
  },
  reqInterceptors as Array<RequestInterceptor<unknown>>,
  resInterceptors as Array<ResponseInterceptor<unknown>>,
);
