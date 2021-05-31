module.exports = {
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
  },
  // Example has its own test command
  modulePathIgnorePatterns: ['<rootDir>/example'],
};
