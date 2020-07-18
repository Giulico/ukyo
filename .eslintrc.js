module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    polyfills: ['fetch'],
  },
  plugins: ['babel', 'compat', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'compat/compat': 'error',
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'no-dupe-else-if': 'error',
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'only-multiline',
        objects: 'only-multiline',
        imports: 'only-multiline',
        exports: 'always',
        functions: 'never',
      },
    ],
  },
}
