import { http } from "@/tools/http";
import { assign, isUrl, md5, config } from "@/tools";
import { LoginFormRules, LoginResponseRules } from "@/validation/auth.rule";
import type { LoginFormType, LoginResponseType, LoginResponseVO } from "@/types/auth";

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

/**
 * @description 登录接口
 * POST /api/auth
 * @param {Object} data -  data
 * @returns {Promise<AxiosResponse<LoginResponseVO>>}
 */
export const login = async (data: LoginFormType): Promise<LoginResponseVO> => {
  const response = await http.request({
    url: "/api/auth",
    method: "POST",
    data: encryptPassword(data),

    // 请求登录接口时候的数据验证规则, 由于密码会 md5 然后
    // 再发送, 所以请求接口时密码的验证规则不需要验证密码
    reqDataZod: LoginFormRules.pick({ email: true }),
    resBodyZod: LoginResponseRules,
  });
  return addRenameFileds(response as unknown as LoginResponseType);
};
