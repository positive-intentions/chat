module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    // setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    moduleNameMapper: {
      '\\.(css|less|scss)$': 'identity-obj-proxy',
    },
    collectCoverage: true,
    coverageReporters: ['lcov', 'text'],
    transform: {
        "^.+\\.(ts|tsx|js|jsx)$": "babel-jest"
      },
    collectCoverageFrom: ['src/stories/components/*.{js,jsx,ts,tsx}'],
    //   // support jsx
    //     testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    //     moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  };