import type { AxiosRequestConfig } from "axios";
import { assign, tokenManager, uuid } from "@/tools";
import { validateIO } from "@/validation";

// 给请求添加请求ID,放到 query 参数中
export const REQUEST_ID_KEY = "request_id";
export function genRequestId(config: AxiosRequestConfig) {
  const reqIdParams = {
    [REQUEST_ID_KEY]: uuid(),
  };
  config.params = assign(reqIdParams, config.params);
  return config;
}

// 验证请求参数是否有误
export function requestValidate(config: AxiosRequestConfig) {
  const { url, method, reqHeaderZod, headers, reqParamsZod, params, reqDataZod, data } = config;
  const items = [
    {
      label: "request headers",
      value: headers,
      rules: reqHeaderZod,
    },
    {
      label: "request params",
      value: params,
      rules: reqParamsZod,
    },
    {
      label: "request data",
      value: data,
      rules: reqDataZod,
    },
  ];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.rules) {
      validateIO(`${method} ${url} ${item.label}`, item.rules, item.value as object);
    }
  }

  return config;
}

// 如果有 token，则将 token 添加到 header 中
export const TOKEN_HEADER_KEY = "Authorization";
export function withToken(config: AxiosRequestConfig) {
  if (tokenManager.hasAccessToken()) {
    const tokenHeader = {
      [TOKEN_HEADER_KEY]: tokenManager.getBearerToken(),
    };
    config.headers = assign(tokenHeader, config.headers);
  }

  return config;
}
