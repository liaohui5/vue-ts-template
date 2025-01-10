import { http, HttpResponse } from "msw";
import { generateMock } from "@anatine/zod-mock";
import { LoginResponseRules } from "@/validation";

// 登录接口
export const loginHandler = http.post("/api/auth", () => {
  const mockData = generateMock(LoginResponseRules);
  mockData.token = "msw-mock-token-string";
  return HttpResponse.json(mockData);

  // return HttpResponse.json({
  //   id: 1,
  //   username: "admin",
  //   avatar: "https://iph.href.lu/100x100?text=img",
  //   email: "admin@qq.com",
  //   created_at: "2024-06-10T17:17:09.000Z",
  //   token: "msw-mock-token-string",
  // });
});
