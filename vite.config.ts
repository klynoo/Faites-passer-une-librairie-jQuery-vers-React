import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import type { UserConfigExport } from "vite";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setupTests.ts",
  },
} as UserConfigExport);
