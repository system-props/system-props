import { Config } from '@jest/types';

export type JestConfigOptions = Partial<Config.InitialOptions>;

const config: JestConfigOptions = {
  transform: {
    '^.+\\.tsx?$': ['esbuild-jest', { sourcemap: true }],
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}'],
  testMatch: ['<rootDir>/**/*.(spec|test).{ts,tsx,js,jsx}'],
  rootDir: '.',
  moduleNameMapper: {
    '^system-props$': '<rootDir>/src',
  },
  testEnvironment: 'jsdom',
};

export default config;
