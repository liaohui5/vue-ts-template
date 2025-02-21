import type { AxiosInstance } from "axios";
import { httpErrorHandler } from "../httpErrorHandler";

export function applyResolveDataInterceptor(http: AxiosInstance) {
  http.interceptors.response.use(
    (res) => (res.status === 200 ? res.data : Promise.reject(res)),
    (err) => httpErrorHandler(err),
  );
}
