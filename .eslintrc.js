module.exports = {
  root: true,
  // ignorePatterns: ['projects/**/*'],
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: ["tsconfig.json"],
        createDefaultProgram: true,
      },
      extends: [
        "airbnb-base",
        "airbnb-typescript/base",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
      ],
      rules: {
        "object-curly-spacing": ["error", "always"],
        "@angular-eslint/directive-selector": [
          "error",
          {
            type: "attribute",
            prefix: ["template", "router"],
            style: "camelCase",
          },
        ],
        "@angular-eslint/component-class-suffix": [
          "error",
          {
            suffixes: ["Component", "Container"],
          },
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            type: "element",
            prefix: ["app", "example"],
            style: "kebab-case",
          },
        ],
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "_",
          },
        ],
        "import/prefer-default-export": 0,
        "class-methods-use-this": 0,
        "import/no-extraneous-dependencies": 0,
        "@typescript-eslint/lines-between-class-members": 0,
        "@angular-eslint/no-empty-lifecycle-method": 0,
        "no-underscore-dangle": ["error", { allowAfterThis: true }],
        "@typescript-eslint/explicit-module-boundary-types": [
          "error",
          {
            allowedNames: ["ngOnInit"],
          },
        ],
        "import/extensions": 0,
      },
    },
    {
      files: ["*.html"],
      extends: [
        "plugin:@angular-eslint/template/recommended",
        "plugin:prettier/recommended",
      ],
      rules: {
        "max-len": ["error", { code: 140 }],
        "prettier/prettier": ["error", { parser: "angular" }],
      },
    },
  ],
};
