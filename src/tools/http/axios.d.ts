import type { ZodTypeAny } from "zod";

declare module "axios" {
  interface AxiosRequestConfig {
    reqDataZod?: ZodTypeAny;
    reqParamsZod?: ZodTypeAny;
    responseZod?: ZodTypeAny;
  }
}
