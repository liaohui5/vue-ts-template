import { encryptPassword, addRenameFileds } from "@/api/transformers/auth";
import type { LoginResponseType } from "@/types";
import { describe, it, expect } from "vitest";

describe("transformers auth", () => {
  it("应该使用md5算法的结果密文传输数据", () => {
    const data = {
      email: "admin@example.com",
      password: "123456",
    };
    const result = encryptPassword(data);
    expect(result.password).toBe("c4ca4238a0b923820dcc509a6f75849b");
  });

  it("应该添加头像和用户昵称字段", () => {
    const data = {
      avatar: "mock-avatar-url",
      username: "mock-username",
    };
    const result = addRenameFileds(data as LoginResponseType);
    expect(result.avatar_url).toBe("mock-avatar-url");
    expect(result.nickname).toBe("mock-username");
  });
});
