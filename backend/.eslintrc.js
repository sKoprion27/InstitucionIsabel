module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
    camelcase: ['error', 'never'],
    'no-control-regex': 'off',
    'no-useless-return': 'off'
  }
}
