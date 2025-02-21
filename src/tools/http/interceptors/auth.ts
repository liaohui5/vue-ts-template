import { getToken, hasToken } from "@/tools";
import type { AxiosInstance } from "axios";

export const TOKEN_HEADER_KEY = "Authorization";
export function applyAuthInterceptor(http: AxiosInstance) {
  http.interceptors.request.use((config) => {
    // set token header after login
    if (hasToken()) {
      config.headers[TOKEN_HEADER_KEY] = getToken();
    }
    return config;
  });
}
