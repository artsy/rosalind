module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: ['standard', 'standard-react', 'plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
    'space-before-function-paren': ['error', 'never'],

    // next two rules are a workaround, see
    // https://github.com/babel/babel-eslint/issues/681#issuecomment-420663038
    indent: 'off',
    'template-curly-spacing': 'off'
  }
}
