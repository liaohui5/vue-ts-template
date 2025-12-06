import { HttpResponse, http } from "msw";
import { useMockApi } from "@/tools";
import { mockLoginResponse } from "@/validation/auth.schema";

export const loginHandler = http.post(useMockApi("/api/auth"), () => {
  // 直接根据验证规则来生成对应的数据
  const mockData = mockLoginResponse.generate();
  mockData.avatar = "https://avatars.githubusercontent.com/u/29266093";
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
