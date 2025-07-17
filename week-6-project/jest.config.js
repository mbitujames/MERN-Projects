module.exports = {
  projects: [
    {
      displayName: 'server',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/server/tests/**/*.test.js'],
      setupFilesAfterEnv: ['<rootDir>/server/tests/setup.js'],
    },
    {
      displayName: 'client',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/client/src/tests/**/*.test.jsx'],
      setupFilesAfterEnv: ['<rootDir>/client/src/tests/setup.js'],
      moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      },
      transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
      },
    },
  ],
};