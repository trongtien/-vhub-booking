/**
 * Base Jest configuration factory for @booking packages
 * @param {Object} options Configuration options
 * @param {string} options.displayName Display name for the test suite
 * @param {string[]} [options.setupFilesAfterEnv] Setup files to run after Jest environment setup
 * @param {string} [options.rootDir="."] Root directory for tests
 * @param {string} [options.coverageDirectory="./coverage"] Coverage output directory
 * @param {string[]} [options.collectCoverageFrom] Glob patterns for coverage collection
 * @returns {import('jest').Config} Jest configuration object
 */
export default ({
  displayName,
  setupFilesAfterEnv = [],
  rootDir = ".",
  coverageDirectory = "./coverage",
  collectCoverageFrom = ["src/**/*.ts", "!src/**/*.d.ts", "!src/**/index.ts"],
}) => {
  return {
    displayName,
    preset: "ts-jest",
    testEnvironment: "node",
    rootDir,

    // Test patterns
    testMatch: ["**/?(*.)+(spec|test).ts"],

    // Coverage
    collectCoverageFrom,
    coverageDirectory,
    coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],

    // Setup files
    setupFilesAfterEnv,

    // Module resolution
    moduleFileExtensions: ["ts", "js", "json"],

    // Transform
    transform: {
      "^.+\\.ts$": [
        "ts-jest",
        {
          tsconfig: "tsconfig.json",
        },
      ],
    },

    // Mock and cleanup settings
    clearMocks: true,
    restoreMocks: true,
    resetMocks: true,
  };
};
