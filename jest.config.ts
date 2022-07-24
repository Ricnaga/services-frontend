import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/src/pages/**/*.{spec,test}.ts?(x)',
    '<rootDir>/src/pages/**/hooks/*.{spec,test}.ts',
    '<rootDir>/src/pages/**/components/**/*.{spec,test}.ts?(x)',
    '<rootDir>/src/pages/**/components/**/hooks/*.{spec,test}.ts',
    '<rootDir>/src/shared/components/**/*.{spec,test}.ts?(x)',
    '<rootDir>/src/shared/components/**/hooks/*.{spec,test}.ts',
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'json'],
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],
  testEnvironment: 'jsdom',
};

export default config;
