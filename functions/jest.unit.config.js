module.exports = {
  testEnvironment: "node",
  testTimeout: 10000,
  testMatch: ["**/*.unit.test.js"],
  verbose: true,
  collectCoverage: true,
  coverageReporters: ["text", "lcov"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};
