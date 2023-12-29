module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'semi': ['error', 'always'],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        'multiline': { 
          'delimiter': 'semi',
          'requireLast': true,
        },
        'singleline': {
          'delimiter': 'semi',
          'requireLast': false,
        },
      }
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
