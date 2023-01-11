function generateCodeSnippets(documents, shouldProcess, makeSnippet) {
	return documents
		.map((doc) => {
			return doc.document.definitions
				.filter(shouldProcess)
				.map(makeSnippet)
				.join('\n');
		})
		.filter((x) => !!x.length)
		.join('\n');
}

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const template = (fnName, varType, returnType, docName) => `
export async function ${fnName}<T>(
	variables: ExactAlt<T, ${varType}>
): Promise<${returnType}> {
	return fetchApi(${docName}, { variables });
}`;

module.exports = {
	plugin: (schema, documents, config, info) => {
		const result = generateCodeSnippets(
			documents,
			(def) => def.kind !== 'FragmentDefinition',
			(def) => {
				const capitalName = capitalize(def.name.value);
				const capitalType = capitalize(def.operation);
				const fnName = def.name.value;
				const varType = `${capitalName}${capitalType}Variables`;
				const returnType = `${capitalName}${capitalType}`;
				const docName = `${capitalName}Document`;

				return template(fnName, varType, returnType, docName);
			}
		);

		return `import { fetchApi } from '@lib/api/fetchApi' \n${result}`;
	},
};
