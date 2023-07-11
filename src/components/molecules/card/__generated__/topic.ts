import * as Types from '../../../../__generated__/graphql';

export type CardTopicFragment = { __typename?: 'Topic', id: string | number, title: string, summary: string, duration: number, canonicalPath: string, items: { __typename?: 'TopicItemConnection', nodes: Array<{ __typename?: 'TopicItem', entity: { __typename: 'Recording' } | { __typename: 'Sequence' } }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } };

export const CardTopicFragmentDoc = `
    fragment cardTopic on Topic {
  id
  title
  summary
  duration
  items {
    nodes {
      entity {
        __typename
      }
    }
    aggregate {
      count
    }
  }
  canonicalPath: title
}
    `;