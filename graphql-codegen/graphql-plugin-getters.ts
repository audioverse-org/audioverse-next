import { CodegenPlugin, Types } from '@graphql-codegen/plugin-helpers';
import { DefinitionNode, Kind, OperationDefinitionNode } from 'graphql';

function generateCodeSnippets<T extends DefinitionNode>(
	documents: Types.DocumentFile[],
	shouldProcess: (def: DefinitionNode) => boolean,
	makeSnippet: (def: T) => string,
) {
	return documents
		.map((doc) => {
			return doc.document?.definitions
				.filter((def): def is T => shouldProcess(def))
				.map(makeSnippet)
				.join('\n');
		})
		.filter((x) => !!x?.length)
		.join('\n');
}

function capitalize(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const template = (
	fnName: string,
	varType: string,
	returnType: string,
	docName: string,
) => `
export async function ${fnName}<T>(
	variables: ExactAlt<T, ${varType}>
): Promise<${returnType}> {
	return fetchApi(${docName}, { variables });
}`;

const plugin: CodegenPlugin = {
	plugin: (schema, documents) => {
		const result = generateCodeSnippets<OperationDefinitionNode>(
			documents,
			(def): def is OperationDefinitionNode =>
				def.kind === Kind.OPERATION_DEFINITION,
			(def: OperationDefinitionNode) => {
				if (!def.name) {
					throw new Error('Could not find node name');
				}
				const capitalName = capitalize(def.name.value);
				const capitalType = capitalize(def.operation);
				const fnName = def.name?.value;
				const varType = `${capitalName}${capitalType}Variables`;
				const returnType = `${capitalName}${capitalType}`;
				const docName = `${capitalName}Document`;

				return template(fnName, varType, returnType, docName);
			},
		);

		if (!result) return '';

		return `import { fetchApi } from '~lib/api/fetchApi';\nimport { ExactAlt } from '~src/types/types';\n${result}`;
	},
};

module.exports = plugin;
