import * as Types from '../../../../__generated__/graphql';

export type CardPersonFragment = { __typename: 'Person', id: string | number, name: string, canonicalPath: string, image: { __typename?: 'Image', id: string | number, url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } };

export const CardPersonFragmentDoc = `
    fragment cardPerson on Person {
  __typename
  id
  name
  canonicalPath(useFuturePath: true)
  image {
    id
    url(size: 128)
  }
  recordings(first: 2, orderBy: [{field: PUBLISHED_AT, direction: DESC}]) {
    aggregate {
      count
    }
  }
}
    `;