import { CodegenPlugin, Types } from '@graphql-codegen/plugin-helpers';
import { DefinitionNode, Kind, OperationDefinitionNode } from 'graphql';
import path from 'path';

type Query = { name: string; type: string };

type FileQueries = {
	source: string;
	queries: Query[];
};

const template = (imports: string[], functions: string[]) => {
	return `
import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';

${imports.join('\n')}

type Fn<T> = (vars: T) => Promise<unknown>;
type Key = keyof typeof fns;
type Vars = {
	[K in Key]?: Parameters<typeof fns[K]>[0];
};

const options = { cacheTime: 24 * 60 * 60 * 1000 };

async function doPrefetch<T extends Key>(k: T, v: Vars[T], client: QueryClient) {
	try {
		const r = await fns[k](v as any);
		await client.prefetchQuery([k, v], () => r, options);
		await client.prefetchInfiniteQuery([\`\${k}.infinite\`, v], () => r, options);
	} catch (e: unknown) {
		console.error('Failed to prefetch', k, v);
		console.dir(e, {depth: null});
	}
}

export async function prefetchQueries(
	vars: Vars,
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const queries = Object.keys(vars) as Key[];

	await Promise.all(
		queries.map(k => doPrefetch(k, vars[k], client))
	);
	
	return client;
}

const fns = {
	${functions.join('\n\t')}
};
`;
};

function capitalize(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function isOperation(def: DefinitionNode): def is OperationDefinitionNode {
	return def.kind === Kind.OPERATION_DEFINITION;
}

const getQueries = (doc: Types.DocumentFile): FileQueries => {
	const root = path.dirname(path.dirname(__dirname));
	const dir = doc.location && path.relative(root, path.dirname(doc.location));
	const filename = doc.location && path.basename(doc.location, '.graphql');
	const operations = doc.document?.definitions.filter(isOperation) ?? [];
	const queries = operations.filter((op) => op.operation === 'query');
	const queryNames = queries
		.map((q) => q.name?.value)
		.filter((n): n is string => n !== undefined && !!n.length)
		.filter((n) => !n.includes('Paths'));

	return {
		source: `~${dir}/__generated__/${filename}`,
		queries: queryNames.map((n) => ({
			name: n,
			type: `${capitalize(n)}QueryVariables`,
		})),
	};
};

const plugin: CodegenPlugin = {
	plugin: (schema, documents) => {
		const queries = documents
			.map(getQueries)
			.filter((q) => q.queries.length > 0);

		const imports = queries.map((q) => {
			const { source, queries } = q;
			const symbols = [
				...queries.map((q) => q.type),
				...queries.map((q) => q.name),
			];
			return `import { ${symbols.join(', ')} } from '${source}';`;
		});

		const functions = queries
			.map((q) => {
				const { queries } = q;
				return queries.map((q) => `${q.name}: ${q.name} as Fn<${q.type}>,`);
			})
			.flat();

		return template(imports, functions);
	},
};

module.exports = plugin;
