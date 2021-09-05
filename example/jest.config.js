module.exports = {
  transform: {
    "^.+\\.tsx?$": ["esbuild-jest", { sourcemap: true }],
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["<rootDir>/example/**/*.(spec|test).{ts,tsx,js,jsx}"],
  rootDir: "..",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^system-props$": "<rootDir>/system-props/src",
  },
};
