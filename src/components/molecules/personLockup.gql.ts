// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

export type PersonLockupFragment = {
	__typename?: 'Person';
	name: string;
	canonicalPath: string;
	imageWithFallback: { __typename?: 'Image'; url: any };
};

export const PersonLockupFragmentDoc = `
    fragment personLockup on Person {
  name
  canonicalPath(useFuturePath: true)
  imageWithFallback {
    url(size: 128)
  }
}
    `;
