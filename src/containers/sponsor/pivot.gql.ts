// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

export type SponsorPivotFragment = {
	__typename?: 'Sponsor';
	id: string;
	title: string;
	canonicalPath: string;
	image?: { __typename?: 'Image'; url: any } | null;
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
