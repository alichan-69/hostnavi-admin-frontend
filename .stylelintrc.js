module.exports = {
  plugin: ['stylelint-scss', 'stylelint-prettier', 'stylelint-order'],
  extends: ['stylelint-config-recommended-scss', 'stylelint-config-rational-order', 'stylelint-prettier/recommended'],
  ignoreFiles: ['**/node_modules/**'],
  overrides: [
    {
      files: ['src/**/*.{jsx,tsx,js,ts}'],
      customSyntax: '@stylelint/postcss-css-in-js',
    },
  ],
  rules: {
    'no-descending-specificity': null,
    'prettier/prettier': true,
    'order/properties-alphabetical-order': true,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind'],
      },
    ],
  },
};
