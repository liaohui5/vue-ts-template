import { env } from "@/tools";

export async function setupMSW() {
  if (!env.VITE_APP_MOCK_API_ENABLED) {
    return Promise.resolve();
  }

  // @ts-ignore
  const { startMockServer } = await import("@/__mocks__/browser.ts");
  startMockServer();
}
