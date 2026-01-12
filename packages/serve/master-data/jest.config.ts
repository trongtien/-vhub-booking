import type { Config } from "jest";
import createJestConfig from "@booking/jest-config/register-jest";

const config: Config = createJestConfig({
  displayName: "@booking/master-data",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
});

export default config;
