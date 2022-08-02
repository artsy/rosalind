module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: ['plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'react', 'inclusive-language'],
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
    '@typescript-eslint/no-loss-of-precision': 'off', // incompatible with ESLint v6
    '@typescript-eslint/ban-ts-comment': 'off', // can consider turning on as ts conversion progresses
    '@typescript-eslint/no-empty-function': 'warn',

    // next two rules are a workaround, see
    // https://github.com/babel/babel-eslint/issues/681#issuecomment-420663038
    indent: 'off',
    'template-curly-spacing': 'off'
  }
}
