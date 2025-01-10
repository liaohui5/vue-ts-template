import type { Schema, ZodIssue } from "zod";

// 错误消息
type ErrorMessage = ZodIssue & { field: string };
function formatIssue(issue: ZodIssue): ErrorMessage {
  return {
    field: issue.path.join("."),
    ...issue,
  };
}

// 验证结果
interface ValidateResult<T> {
  passed: boolean;
  data: T;
  errors: ErrorMessage[];
}

// 数据验证
export async function validate<T>(dataSource: T, rules: Schema): Promise<ValidateResult<T>> {
  if (!dataSource || !rules) {
    return Promise.reject("数据源或验证规则不能为空");
  }

  const results = await rules.safeParseAsync(dataSource);
  if (results.success) {
    return {
      passed: true,
      data: results.data,
      errors: [],
    };
  }

  return {
    passed: false,
    data: dataSource,
    errors: results.error.issues.map(formatIssue),
  };
}

// 格式错误信息
export function flatErrors<T extends object>(errors: ErrorMessage[]): Record<keyof T, string> {
  const result: Record<string, string> = {};
  for (const item of errors) {
    result[item.field] = item.message;
  }
  return result as Record<keyof T, string>;
}

// 导出验证规则
export * from "./rules/auth";
