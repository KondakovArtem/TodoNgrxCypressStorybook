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
        "no-underscore-dangle": 0,
        "class-methods-use-this": 0,
        "@typescript-eslint/array-type": "error",
        "@typescript-eslint/ban-ts-comment": 0,
        "@typescript-eslint/no-empty-function": 0,
        "@typescript-eslint/explicit-module-boundary-types": 0,
        "@typescript-eslint/lines-between-class-members": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "no-async-promise-executor": 0,
        "@angular-eslint/no-empty-lifecycle-method": 0,
        "@angular-eslint/no-output-on-prefix": 0,
        "import/prefer-default-export": 0,
        "import/no-extraneous-dependencies": 0,
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
