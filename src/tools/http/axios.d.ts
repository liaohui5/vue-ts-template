import type { ZodTypeAny, ZodObject } from "zod";

declare module "axios" {
  interface AxiosRequestConfig {
    reqHeaderZod?: ZodObject;
    reqDataZod?: ZodObject;
    reqParamsZod?: ZodObject;
    resHeaderZod?: ZodObject;
    resBodyZod?: ZodTypeAny;
  }
}
