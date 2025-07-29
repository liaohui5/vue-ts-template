import * as z from "zod";

// 登录表单数据验证规则
export const LoginFormRules = z.object({
  email: z.email("邮箱格式有误"),
  password: z.string().min(6, "密码至少6位").max(16, "密码最多16位"),
});

// 登录接口响应的数据验证规则
export const LoginResponseRules = z.object({
  id: z.number(),
  username: z.string(),
  email: z.email(),
  avatar: z.url(),
  token: z.string(),
});
