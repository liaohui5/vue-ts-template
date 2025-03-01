import { http } from "@/tools/http";
import { encryptPassword, addRenameFileds } from "./transformers/auth";
import { type LoginFormType, type LoginResponseType } from "@/types";
import { LoginFormRules, LoginResponseRules } from "@/validation";

/**
 * @description 登录接口
 * POST /api/auth
 * @param {Object} data -  data
 * @returns {Promise<AxiosResponse<LoginResponseType>>}
 */
export const login = async (data: LoginFormType): Promise<LoginResponseType> => {
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
