// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

export type PresenterPivotFragment = {
	__typename?: 'Person';
	name: string;
	canonicalPath: string;
	imageWithFallback: { __typename?: 'Image'; url: any };
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
