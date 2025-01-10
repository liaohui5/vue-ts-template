import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from "axios";
import { isObject, merge, uuid, hasToken, getToken, isNil, env } from "@/tools";
import { httpErrorHandler } from "@/tools/http/httpErrorHandler";
import type { ZodTypeAny } from "zod";

//////////////////////////////////////////////
// get http instance                        //
//////////////////////////////////////////////
let httpInst: AxiosInstance;
export function getHttpInst(opts: CreateAxiosDefaults = {}) {
  if (isNil(httpInst)) {
    httpInst = createHttpInst(opts);
  }
  return httpInst;
}

//////////////////////////////////////////////
// create http instance with default config //
//////////////////////////////////////////////
export const baseURL = import.meta.env.VITE_BASE_URL;
function createHttpInst(opts: CreateAxiosDefaults = {}) {
  const defaultOpts = {
    baseURL,
    timeout: 1000 * 10, // 10s
    headers: {
      Accept: "application/json",
    },
  };
  const http = axios.create(merge(defaultOpts, opts));

  applyValidationInterceptor(http);
  applyRequesetIdInterceptor(http);
  applyTokenHeaderInterceptor(http);
  applyResponseInterceptor(http);

  return http;
}

//////////////////////////////////////////
// http global interceptors for request //
//////////////////////////////////////////
export const REQUEST_ID_KEY = "request_id";
function applyRequesetIdInterceptor(http: AxiosInstance) {
  http.interceptors.request.use((config) => {
    // set request id
    if (!isObject(config.params)) {
      config.params = {};
    }
    config.params = merge(config.params, {
      [REQUEST_ID_KEY]: uuid(),
    });
    return config;
  });
}

export const TOKEN_HEADER_KEY = "Authorization";
function applyTokenHeaderInterceptor(http: AxiosInstance) {
  http.interceptors.request.use((config) => {
    // set token header after login
    if (hasToken()) {
      config.headers[TOKEN_HEADER_KEY] = getToken();
    }
    return config;
  });
}

///////////////////////////////////////////
// http global interceptors for response //
///////////////////////////////////////////
function applyResponseInterceptor(http: AxiosInstance) {
  http.interceptors.response.use(
    (res) => (res.status === 200 ? res.data : Promise.reject(res)),
    (err) => httpErrorHandler(err),
  );
}

/////////////////////////////////////////////////////////////
// global interceptors for validation, enabled in dev mode //
/////////////////////////////////////////////////////////////
function applyValidationInterceptor(http: AxiosInstance) {
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
function IOValidate(type: IOValidateType, config: AxiosRequestConfig, data: unknown, rules?: ZodTypeAny) {
  if (!env.VITE_APP_API_VLIDATION_ENABLED) {
    // 只有 .env 中的 VITE_APP_DEBUG_MODE_ENABLED 为 true 的时候才进行校验
    // 建议只在开发模式下启用校验, 生产模式下不进行校验, 因为生产模式下, 即使校验
    // 了数据, 也并没有什么实际作用, 反而浪费性能, 但是在开发模式调试的时候可以快
    // 速校验数据是否符合验证规则
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
