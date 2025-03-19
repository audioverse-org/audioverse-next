import { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config({ path: ['.env', '.env.local'] });

const config: CodegenConfig = {
	overwrite: true,
	schema: process.env.NEXT_PUBLIC_API_URL,
	documents: ['src/**/*.graphql', 'scripts/**/*.graphql'],
	generates: {
		'./schema.graphql': {
			plugins: [
				{
					add: {
						content: [
							'# ------------------------------------------------------',
							'# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)',
							'# ------------------------------------------------------ ',
						],
					},
				},
				'schema-ast',
			],
		},
		'src/__generated__/graphql.ts': {
			plugins: ['typescript'],
			config: {
				enumsAsConst: true,
				avoidOptionals: true,
				defaultScalarType: 'unknown',
				scalars: {
					ID: 'string | number',
					Date: 'string',
					DateTime: 'string',
					RelativeDateTime: 'string',
					URL: 'string',
				},
			},
		},
		'src/__generated__/prefetch.ts': {
			plugins: ['graphql-codegen/dist/graphql-plugin-prefetch.js'],
		},
		'src/__generated__/loaders.ts': {
			plugins: ['graphql-codegen/dist/graphql-plugin-loaders.js'],
		},
		'src/__generated__/mock-data.ts': {
			plugins: [
				{
					'typescript-mock-data': {
						prefix: 'make',
						terminateCircularRelationships: true,
						typesFile: './graphql.ts',
					},
				},
			],
		},
		'src/': {
			preset: 'near-operation-file',
			presetConfig: {
				baseTypesPath: '__generated__/graphql.ts',
				extension: '.ts',
				folder: '__generated__',
			},
			plugins: [
				'typescript-operations',
				'typescript-react-query',
				'graphql-codegen/dist/graphql-plugin-getters.js',
			],
			config: {
				fetcher: '~lib/api/graphqlFetcher#graphqlFetcher',
				addInfiniteQuery: true,
				reactQueryVersion: 5,
				legacyMode: false,
				dedupeFragments: true,
				avoidOptionals: true,
				defaultScalarType: 'unknown',
				scalars: {
					ID: 'string | number',
					Date: 'string',
					DateTime: 'string',
					RelativeDateTime: 'string',
					URL: 'string',
				},
			},
		},
	},
};

export default config;
