import * as Types from '../../lib/generated/graphql';

export type SponsorLockupFragment = {
	__typename?: 'Sponsor';
	id: string | number;
	title: string;
	canonicalPath: string;
	imageWithFallback: { __typename?: 'Image'; url: string };
};

export const SponsorLockupFragmentDoc = `
    fragment sponsorLockup on Sponsor {
  id
  title
  canonicalPath(useFuturePath: true)
  imageWithFallback {
    url(size: 128)
  }
}
    `;
