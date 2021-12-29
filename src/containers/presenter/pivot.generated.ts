import * as Types from '../../lib/generated/graphql';

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
