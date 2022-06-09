// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../../../types/generated';

export type CardHatSponsorFragment = {
	__typename?: 'Recording';
	sponsor?: {
		__typename?: 'Sponsor';
		id: string;
		title: string;
		canonicalPath: string;
		image?: { __typename?: 'Image'; url: any } | null;
	} | null;
};

export const CardHatSponsorFragmentDoc = `
    fragment cardHatSponsor on Recording {
  sponsor {
    id
    title
    canonicalPath(useFuturePath: true)
    image {
      url(size: 100)
    }
  }
}
    `;
