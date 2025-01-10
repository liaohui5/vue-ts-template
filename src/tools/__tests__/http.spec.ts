import AxiosMockAdapter from "axios-mock-adapter";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getHttpInst, REQUEST_ID_KEY, TOKEN_HEADER_KEY } from "@/tools/http";
import { saveToken } from "@/tools/token";
import * as handler from "@/tools/http/httpErrorHandler";

// 专门用于单元测试的 axios 的 adapater
// https://github.com/ctimmerm/axios-mock-adapter
const http = getHttpInst();
const mockHttp = new AxiosMockAdapter(http);

// 发送请求
const sendRequest = (opts = {}) => http.get("/mock-request", opts);

// 获取最后一个请求记录
const getLastRequest = (): AxiosMockAdapter["history"][0] => mockHttp.history.get[0];

// 模拟响应
function mockReply(status: number, data: unknown = null) {
  if (data) {
    mockHttp.onGet("/mock-request").reply(status, data);
  } else {
    mockHttp.onGet("/mock-request").reply(status);
  }
}

describe("测试请求客户端", () => {
  beforeEach(() => {
    // 重置 mockHttp 的状态
    mockHttp.reset();
  });

  it(`应该给每个请求添加 ${REQUEST_ID_KEY} 参数`, async () => {
    mockReply(200);
    await sendRequest();

    const lastRequest = getLastRequest();
    expect(lastRequest.params[REQUEST_ID_KEY]).toBeTypeOf("string");
  });

  it(`当有 token 的时候, 应该添加 ${TOKEN_HEADER_KEY} 字段到 header 中`, async () => {
    const token = "token-string";
    saveToken(token);

    mockReply(200);
    await sendRequest();

    const lastRequest = getLastRequest();
    expect(lastRequest.headers?.[TOKEN_HEADER_KEY]).toBe(token);
  });

  it("当响应 status 为 200 的时候, 应该直接返回响应体", async () => {
    const body = {
      msg: "response body",
    };
    mockReply(200, body);

    const data = await sendRequest();

    expect(data).toEqual(body);
  });

  it("当响应 status 不为 200 的时候, 应该调用 httpErrorHander ", async () => {
    const spyFunc = vi.spyOn(handler, "httpErrorHandler");

    mockReply(500);
    await sendRequest();
    expect(spyFunc).toBeCalled();
  });
});
