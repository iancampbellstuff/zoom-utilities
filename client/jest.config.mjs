import { quasarEsModulesPackageNames } from '@quasar/quasar-app-extension-testing-unit-jest/jest-preset.mjs';

/** @type {import('jest').Config} */
export default {
  preset: '@quasar/quasar-app-extension-testing-unit-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.vue',
    '<rootDir>/src/**/*.js',
    '<rootDir>/src/**/*.ts'
  ],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: ['index.ts', '.d.ts$'],
  coverageThreshold: {
    global: {
      branches: 16,
      functions: 13,
      lines: 37,
      statements: 38
    }
  },
  moduleFileExtensions: ['js', 'json', 'ts', 'vue'],
  modulePaths: ['<rootDir>/src/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['<rootDir>/src/**/*.(spec|test).+(ts|js)?(x)'],
  transform: {
    [`^(${quasarEsModulesPackageNames}).+\\.js$`]: 'babel-jest',
    '^.+\\.(ts|js|html)$': [
      'ts-jest',
      {
        // Remove if using `const enums`
        // See https://kulshekhar.github.io/ts-jest/docs/getting-started/options/isolatedModules/
        isolatedModules: true
      }
    ]
  },
  verbose: true
};
