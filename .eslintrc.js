module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
	},
	ignorePatterns: ['**/*.js'],
	plugins: [
		'@typescript-eslint/eslint-plugin',
		'import',
		'formatjs',
		'testing-library',
		'jest-dom',
		'@mizdra/layout-shift',
		'react-hooks',
		'lodash',
		'@calm/react-intl',
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
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
			2,
			{
				noTrailingWhitespace: true,
				ignoreLinks: false,
				enforceLabels: true,
				enforceImageAlts: true,
				enforceInputProps: true,
			},
		],
		'@calm/react-intl/missing-attribute': [
			2,
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
		'sort-imports': [
			'error',
			{
				ignoreDeclarationSort: true,
				ignoreCase: true,
			},
		],
		'import/order': [
			'error',
			{
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
				],
				'newlines-between': 'always',
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
			},
		],
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				varsIgnorePattern: '_',
			},
		],
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
	},
	settings: {
		react: {
			version: 'detect',
		},
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
			},
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
			],
			rules: {
				'@typescript-eslint/no-explicit-any': 'off',
				'@calm/react-intl/missing-formatted-message': 'off',
				'@calm/react-intl/missing-attribute': 'off',
				'@calm/react-intl/missing-values': 'off',
			},
		},
	],
};
