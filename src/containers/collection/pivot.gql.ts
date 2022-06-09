// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

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
