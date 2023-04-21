import * as Types from '../../../../__generated__/graphql';

export type CardSponsorFragment = { __typename: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null, collections: { __typename?: 'CollectionConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, sequences: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } };

export const CardSponsorFragmentDoc = `
    fragment cardSponsor on Sponsor {
  __typename
  id
  title
  canonicalPath(useFuturePath: true)
  image {
    url(size: 128)
  }
  collections {
    aggregate {
      count
    }
  }
  sequences {
    aggregate {
      count
    }
  }
  recordings {
    aggregate {
      count
    }
  }
}
    `;