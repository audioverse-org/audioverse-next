import * as Types from '../../lib/generated/graphql';

export type SponsorPivotFragment = {
	__typename?: 'Sponsor';
	id: string | number;
	title: string;
	canonicalPath: string;
	imageWithFallback: { __typename?: 'Image'; url: string };
};

export const SponsorPivotFragmentDoc = `
    fragment sponsorPivot on Sponsor {
  id
  title
  canonicalPath(useFuturePath: true)
  imageWithFallback {
    url(size: 128)
  }
}
    `;
