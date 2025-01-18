import { z } from "zod";

// 验证 .env 文件的 内容, 必须要有这些字段
const envRules = z.object({
  MODE: z.enum(["development", "production", "test"]),
  DEV: z.boolean(),
  PROD: z.boolean(),
  SSR: z.boolean(),
  VITE_APP_API_BASE_URL: z.string(),
  VITE_APP_DEBUG_MODE_ENABLED: z.enum(["true", "false"]).transform(Boolean),
  VITE_APP_MOCK_API_ENABLED: z.enum(["true", "false"]).transform(Boolean),
  VITE_APP_API_VLIDATION_ENABLED: z.enum(["true", "false"]).transform(Boolean),
});

export type Env = z.infer<typeof envRules>;

// 经过 zod 验证后的 .env 文件内容
// 1. 写代码时候会有提示, 使用 import.meta.env 没有
// 2. import.meta.env.xxx 都是字符串, transform 后是 boolean
export const env = envRules.parse(import.meta.env);
