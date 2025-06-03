import { env } from "@/tools";
import { startMockWorker } from "@/__mocks__/browser";

export function setupMSW() {
  if (env.VITE_APP_MOCK_API_ENABLED) {
    startMockWorker();
  }
}
