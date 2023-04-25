/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
    //  ,
    // "^.+\\.(css|scss|sass|less)$": "jest-preview/transforms/css",
    // "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "jest-preview/transforms/file",
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setupFilesAfterEnv.js'],
  //globalSetup: '<rootDir>/jest.globalSetup.js',
  //setupFiles: ['<rootDir>/src/setupFiles.js']
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
};