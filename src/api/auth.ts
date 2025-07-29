import { assign, md5 } from "@/tools";
import { http } from "@/tools/http";
import type { LoginFormType, LoginResponseVO } from "@/types/auth";
import { LoginFormRules, LoginResponseRules } from "@/validation/auth.rule";

// 登录接口请求数据格式映射(密码不要明文传输)
export function encryptPassword(data: LoginFormType) {
  return assign(data, {
    password: md5(data.password),
  });
}

/**
 * @description 登录接口
 * POST /api/auth
 * @param {Object} data -  data
 * @returns {Promise<AxiosResponse<LoginResponseVO>>}
 */
export const login = async (data: LoginFormType): Promise<LoginResponseVO> => {
  return await http.request({
    url: "/api/auth",
    method: "POST",
    data: encryptPassword(data),

    // 请求登录接口时候的数据验证规则, 由于密码会 md5 然后
    // 再发送, 所以请求接口时密码的验证规则不需要验证密码
    reqDataZod: LoginFormRules.pick({ email: true }),
    resBodyZod: LoginResponseRules,
  });
};
