module.exports = {
  //extends: ['airbnb-typescript-prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    //'object-curly-newline': ['error', { 'ImportDeclaration': 'always'}],
    'object-curly-newline': ['error', {
      'ImportDeclaration': { 'multiline': true, 'minProperties': 3 },
    }]  
  }
}