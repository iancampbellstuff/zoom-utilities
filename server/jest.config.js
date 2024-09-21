const esModules = ['lodash-es'].join('|');

/* eslint-env node */
module.exports = {
    globals: {
        __DEV__: true
    },
    // noStackTrace: true,
    // bail: true,
    // cache: false,
    // verbose: true,
    // watch: true,
    collectCoverage: true,
    coverageReporters: ['html', 'lcov', 'json', 'text'],
    coverageDirectory: '<rootDir>/coverage',
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    coveragePathIgnorePatterns: ['constants', '.d.ts$', 'index.ts'],
    coverageThreshold: {
        global: {
            statements: 48,
            branches: 50,
            functions: 46,
            lines: 44
        }
    },
    testMatch: ['<rootDir>/src/**/*.(spec|test).ts'],
    moduleFileExtensions: ['js', 'json', 'ts'],
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/$1',
        '^src/(.*)$': '<rootDir>/src/$1',
        '^app/(.*)$': '<rootDir>/$1'
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
        // See https://jestjs.io/docs/en/configuration.html#transformignorepatterns-array-string
        '^.+\\.(ts)$': 'ts-jest'
    },
    transformIgnorePatterns: [`node_modules/(?!(${esModules}))`]
};
