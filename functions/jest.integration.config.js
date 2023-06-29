module.exports = {
  testEnvironment: "node",
  testTimeout: 30000,
  testMatch: ["**/*.integration.test.js"],
  verbose: true,
  collectCoverage: true,
  coverageReporters: ["text", "lcov"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};
