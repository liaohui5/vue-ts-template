import { describe, expect, it } from "vitest";
import { z } from "zod";
import { initMockHttp } from "@/__tests__/helpers";
import { responseValidate, unwrapBody } from "@/tools/http";

describe("响应拦截器", () => {
  describe("响应数据校验", () => {
    it("应该校验响应 headers 数据, 校验不通过应该抛出异常", async () => {
      const { reply, send } = initMockHttp(undefined, responseValidate);

      reply();
      function sendReq() {
        return send({
          resHeaderZod: z.object({
            foo: z.string(),
          }),
        });
      }
      await expect(sendReq).rejects.toThrow();

      // 响应数据符合校验规则, 不要报错
      reply(undefined, { foo: "foo" });
      await expect(sendReq()).resolves.toBeDefined();
    });

    it("应该校验响应 data 数据, 校验不通过应该抛出异常", async () => {
      const { reply, send } = initMockHttp(undefined, responseValidate);
      reply();

      function sendReq() {
        return send({
          resBodyZod: z.object({
            foo: z.string(),
          }),
        });
      }
      await expect(sendReq).rejects.toThrow();

      // 响应数据符合校验规则, 不要报错
      reply({ foo: "foo" });
      await expect(sendReq()).resolves.toBeDefined();
    });
  });

  describe("响应数据解包", () => {
    it("解包响应数据,响应体是对象, 并且有data字段直接返回响应体的 data 字段", async () => {
      /* @ts-ignore */
      const { reply, send } = initMockHttp(undefined, unwrapBody);
      reply({
        data: {
          foo: "foo",
        },
      });

      await expect(send()).resolves.toEqual({ foo: "foo" });
    });

    it("解包响应数据, 响应体是对象, 没有 data 字段,直接返回响应体", async () => {
      /* @ts-ignore */
      const { reply, send } = initMockHttp(undefined, unwrapBody);
      reply({
        foo: "foo",
      });

      await expect(send()).resolves.toEqual({ foo: "foo" });
    });
  });
});
