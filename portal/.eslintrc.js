module.exports = {
    extends: ['eslint:recommended', require.resolve('@umijs/lint/dist/config/eslint')],
    globals: {
        page: true,
        REACT_APP_ENV: true,
    },
    rules: {
        'no-shadow': 'off',
        eqeqeq: 'off',
        '@typescript-eslint/no-shadow': ['off'],
        '@typescript-eslint/no-unused-vars': ['warn'],
    },
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
};
