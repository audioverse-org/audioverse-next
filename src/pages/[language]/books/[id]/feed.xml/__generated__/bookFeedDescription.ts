import * as Types from '../../../../../../__generated__/graphql';

export type BookFeedDescriptionFragment = { __typename?: 'Sequence', title: string, recordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', authors: Array<{ __typename?: 'Person', name: string }>, narrators: Array<{ __typename?: 'Person', name: string }> }> | null } };

export const BookFeedDescriptionFragmentDoc = `
    fragment bookFeedDescription on Sequence {
  title
  recordings(first: 25) {
    nodes {
      authors: persons(role: WRITER) {
        name
      }
      narrators: persons(role: SPEAKER) {
        name
      }
    }
  }
}
    `;