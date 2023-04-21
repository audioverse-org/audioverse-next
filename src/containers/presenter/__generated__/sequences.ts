import * as Types from '../../../__generated__/graphql';

import { PresenterPivotFragmentDoc } from './pivot';
import { CardSequenceFragmentDoc } from '../../../components/molecules/card/__generated__/sequence';
import { PersonLockupFragmentDoc } from '../../../components/molecules/__generated__/personLockup';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetPresenterSequencesPageDataQueryVariables = Types.Exact<{
  language: Types.Language;
  id: Types.Scalars['ID'];
  offset: Types.InputMaybe<Types.Scalars['Int']>;
  first: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetPresenterSequencesPageDataQuery = { __typename?: 'Query', person: { __typename?: 'Person', id: string | number, name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } } | null, sequences: { __typename?: 'SequenceConnection', nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } };


export const GetPresenterSequencesPageDataDocument = `
    query getPresenterSequencesPageData($language: Language!, $id: ID!, $offset: Int, $first: Int) {
  person(id: $id) {
    id
    ...presenterPivot
  }
  sequences(
    language: $language
    offset: $offset
    first: $first
    persons: [{personId: $id}]
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardSequence
    }
    aggregate {
      count
    }
  }
}
    ${PresenterPivotFragmentDoc}
${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}`;
export const useGetPresenterSequencesPageDataQuery = <
      TData = GetPresenterSequencesPageDataQuery,
      TError = unknown
    >(
      variables: GetPresenterSequencesPageDataQueryVariables,
      options?: UseQueryOptions<GetPresenterSequencesPageDataQuery, TError, TData>
    ) =>
    useQuery<GetPresenterSequencesPageDataQuery, TError, TData>(
      ['getPresenterSequencesPageData', variables],
      graphqlFetcher<GetPresenterSequencesPageDataQuery, GetPresenterSequencesPageDataQueryVariables>(GetPresenterSequencesPageDataDocument, variables),
      options
    );
import { fetchApi } from '@lib/api/fetchApi' 

export async function getPresenterSequencesPageData<T>(
	variables: ExactAlt<T, GetPresenterSequencesPageDataQueryVariables>
): Promise<GetPresenterSequencesPageDataQuery> {
	return fetchApi(GetPresenterSequencesPageDataDocument, { variables });
}