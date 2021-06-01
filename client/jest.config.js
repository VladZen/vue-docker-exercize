const specs_path = '/tests/unit'
const source_path = '/src'

const config = {
  preset: '@vue/cli-plugin-unit-jest',
  roots: [
    `<rootDir>${specs_path}`
  ],
  moduleDirectories: [
    'node_modules',
    `<rootDir>${source_path}`
  ],
  testMatch: [
    `<rootDir>${specs_path}/**/*.spec.[jt]s?(x)`
  ],
  moduleNameMapper: {
    '^@/(.*)$': `<rootDir>${source_path}/$1`
  },
  coverageDirectory: `<rootDir>${specs_path}/coverage`,
  collectCoverageFrom: [
    `<rootDir>${source_path}/**`,
    '!**/node_modules/**'
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!vue-flag-icon).+\\.js$'
  ],
  setupFilesAfterEnv: [
    `<rootDir>${specs_path}/globals.js`,
    `<rootDir>${specs_path}/setupTests.js`
  ]
}

module.exports = config
