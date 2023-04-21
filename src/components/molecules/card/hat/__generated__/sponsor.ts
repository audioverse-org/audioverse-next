import * as Types from '../../../../../__generated__/graphql';

export type CardHatSponsorFragment = { __typename?: 'Recording', sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null };

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