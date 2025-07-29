import { z } from "zod";
import { LoginFormRules, LoginResponseRules } from "@/validation/auth.rule";
export type LoginFormType = z.infer<typeof LoginFormRules>;
export type LoginResponseType = z.infer<typeof LoginResponseRules>;
