import { env } from "@/tools";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { ZodTypeAny } from "zod";

// 对接口的数据进行验证
// params:   验证请求的 query 参数
// data:     验证请求的 json  参数
// response: 验证响应的 body 内容
export function applyValidateInterceptor(http: AxiosInstance) {
  http.interceptors.request.use((config) => {
    const { reqDataZod, reqParamsZod, params, data } = config;
    IOValidate("data", config, data, reqDataZod);
    IOValidate("params", config, params, reqParamsZod);
    return config;
  });

  http.interceptors.response.use((res) => {
    const { config, data } = res;
    IOValidate("response", config, data, config.responseZod);
    return res;
  });
}

type IOValidateType = "data" | "params" | "response";
export function IOValidate(type: IOValidateType, config: AxiosRequestConfig, data: unknown, rules?: ZodTypeAny) {
  // 只有 .env 中的 VITE_APP_DEBUG_MODE_ENABLED 为 true 的时候才进行
  // 校验建议只在开发模式下启用校验, 生产模式下不进行校验, 因为生产模
  // 式下, 即使校验了数据, 也并没有什么实际作用, 反而浪费性能, 但是在
  // 开发模式调试的时候可以快, 速校验数据是否符合验证规则
  if (!env.VITE_APP_API_VLIDATION_ENABLED) {
    return;
  }

  if (!rules) {
    return;
  }

  const result = rules.safeParse(data);
  if (result.success) {
    return;
  }

  // 验证失败
  const typeMap = {
    data: "请求 data",
    params: "请求 params",
    response: "响应 data",
  };
  console.error(`${config.method} ${config.url} ${typeMap[type]} 验证失败`, result.error.issues);
}
