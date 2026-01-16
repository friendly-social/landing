import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
    eslint.configs.recommended,
    tseslint.configs.strict,
    {
        rules: {
            "semi": [2, "always"],
            "quotes": ["warn", "double", { "avoidEscape": true }],
            "comma-dangle": ["warn", "always-multiline"],
            "no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_"
                }
            ],
            "@typescript-eslint/explicit-function-return-type": ["error"],
            // "@typescript-eslint/explicit-function-return-type": ["error", { "allowExpressions": true }],
        },
    },
);

