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
    'sort-imports': ['error', {
      ignoreDeclarationSort: true,
      memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple']
    }],
    'object-curly-newline': ['error', { multiline: true }],
    'prefer-regex-literals': ['off'],
    'no-useless-return': 'off',
    camelcase: 'off'
  }
}
