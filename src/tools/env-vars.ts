import { z } from "zod";

// import.meta.env 的验证规则, 有些是 vite 提供的,
// 即使没有 .env 文件也会存在, 所有不用设置默认值
const envRules = z.object({
  MODE: z.enum(["development", "production", "test"]),
  DEV: z.boolean(),
  PROD: z.boolean(),
  SSR: z.boolean(),
  VITE_APP_API_BASE_URL: z.string().default("/"),
  VITE_APP_MOCK_API_ENABLED: z.enum(["true", "false"]).default("false").transform(Boolean),
  VITE_APP_API_VLIDATION_ENABLED: z.enum(["true", "false"]).default("false").transform(Boolean),
});

// 使用经过 zod 验证后的 .env 文件内容的好处:
// 1. 写代码时候会有提示, 减少拼写错误, 直接使用 import.meta.env 没有
// 2. import.meta.env.xxx 都是字符串, transform 后可以是其他类型的值, 比如 boolean
// 3. 使用验证后的 env, 可以设置默认值, 即使没有 .env 文件也不会 undefined 导致报错
export const env = envRules.parse(import.meta.env);
export type Env = z.infer<typeof envRules>;
