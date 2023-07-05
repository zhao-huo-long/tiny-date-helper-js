/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  moduleNameMapper: {
    '^tiny-time-js/dist/(.*)$': '<rootDir>/src/$1',
    '^tiny-time-js': '<rootDir>/src/index',
  },
};