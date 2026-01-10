import type { Config } from "jest";

export interface JestConfigOptions {
  displayName: string;
  setupFilesAfterEnv?: string[];
  rootDir?: string;
  coverageDirectory?: string;
  collectCoverageFrom?: string[];
}

export default function createJestConfig(options: JestConfigOptions): Config;
