import { merge, md5 } from "@/tools";
import type { LoginFormType, LoginResponseType } from "@/types";

// 登录接口请求数据格式映射(密码不要明文传输)
export function encryptPassword(data: LoginFormType) {
  return merge(data, {
    password: md5(data.password),
  });
}

// 登录接口响应数据格式映射
export function addRenameFileds(data: LoginResponseType) {
  return merge(data, {
    avatar_url: data.avatar,
    nickname: data.username,
  });
}
