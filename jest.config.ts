import type { Config } from "jest";
import nextJest from "next/jest.js";

// next/jest wires up SWC (same compiler Next.js uses) so TypeScript and the
// @/* path alias from tsconfig.json both work in tests without extra setup.
const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  // jsdom gives every test file a simulated browser environment (window,
  // document, localStorage) so both pure-logic tests and hook tests work.
  testEnvironment: "jest-environment-jsdom",

  // Runs after the test environment is set up; loads @testing-library/jest-dom
  // so custom matchers like toBeInTheDocument() are available in every test file.
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Collect test files from any __tests__ folder in the project.
  testMatch: ["**/__tests__/**/*.test.{ts,tsx}"],
};

export default createJestConfig(config);
