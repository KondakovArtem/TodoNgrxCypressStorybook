module.exports = {
    overrides: [
        {
            files: ['**/*.scss'],
            customSyntax: 'postcss-scss',
        },
    ],
    plugins: ['stylelint-prettier'],
    extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier'],
    rules: {
        'prettier/prettier': true,
        'no-descending-specificity': null,
        'scss/at-mixin-pattern': null,
        'scss/at-function-pattern': null,
        'scss/no-global-function-names': null,
        'function-name-case': null,
        'color-function-notation': 'legacy',
        'scss/dollar-variable-empty-line-before': null,
        'selector-pseudo-element-no-unknown': [true, { ignorePseudoElements: ['ng-deep'] }],
        'number-max-precision': 6,
    },
};
