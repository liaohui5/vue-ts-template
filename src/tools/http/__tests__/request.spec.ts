import { describe, it, expect } from "vitest";
import { z } from "zod";
import { genRequestId, REQUEST_ID_KEY, requestValidate, TOKEN_HEADER_KEY, withToken } from "@/tools/http";
import { deleteToken, saveToken } from "@/tools/token";
import { initMockHttp } from "@/__tests__/helpers";

// zod 规则
const validateRule = z.object({
  foo: z.string(),
  bar: z.boolean(),
  baz: z.number(),
});

// 创建能够通过 zod 规则校验的数据
const createValidatedData = () => {
  return {
    foo: "foo",
    bar: true,
    baz: 1,
  };
};

describe("请求拦截器", () => {
  describe("生成请求id", () => {
    it(`应该给请求 params 参数添加 ${REQUEST_ID_KEY} 字段`, async () => {
      const { reply, send, getLastRequest } = initMockHttp(genRequestId);
      reply();

      await send();
      const { params } = getLastRequest();
      expect(params[REQUEST_ID_KEY]).toBeTypeOf("string");
    });

    it(`应该给请求 params 参数添加 ${REQUEST_ID_KEY} 字段, 并且不会影响其他 params 字段`, async () => {
      const { reply, send, getLastRequest } = initMockHttp(genRequestId);
      reply();

      await send({
        params: {
          foo: "foo",
          bar: "bar",
        },
      });

      const { params } = getLastRequest();
      expect(params.foo).toBe("foo");
      expect(params.bar).toBe("bar");
      expect(params[REQUEST_ID_KEY]).toBeTypeOf("string");
    });
  });

  describe("请求数据校验", () => {
    it(`应该校验 axios 请求对象 params 参数, 不通过校验就抛出异常`, async () => {
      const { reply, send, getLastRequest } = initMockHttp(requestValidate);
      reply();

      function sendReqFunc(data: object) {
        return send({
          reqParamsZod: validateRule,
          params: data,
        });
      }

      await expect(() => sendReqFunc({ foo: "foo" })).rejects.toThrow();

      // 因为抛出异常后不会发送请求, 所以 从 mockServer
      // history 记录中获取的 request 为 undefined
      const lastRequest = getLastRequest();
      expect(lastRequest).toBeUndefined();

      // 通过校验的就正常发送请求
      await sendReqFunc(createValidatedData());
      const { params } = getLastRequest();
      expect(params).toEqual(createValidatedData());
    });

    it("应该校验 axios 请求对象 headers 参数, 不通过校验规则就抛出异常", async () => {
      const { reply, send, getLastRequest } = initMockHttp(requestValidate);
      reply();

      function sendReqFunc(data: object) {
        return send({
          // 注意: headers 必须全部是字符串
          reqHeaderZod: z.object({ foo: z.string(), bar: z.string() }),
          headers: data,
        });
      }

      await expect(() => sendReqFunc({ foo: "foo" })).rejects.toThrow();

      // 因为抛出异常后不会发送请求, 所以 从 mockServer
      // history 记录中获取的 request 为 undefined
      const lastRequest = getLastRequest();
      expect(lastRequest).toBeUndefined();

      // 通过校验的就正常发送请求
      const customHeaders = { foo: "foo", bar: "bar" };
      await sendReqFunc(customHeaders);
      const { headers } = getLastRequest();
      expect(headers).toMatchObject(customHeaders);
    });

    it("应该校验 axios 请求对象 data 参数, 不通过校验规则就抛出异常", async () => {
      const { reply, send, getLastRequest } = initMockHttp(requestValidate);
      reply();

      function sendReqFunc(data: object) {
        return send({
          reqDataZod: validateRule,
          data: data,
        });
      }

      await expect(() => sendReqFunc({ foo: "foo" })).rejects.toThrow();

      // 因为抛出异常后不会发送请求, 所以 从 mockServer
      // history 记录中获取的 request 为 undefined
      const lastRequest = getLastRequest();
      expect(lastRequest).toBeUndefined();

      // 通过校验的就正常发送请求
      await sendReqFunc(createValidatedData());
      const { data } = getLastRequest();
      expect(data).toBe(JSON.stringify(createValidatedData()));
    });
  });

  describe("自动携带 token", () => {
    it(`如果有token, 将 token 将设置到 request headers 的 ${TOKEN_HEADER_KEY} 字段`, async () => {
      const { reply, send, getLastRequest } = initMockHttp(withToken);
      reply();

      // 防止其他 test case 会影响, 先删除 token
      deleteToken();
      await send();
      const { headers } = getLastRequest();
      expect(headers?.[TOKEN_HEADER_KEY]).toBe(undefined);

      // 保存 token 后再次发送
      saveToken("mock-token");
      await send();
      const req = getLastRequest();
      expect(req.headers?.[TOKEN_HEADER_KEY]).toBe("mock-token");
    });
  });
});
