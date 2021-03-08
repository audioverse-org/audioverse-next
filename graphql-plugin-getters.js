module.exports = {
	plugin: (schema, documents, config, info) => {
		const result = documents
			.map((doc) => {
				return doc.document.definitions
					.filter((def) => {
						return (
							def.kind !== 'FragmentDefinition' && def.operation !== 'mutation'
						);
					})
					.map((def) => {
						const capitalName =
							def.name.value.charAt(0).toUpperCase() + def.name.value.slice(1);
						return `
							export async function ${def.name.value}<T>(
								variables: ExactAlt<T, ${capitalName}QueryVariables>
							): Promise<${capitalName}Query> {
								return fetchApi(${capitalName}Document, { variables });
							}`;
					})
					.join('\n');
			})
			.join('\n');

		return `import { fetchApi } from '@lib/api/fetchApi' \n` + result;
	},
};
