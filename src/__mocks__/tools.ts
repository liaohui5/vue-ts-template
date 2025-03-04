import { env } from "@/tools";

export function useMockApi(path: string): string {
  return `${env.VITE_APP_API_BASE_URL}${path}`;
}
