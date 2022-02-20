module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "tsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "no-underscore-dangle": 0,
        "arrow-body-style": 0,
        "no-shadow":0,
        "consistent-return": 0,
        "no-nested-ternary":0,
        "no-console": 1,
        "no-case-declarations":0,
        "import/prefer-default-export":0,
        "react / forbid-prop-types":0,
        '@typescript-eslint/no-var-requires': 0,
    }
}
