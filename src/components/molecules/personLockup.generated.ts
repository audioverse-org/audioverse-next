import * as Types from '../../lib/generated/graphql';

export type PersonLockupFragment = {
	__typename?: 'Person';
	name: string;
	canonicalPath: string;
	imageWithFallback: { __typename?: 'Image'; url: string };
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
