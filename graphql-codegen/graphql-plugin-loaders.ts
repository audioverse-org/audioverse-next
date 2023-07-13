import { CodegenPlugin, Types } from '@graphql-codegen/plugin-helpers';
import { DefinitionNode, Kind, OperationDefinitionNode } from 'graphql';
import path from 'path';

function capitalize(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function isOperation(def: DefinitionNode): def is OperationDefinitionNode {
	return def.kind === Kind.OPERATION_DEFINITION;
}

const getQueries = (doc: Types.DocumentFile) => {
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
			functionName: `build${capitalize(n)}Loader`,
			dataType: `${capitalize(n)}Query`,
			variableType: `${capitalize(n)}QueryVariables`,
			documentName: `${capitalize(n)}Document`,
		})),
	};
};

const plugin: CodegenPlugin = {
	plugin: (schema, documents) => {
		const loaders = documents
			.map(getQueries)
			.filter((q) => q.queries.length > 0);
		const imports = loaders.map((q) => {
			const { source, queries } = q;
			const symbols = [
				...queries.map((q) => q.dataType),
				...queries.map((q) => q.documentName),
			];
			return `import { ${symbols.join(', ')} } from '${source}';`;
		});
		const exports = loaders
			.flatMap((q) => q.queries)
			.map(
				(q) =>
					`export const ${q.functionName} = (defaults: PartialData<${q.dataType}> = {}) => buildLoader<${q.dataType}>(${q.documentName}, defaults);`
			);

		return `import { buildLoader } from "~src/lib/test/buildLoader";
import { PartialData } from '~lib/test/buildLoader';

${imports.join('\n')}

${exports.join('\n')}
`;
	},
};

module.exports = plugin;
