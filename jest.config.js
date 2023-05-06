module.exports = {
  preset: '@testing-library/react-native',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'json',
  ],
  transformIgnorePatterns: [
    // eslint-disable-next-line max-len
    'node_modules/(?!(jest-)?react-native|@react-native-community|@react-native|data-uri-to-buffer|fetch-blob|formdata-polyfill)',
  ],
  modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__'],
  collectCoverage: true,
  coverageReporters: [
    'json',
    'html',
    'lcov',
  ],
  reporters: [
    'default',
    [ 'jest-junit', { outputDirectory: './coverage' } ],
  ],
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.tsx'],
  testMatch: [ '**/__tests__/*.ts?(x)' ],
  coverageDirectory: '<rootDir>/coverage',
  rootDir: './',
};
