import * as Types from '../../../../../__generated__/graphql';

import { CardSequenceFragmentDoc } from '../../../../molecules/card/__generated__/sequence';
import { PersonLockupFragmentDoc } from '../../../../molecules/__generated__/personLockup';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetSectionAudiobooksQueryVariables = Types.Exact<{
  language: Types.Language;
  first?: Types.Scalars['Int']['input'];
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetSectionAudiobooksQuery = { __typename?: 'Query', audiobooks: { __typename?: 'SequenceConnection', nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };


export const GetSectionAudiobooksDocument = `
    query getSectionAudiobooks($language: Language!, $first: Int! = 3, $after: String = null) {
  audiobooks(
    language: $language
    first: $first
    after: $after
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardSequence
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}`;
export const useGetSectionAudiobooksQuery = <
      TData = GetSectionAudiobooksQuery,
      TError = unknown
    >(
      variables: GetSectionAudiobooksQueryVariables,
      options?: UseQueryOptions<GetSectionAudiobooksQuery, TError, TData>
    ) =>
    useQuery<GetSectionAudiobooksQuery, TError, TData>(
      ['getSectionAudiobooks', variables],
      graphqlFetcher<GetSectionAudiobooksQuery, GetSectionAudiobooksQueryVariables>(GetSectionAudiobooksDocument, variables),
      options
    );
export const useInfiniteGetSectionAudiobooksQuery = <
      TData = GetSectionAudiobooksQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetSectionAudiobooksQueryVariables,
      variables: GetSectionAudiobooksQueryVariables,
      options?: UseInfiniteQueryOptions<GetSectionAudiobooksQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetSectionAudiobooksQuery, TError, TData>(
      ['getSectionAudiobooks.infinite', variables],
      (metaData) => graphqlFetcher<GetSectionAudiobooksQuery, GetSectionAudiobooksQueryVariables>(GetSectionAudiobooksDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getSectionAudiobooks<T>(
	variables: ExactAlt<T, GetSectionAudiobooksQueryVariables>
): Promise<GetSectionAudiobooksQuery> {
	return fetchApi(GetSectionAudiobooksDocument, { variables });
}