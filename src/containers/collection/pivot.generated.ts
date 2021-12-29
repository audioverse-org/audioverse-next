import * as Types from '../../lib/generated/graphql';

export type CollectionPivotFragment = {
	__typename?: 'Collection';
	title: string;
	canonicalPath: string;
	contentType: Types.CollectionContentType;
};

export const CollectionPivotFragmentDoc = `
    fragment collectionPivot on Collection {
  title
  canonicalPath(useFuturePath: true)
  contentType
}
    `;
