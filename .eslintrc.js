module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    project: './tsconfig.json',
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
    createDefaultProgram: true,
    jsx: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'standard',
    'standard-with-typescript'
  ],
  rules: {
    '@typescript-eslint/semi': ['error', 'always'],
    'vue/max-attributes-per-line': ['error',
      {
        singleline: 8,
        multiline: {
          max: 8,
          allowFirstLine: true
        }
      }
    ],
    'vue/attribute-hyphenation': 'off',
    'vue/no-deprecated-v-bind-sync': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    'import/export': 'off',
    'vue/require-prop-types': 'off',
    'vue/no-v-model-argument': 'off',
    'vue/no-multiple-template-root': 'off',
    '@typescript-eslint/indent': ['error', 2, { SwitchCase: 1 }],
    semi: ['error', 'always'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-useless-escape': 'off'
  }
};
