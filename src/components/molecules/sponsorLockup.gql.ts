// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

export type SponsorLockupFragment = {
	__typename?: 'Sponsor';
	id: string;
	title: string;
	canonicalPath: string;
	image?: { __typename?: 'Image'; url: any } | null;
};

export const SponsorLockupFragmentDoc = `
    fragment sponsorLockup on Sponsor {
  id
  title
  canonicalPath(useFuturePath: true)
  image {
    url(size: 128)
  }
}
    `;
