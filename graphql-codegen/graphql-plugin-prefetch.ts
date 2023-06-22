import { CodegenPlugin, Types } from '@graphql-codegen/plugin-helpers';
import { Kind, OperationDefinitionNode } from 'graphql';

const template = (queryNames: string[]) => {
	const queryProps = queryNames
		.map((n) => `${n}: ExactAlt<T, ${capitalize(n)}QueryVariables>`)
		.join(',\n\t\t');

	const expressions = queryNames
		.map((n) => [
			`client.prefetchQuery(['${n}', vars.${n}], () => ${n}(vars.${n}), options),`,
			`client.prefetchInfiniteQuery(['${n}.infinite', vars.${n}], () => ${n}(vars.${n}), options),`,
		])
		.flat()
		.join('\n\t\t');

	return `
export async function prefetchQueries<T>(
	vars: {
		${queryProps}
	},
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		${expressions}
	]);
	
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

		return `
import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';

${result}
`;
	},
};

module.exports = plugin;
