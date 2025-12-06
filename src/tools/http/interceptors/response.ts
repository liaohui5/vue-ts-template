import type { AxiosResponse } from "axios";
import { isObject } from "@/tools";
import { validateIO } from "@/validation";

// 直接返回 axios 响应对象的 data 字段
export const unwrapBody = (res: AxiosResponse<unknown>) => {
  const body = res.data;
  if (isObject(body) && "data" in body) {
    return body.data;
  }
  return body;
};

// 校验响应数据
export function responseValidate(response: AxiosResponse<unknown>) {
  const { headers, data } = response;
  const { url, method, resHeaderZod, resBodyZod } = response.config;

  const items = [
    {
      label: "response headers",
      value: headers,
      rules: resHeaderZod,
    },
    {
      label: "response body",
      value: data,
      rules: resBodyZod,
    },
  ];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.rules) {
      validateIO(`${method} ${url} ${item.label}`, item.rules, item.value as object);
    }
  }

  return response;
}
