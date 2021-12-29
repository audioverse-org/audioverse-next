const { concatAST, print, stripIgnoredCharacters, Kind } = require('graphql');

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
		console.log(documents);
		const allAst = concatAST(documents.map((v) => v.document));

		const allFragments = allAst.definitions
			.filter((d) => d.kind === Kind.FRAGMENT_DEFINITION)
			.reduce((carry, d) => {
				carry[d.name.value] = d;
				return carry;
			}, {});
		// console.log({ allFragments} );

		const result = generateCodeSnippets(
			documents,
			(def) => def.kind !== 'FragmentDefinition',
			(def) => {
				const fragmentsNeeded = {};
				const findFragments = (s) => {
					if (s.selectionSet) {
						s.selectionSet.selections.map((s) => findFragments(s));
					}
					if (s.kind === 'FragmentSpread') {
						fragmentsNeeded[s.name.value] = true;
						if (allFragments[s.name.value]) {
							findFragments(allFragments[s.name.value]);
						} else {
							console.log('Cannot find', s.name.value);
						}
					}
				};
				findFragments(def);

				const capitalName = capitalize(def.name.value);
				const capitalType = capitalize(def.operation);
				return `
export const ${capitalName}Document = \`${stripIgnoredCharacters(
					print(def) +
						Object.keys(fragmentsNeeded)
							.map((f) => print(allFragments[f]))
							.join('')
				)}\`;
export async function ${def.name.value}<T>(
	variables: ExactAlt<T, ${capitalName}${capitalType}Variables>
): Promise<${capitalName}${capitalType}> {
	return fetchApi(${capitalName}Document, { variables });
}`;
			}
		);

		return result
			? `import { fetchApi } from '@lib/api/fetchApi' \n${result}`
			: '';
	},
};
