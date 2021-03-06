module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'no-use-before-define': 0,
    'arrow-parens': 0,
    'react/forbid-prop-types': 0,
  },
  overrides: [
    {
      files: ['**/__tests__/**'],
      env: {
        jest: true,
      },
    },
  ],
};
