import { assign, isUrl, md5, config } from "@/tools";
import type { LoginFormType, LoginResponseType, LoginResponseVO } from "@/types";

// 登录接口请求数据格式映射(密码不要明文传输)
export function encryptPassword(data: LoginFormType) {
  return assign(data, {
    password: md5(data.password),
  });
}

// 登录接口响应数据格式映射
export function addRenameFileds(data: LoginResponseType): LoginResponseVO {
  const avatarUrl = isUrl(data.avatar) ? data.avatar : config.defaultAvatar;
  return assign(data, {
    avatarUrl,
    nickname: data.username,
  });
}
