import { z } from "zod";

const email = z.string().email("邮箱格式有误");

// 明文密码验证规则
const password = z
  .string()
  .min(6, "密码至少6位")
  .max(16, "密码最多16位")
  .superRefine((value, ctx) => {
    if (!value || value.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "密码不能为空",
      });
    } else if (!/^[0-9A-Za-z_@#*()-=+=!?.,&^%$#]+$/.test(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "密码含有非法字符",
      });
    }
  });

// 登录表单数据验证规则
export const LoginFormRules = z.object({
  email,
  password,
});

// 登录表单数据类型定义
export type LoginFormType = z.infer<typeof LoginFormRules>;

// 登录接口响应的数据验证规则
export const LoginResponseRules = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  avatar: z.string().url(),
  token: z.string(),
});

// 登录接口响应的数据类型定义
export type LoginResponseType = z.infer<typeof LoginResponseRules>;
