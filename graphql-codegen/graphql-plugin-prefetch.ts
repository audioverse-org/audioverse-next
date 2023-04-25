import { CodegenPlugin, Types } from '@graphql-codegen/plugin-helpers';
import { Kind, OperationDefinitionNode } from 'graphql';

const template = (queryNames: string[]) => {
	const queryProps = queryNames
		.map((n) => `${n}: ExactAlt<T, ${capitalize(n)}QueryVariables>`)
		.join(',\n\t\t');

	const queryPairs = queryNames
		.map((n) => [
			`['${n}', () => ${n}(vars.${n})],`,
			`['${n}.infinite', () => ${n}(vars.${n})],`,
		])
		.flat()
		.join('\n\t\t');

	return `
export async function prefetchQueries<T>(
	vars: {
		${queryProps}
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		${queryPairs}
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}`;
};

function capitalize(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const processDocument = (doc: Types.DocumentFile) => {
	const operations = doc.document?.definitions.filter(
		(def): def is OperationDefinitionNode =>
			def.kind === Kind.OPERATION_DEFINITION
	);

	if (!operations?.length) return '';

	const queries = operations.filter((op) => op.operation === 'query');

	if (!queries?.length) return '';

	const queryNames = queries
		.map((q) => q.name?.value)
		.filter((n): n is string => n !== undefined)
		.filter((n) => !n.includes('Paths'));

	if (!queryNames?.length) return '';

	return template(queryNames);
};

const plugin: CodegenPlugin = {
	plugin: (schema, documents) => {
		const result = documents.map(processDocument).join('\n');

		if (!result) return '';

		return `import {QueryClient} from 'react-query';\n${result}`;
	},
};

module.exports = plugin;
