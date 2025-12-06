import { zocker } from "zocker";
import * as z from "zod";

// 登录表单数据验证规则
export const loginZod = z.object({
  account: z.email({ error: "邮箱格式有误" }),
  password: z.string().min(6, "密码至少6位").max(16, "密码最多16位"),
});

// 登录接口响应的数据验证规则
export const loginResponseZod = z.object({
  id: z.number(),
  username: z.string(),
  email: z.email(),
  avatar: z.url(),
  accessToken: z.uuidv4(),
  refreshToken: z.uuidv4(),
});

// 导出类型
export type LoginFormType = z.infer<typeof loginZod>;
export type LoginResponseType = z.infer<typeof loginResponseZod>;

// 导出模拟数据: mockLoginResponse.generate()
export const mockLoginResponse = zocker(loginResponseZod);
