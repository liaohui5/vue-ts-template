import { encryptPassword, addRenameFileds } from "@/api/auth";
import { config } from "@/tools";
import { describe, it, expect } from "vitest";
import type { LoginResponseType } from "@/types";

describe("transformers auth", () => {
  it("应该使用md5算法的结果密文传输数据", () => {
    const data = {
      email: "admin@example.com",
      password: "123456",
    };
    const result = encryptPassword(data);
    expect(result.password).toBe("e10adc3949ba59abbe56e057f20f883e");
  });

  it("应该添加头像和用户昵称字段", () => {
    const data = {
      avatar: "mock-avatar-url",
      username: "mock-username",
    };
    const result = addRenameFileds(data as LoginResponseType);
    expect(result.avatarUrl).toBe(config.defaultAvatar);
    expect(result.nickname).toBe("mock-username");
  });
});
