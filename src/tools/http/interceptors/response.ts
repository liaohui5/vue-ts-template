import type { AxiosResponse } from "axios";
import { validateIO } from "@/tools/http";
import { env, isObject } from "@/tools";

// 直接返回 axios 响应对象的 data 字段
export const unwrapBody = (res: AxiosResponse<unknown>) => {
  const body = res.data;
  if (isObject(body) && "data" in body) {
    return body.data;
  }
  return body;
};

// 验证响应数据
// 只有 .env 中的 vite_app_debug_mode_enabled 为 true 的时候才
// 校验响应内容, 建议只在开发模式下启用校验, 方便快速调试, 生产模式下
// 不进行校验, 因为生产模式下, 响应的数据已经返回了, 所以即使校验了数据
// 也并没有什么实际作用
export function resValidate(response: AxiosResponse<unknown>) {
  if (!env.VITE_APP_API_VLIDATION_ENABLED) {
    return response;
  }

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
