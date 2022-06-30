import * as Types from '../../../__generated__/graphql';

export type PresenterPivotFragment = {
	__typename?: 'Person';
	name: string;
	canonicalPath: string;
	imageWithFallback: { __typename?: 'Image'; url: string };
};

export const PresenterPivotFragmentDoc = `
    fragment presenterPivot on Person {
  name
  canonicalPath(useFuturePath: true)
  imageWithFallback {
    url(size: 128)
  }
}
    `;
