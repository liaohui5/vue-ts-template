import { assign, md5 } from "@/tools";
import { http } from "@/tools/http";
import type { LoginFormType, LoginResponseType } from "@/types/auth";
import { LoginFormRules, LoginResponseRules } from "@/validation";

// TODO: 重构,将数据处理放到 store 逻辑中
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
 * @returns {Promise<AxiosResponse<LoginResponseType>>}
 */
export const login = async (data: LoginFormType): Promise<LoginResponseType> => {
  return await http.request({
    url: "/api/auth",
    method: "POST",
    data: encryptPassword(data),

    // 请求登录接口时候的数据验证规则, 由于密码会 md5 然后
    // 再发送, 所以请求接口时密码的验证规则不需要验证密码
    reqDataZod: LoginFormRules.omit({ password: true }),

    // 验证接口响应数据, 仅仅是为了调试方便, 完全可以不用验证
    resBodyZod: LoginResponseRules,
  });
};
