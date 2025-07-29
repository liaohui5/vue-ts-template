import { describe, expect, it } from "vitest";
import { encryptPassword } from "@/api/auth";

describe("transformers auth", () => {
  it("应该使用md5算法的结果密文传输数据", () => {
    const data = {
      email: "admin@example.com",
      password: "123456",
    };
    const result = encryptPassword(data);
    expect(result.password).toBe("e10adc3949ba59abbe56e057f20f883e");
  });
});
