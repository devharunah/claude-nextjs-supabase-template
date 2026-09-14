import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    ...devices["Desktop Chrome"],
    baseURL: "http://127.0.0.1:3000",
  },
  webServer: {
    command: "pnpm build && pnpm start",
    url: "http://127.0.0.1:3000",
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
  },
});
