module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'google',
  ],
  parserOptions: {
    'ecmaVersion': 2017,
  },
  plugins: [
    'promise',
  ],
  rules: {
    'quotes': ['error'],
    'object-curly-spacing': 0,
    'indent': 0,
    'eol-last': 0,
    'camelcase': 0,
    'linebreak-style': 0,
    'require-jsdoc': ['error', {
      'require': {
          'FunctionDeclaration': false,
          'MethodDefinition': false,
          'ClassDeclaration': false,
          'ArrowFunctionExpression': false,
          'FunctionExpression': false,
      },
    }],
    'valid-jsdoc': 0,
    'operator-linebreak': 0,
  },
};