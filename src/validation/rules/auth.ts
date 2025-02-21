import { z } from "zod";

// 登录表单数据验证规则
export const LoginFormRules = z.object({
  email: z.string().email("邮箱格式有误"),
  password: z
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
    }),
});

// 登录接口响应的数据验证规则
export const LoginResponseRules = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  avatar: z.string().url(),
  token: z.string(),
});

export type LoginFormType = z.infer<typeof LoginFormRules>;
export type LoginResponseType = z.infer<typeof LoginResponseRules>;
