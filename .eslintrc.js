module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: ['plugin:prettier/recommended'],
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
  plugins: ['react', 'inclusive-language'],
  rules: {
    'react/jsx-handler-names': 'off',
    'react/prop-types': 'off',
    'space-before-function-paren': ['error', 'never'],
    'inclusive-language/use-inclusive-words': [
      "error",
      {
        "words": [
          {
            "word": "blacklist",
            "suggestions": ["denylist or blocklist"],
            "explanation": "The usage of the non-inclusive word '{{word}}' is discouraged, use '{{suggestion}}' instead."
          }
        ]
      }
    ],

    // next two rules are a workaround, see
    // https://github.com/babel/babel-eslint/issues/681#issuecomment-420663038
    indent: 'off',
    'template-curly-spacing': 'off'
  }
}
