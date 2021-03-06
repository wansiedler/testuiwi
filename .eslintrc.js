module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    rules: {
        "react/jsx-filename-extension": [
            2,
            {
                extensions: [".js", ".jsx", ".ts", ".tsx"]
            }
        ],
        "react/jsx-first-prop-new-line": [2, "multiline"],
        "react/jsx-max-props-per-line": [
            2,
            {
                maximum: 1,
                when: "multiline"
            }
        ],
        // "react/jsx-indent-props": [2, 2],
        // "react/jsx-closing-bracket-location": [2, "tag-aligned"],
        quotes: [
            "error",
            "double",
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        // semi: ["error", "always"],
        semi: [0, "never"],
        indent: ["off"],
        "comma-dangle": [
            "error",
            {
                arrays: "never",
                objects: "never",
                imports: "never",
                exports: "never",
                functions: "never"
            }
        ],
        "eslint-comments/no-unused-disable": "off",
        "prettier/prettier": "off",
        // "@typescript-eslint/indent": ["error", 2],
        "@typescript-eslint/no-unused-vars": "off",
        "no-duplicate-imports": "off",
        "@typescript-eslint/no-explicit-any": "off",
        // suppress errors for missing 'import React' in files
        "react/react-in-jsx-scope": "off",
        "prefer-const": "off",
        "no-constant-condition": "off",
        // "@babel/plugin-proposal-private-property-in-object": "off",
        // "import/no-anonymous-default-export": "off",
        // "no-constant-condition": "off",
        "react/prop-types": "off",
        "react/display-name": "off",
        "react/no-unescaped-entities": "off",
        "react-hooks/rules-of-hooks": "off",
        "react/no-did-mount-set-state": "off",
        "react-redux/prefer-separate-component-file": "off",
        "react-hooks/exhaustive-deps": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/ban-ts-ignore": ["off"],
        "@typescript-eslint/camelcase": ["off"],
        "@typescript-eslint/interface-name-prefix": ["off"],
        "@typescript-eslint/no-unused-expressions": ["off"],
        "@typescript-eslint/no-use-before-define": ["off"],
        "no-async-promise-executor": ["off"],
        "no-empty-pattern": ["off"],
        "no-undef": ["off"],
        "no-var": ["error"],
        "no-mixed-spaces-and-tabs": ["off"],
        "object-curly-spacing": ["error", "always"],
        "spaced-comment": ["off"],
        "no-prototype-builtins": ["off"],
        // "sort-keys": ["off"],
        "space-before-function-paren": ["off"]
    }
};
