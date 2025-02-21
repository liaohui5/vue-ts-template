import axios from "axios";
import { env } from "@/tools";
import { applyRequesetIdInterceptor } from "./interceptors/requestId";
import { applyAuthInterceptor } from "./interceptors/auth";
import { applyResolveDataInterceptor } from "./interceptors/resolveData";
import { applyValidateInterceptor } from "./interceptors/validate";

export * from "./interceptors/validate";
export * from "./interceptors/auth";
export * from "./interceptors/requestId";
export * from "./interceptors/resolveData";

export const http = createHttpInst(env.VITE_APP_API_BASE_URL);
export function createHttpInst(baseURL: string = "/") {
  const http = axios.create({
    baseURL,
    timeout: 1000 * 10, // 10s
    headers: {
      Accept: "application/json",
    },
  });

  applyValidateInterceptor(http);
  applyRequesetIdInterceptor(http);
  applyAuthInterceptor(http);
  applyResolveDataInterceptor(http);

  return http;
}
