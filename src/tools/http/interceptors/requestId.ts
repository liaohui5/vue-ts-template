import { isObject, merge, uuid } from "@/tools";
import type { AxiosInstance } from "axios";

export const REQUEST_ID_KEY = "request_id";
export function applyRequesetIdInterceptor(http: AxiosInstance) {
  http.interceptors.request.use((config) => {
    // set request params uuid field
    if (!isObject(config.params)) {
      config.params = {};
    }
    config.params = merge(config.params, {
      [REQUEST_ID_KEY]: uuid(),
    });
    return config;
  });
}
