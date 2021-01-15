module.exports = {
	plugin: (schema, documents, config, info) => {
		const result = documents
			.map((doc) => {
				return doc.document.definitions
					.filter((def) => {
						return (
							def.kind !== 'FragmentDefinition' && def?.operation !== 'mutation'
						);
					})
					.map((def) => {
						const capitalName =
							def.name.value.charAt(0).toUpperCase() + def.name.value.slice(1);
						const variablesType = `${capitalName}QueryVariables`;
						const returnType = `${capitalName}Query`;
						const query = `${capitalName}Document`;

						return `
export async function ${def.name.value}(
  variables: ${variablesType}
): Promise<${returnType}> {
  return fetchApi(${query}, { variables });
}
				`;
					})
					.join('\n\n');
			})
			.join('\n');

		return `import { fetchApi } from '@lib/api/fetchApi' \n` + result;
	},
};
