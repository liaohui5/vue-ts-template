import { HttpResponse, http } from "msw";
import { zocker } from "zocker";
import { useMockApi } from "@/tools";
import { LoginResponseRules } from "@/validation/auth.rule";

const defaultAvatar = "https://raw.githubusercontent.com/liaohui5/images/main/images/202503041407813.jpg";

// 模拟登录接口: 直接根据 zod 验证规则来模拟数据
export const loginHandler = http.post(useMockApi("/api/auth"), () => {
  const mockData = zocker(LoginResponseRules).generate();
  mockData.avatar = defaultAvatar;
  return HttpResponse.json(mockData);

  // 虽然使用验证规则可以很方便的模拟数据, 但是每次数据都
  // 不一样如果需要一个固定的数据, 请使用手动模拟的方式
  // return HttpResponse.json({
  //   id: 1,
  //   username: "admin",
  //   avatar: "https://iph.href.lu/100x100?text=img",
  //   email: "admin@qq.com",
  //   created_at: "2024-06-10T17:17:09.000Z",
  //   token: "msw-mock-token-string",
  // });
});
