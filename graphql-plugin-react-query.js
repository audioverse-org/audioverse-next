const {
	ReactQueryVisitor,
} = require('@graphql-codegen/typescript-react-query');
const { concatAST, Kind, print, stripIgnoredCharacters } = require('graphql');
const { oldVisit } = require('@graphql-codegen/plugin-helpers');

class AVReactQueryVisitor extends ReactQueryVisitor {
	constructor(schema, fragments, rawConfig, documents) {
		super(schema, fragments, rawConfig, documents);
	}

	_gql(node) {
		const fragments = this._transformFragments(node);

		const doc = this._prepareDocument(`
${
	stripIgnoredCharacters(print(node))
		.split('\\')
		.join('\\\\') /* Re-escape escaped values in GraphQL syntax */
}
${this._includeFragments(fragments, node.kind)}`);

		return '`' + doc + '`';
	}

	_transformFragments(document) {
		return this._extractFragments(document, true).map((document) =>
			this.getFragmentVariableName(document)
		);
	}

	_includeFragments(fragments, nodeKind) {
		if (fragments && fragments.length > 0) {
			if (nodeKind !== 'OperationDefinition') {
				return '';
			}
			return `${fragments.map((name) => '${' + name + '}').join('\n')}`;
		}
		return '';
	}
}

module.exports = {
	plugin: (schema, documents, config) => {
		const allAst = concatAST(
			documents.map((v) => v.document).filter((d) => !!d)
		);
		const allFragments = [
			...allAst.definitions
				.filter((d) => d.kind === Kind.FRAGMENT_DEFINITION)
				.map((fragmentDef) => ({
					node: fragmentDef,
					name: fragmentDef.name.value,
					onType: fragmentDef.typeCondition.name.value,
					isExternal: false,
				})),
		];

		const visitor = new AVReactQueryVisitor(
			schema,
			allFragments,
			config,
			documents
		);
		const visitorResult = oldVisit(allAst, { leave: visitor });

		return {
			prepend: [...visitor.getImports(), visitor.getFetcherImplementation()],
			content: [
				visitor.fragments,
				...visitorResult.definitions.filter((t) => typeof t === 'string'),
			].join('\n'),
		};
	},
};
