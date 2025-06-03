import { z } from "zod";
import { LoginFormRules, LoginResponseRules } from "@/validation/auth.rule";
export type LoginFormType = z.infer<typeof LoginFormRules>;
export type LoginResponseType = z.infer<typeof LoginResponseRules>;

// 需要显示的数据格式(需要有 avatarUrl 和 nickname 字段)
export interface LoginResponseVO extends LoginResponseType {
  avatarUrl: string;
  nickname: string;
}
