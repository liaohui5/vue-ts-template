import type { LoginResponseType } from "@/validation/rules/auth";
export type * from "@/validation/rules/auth";

// 登录接口返回的信息和需要展示到页面上的字段信息
// 为什么不直接用登录接口返回的字段???
// 因为很多时候, 前端不会直接使用API直接返回的数据
// 而是需要在前端加工处理后才展示, 或许是字段名不一样
// 或许是字段类型不一样, 所以在这里定义一个 VO 类型
export interface LoginResponseVO extends LoginResponseType {
  avatarUrl: string;
  nickname: string;
}
