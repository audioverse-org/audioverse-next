module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint/eslint-plugin',
		'formatjs',
		'testing-library',
		'jest-dom',
		'@mizdra/layout-shift',
		'react-hooks',
		'lodash',
		'@calm/react-intl',
		'simple-import-sort',
		'import',
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:testing-library/dom',
		'plugin:jest-dom/recommended',
		'plugin:@next/next/recommended',
	],
	root: true,
	env: {
		browser: true,
		jest: true,
	},
	rules: {
		'@calm/react-intl/missing-formatted-message': [
			'error',
			{
				noTrailingWhitespace: true,
				ignoreLinks: false,
				enforceLabels: true,
				enforceImageAlts: true,
				enforceInputProps: true,
			},
		],
		'@calm/react-intl/missing-attribute': [
			'error',
			{
				noTrailingWhitespace: true,
				noSpreadOperator: true,
				requireDescription: false,
				formatDefineMessages: true,
				requireIdAsString: true,
				requireDefaultMessage: true,
			},
		],
		'@calm/react-intl/missing-values': 2,
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				varsIgnorePattern: '_',
				argsIgnorePattern: '_',
			},
		],
		'@typescript-eslint/no-unused-expressions': [
			'error',
			{
				allowShortCircuit: true,
				allowTernary: true,
			},
		],
		'no-mixed-spaces-and-tabs': 'off',
		'@typescript-eslint/interface-name-prefix': 'off',
		'testing-library/prefer-screen-queries': 'off',
		'testing-library/await-async-utils': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'formatjs/no-offset': 'error',
		'@mizdra/layout-shift/require-size-attributes': 2,
		'react/jsx-curly-brace-presence': ['error', 'never'],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'lodash/import-scope': ['error', 'method'],
		'simple-import-sort/imports': 'error',
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	overrides: [
		{
			files: [
				'*.spec.ts',
				'*.spec.tsx',
				'**/__mocks__/**/*',
				'**/__tests__/**/*',
				'src/lib/test/**/*',
				'testSetup.ts',
			],
			rules: {
				'@typescript-eslint/no-explicit-any': 'off',
				'@calm/react-intl/missing-formatted-message': 'off',
				'@calm/react-intl/missing-attribute': 'off',
				'@calm/react-intl/missing-values': 'off',
				'@typescript-eslint/no-unused-vars': [
					'error',
					{
						varsIgnorePattern: '_',
						argsIgnorePattern: '_',
						caughtErrorsIgnorePattern: '_',
					},
				],
				'testing-library/no-node-access': 'off',
			},
		},
	],
};
