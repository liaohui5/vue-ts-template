import type { SafeParseReturnType, Schema, ZodIssue } from "zod";

// 错误消息
export type ErrorMessage = ZodIssue & { field: string };

// 数据验证结果
export interface ValidateResult<T> {
  passed: boolean;
  data: T;
  errors: ErrorMessage[];
}

// 数据验证(异步)
export async function validate<T>(dataSource: T, rules: Schema): Promise<ValidateResult<T>> {
  const results = await rules.safeParseAsync(dataSource);
  return formatValidateResult<T>(results);
}

// 同步的验证数据(同步)
export function validateSync<T>(dataSource: T, rules: Schema): ValidateResult<T> {
  const results = rules.safeParse(dataSource);
  return formatValidateResult<T>(results);
}

// 格式化数据验证的结果
function formatValidateResult<T>(result: SafeParseReturnType<T, T>): ValidateResult<T> {
  if (result.success) {
    return {
      passed: true,
      data: result.data,
      errors: [],
    };
  }
  return {
    passed: false,
    data: result.data as T,
    errors: result.error.issues.map(formatIssue),
  };
}

// 格式化 ZodIssue
function formatIssue(issue: ZodIssue): ErrorMessage {
  return {
    field: issue.path.join("."),
    ...issue,
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
