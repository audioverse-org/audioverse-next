import * as Types from '../../../__generated__/graphql';

export type SponsorPivotFragment = {
	__typename?: 'Sponsor';
	id: string | number;
	title: string;
	canonicalPath: string;
	image: { __typename?: 'Image'; url: string } | null;
};

export const SponsorPivotFragmentDoc = `
    fragment sponsorPivot on Sponsor {
  id
  title
  canonicalPath(useFuturePath: true)
  image {
    url(size: 128)
  }
}
    `;
