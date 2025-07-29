import * as z from "zod";

// 数据验证结果类型
interface ValidateResult<T> {
  passed: boolean;
  data?: T;
  errors: z.ZodFormattedError<T>;
}

// 数据验证(异步)
export async function validate<T>(dataSource: T, rules: z.ZodTypeAny): Promise<ValidateResult<T>> {
  const results = await rules.safeParseAsync(dataSource);
  return formatValidateResult<T>(results as z.ZodSafeParseResult<T>);
}

// 数据验证(同步)
export function validateSync<T>(dataSource: T, rules: z.ZodTypeAny): ValidateResult<T> {
  const results = rules.safeParse(dataSource);
  return formatValidateResult<T>(results as z.ZodSafeParseResult<T>);
}

// 格式化数据验证的结果
function formatValidateResult<T>(result: z.ZodSafeParseResult<T>): ValidateResult<T> {
  if (result.success) {
    return {
      passed: true,
      data: result.data,
      errors: { _errors: [] } as unknown as z.ZodFormattedError<T>,
    };
  }

  return {
    passed: false,
    data: undefined,
    errors: z.formatError(result.error),
  };
}
