function generateCodeSnippets(documents, shouldProcess, makeSnippet) {
	return documents
		.map((doc) => {
			return doc.document.definitions
				.filter(shouldProcess)
				.map(makeSnippet)
				.join('\n');
		})
		.join('\n');
}

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
	plugin: (schema, documents, config, info) => {
		const result = generateCodeSnippets(
			documents,
			(def) => def.kind !== 'FragmentDefinition',
			(def) => {
				const capitalName = capitalize(def.name.value);
				const capitalType = capitalize(def.operation);
				return `
							export async function ${def.name.value}<T>(
								variables: ExactAlt<T, ${capitalName}${capitalType}Variables>
							): Promise<${capitalName}${capitalType}> {
								return fetchApi(${capitalName}Document, { variables });
							}`;
			}
		);

		return `import { fetchApi } from '@/lib/api/fetchApi' \n${result}`;
	},
};
