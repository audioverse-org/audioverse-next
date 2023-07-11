import * as Types from '../../../__generated__/graphql';

import { CardSequenceFragmentDoc } from '../../../components/molecules/card/__generated__/sequence';
import { PersonLockupFragmentDoc } from '../../../components/molecules/__generated__/personLockup';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetAudiobookListPageDataQueryVariables = Types.Exact<{
  language: Types.Language;
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetAudiobookListPageDataQuery = { __typename?: 'Query', audiobooks: { __typename?: 'SequenceConnection', nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } };

export type GetAudiobookListPathsDataQueryVariables = Types.Exact<{
  language: Types.Language;
}>;


export type GetAudiobookListPathsDataQuery = { __typename?: 'Query', audiobooks: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } };


export const GetAudiobookListPageDataDocument = `
    query getAudiobookListPageData($language: Language!, $first: Int = 12, $offset: Int = 0) {
  audiobooks(
    language: $language
    first: $first
    offset: $offset
    orderBy: [{field: TITLE, direction: ASC}]
  ) {
    nodes {
      ...cardSequence
    }
    aggregate {
      count
    }
  }
}
    ${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}`;
export const useGetAudiobookListPageDataQuery = <
      TData = GetAudiobookListPageDataQuery,
      TError = unknown
    >(
      variables: GetAudiobookListPageDataQueryVariables,
      options?: UseQueryOptions<GetAudiobookListPageDataQuery, TError, TData>
    ) =>
    useQuery<GetAudiobookListPageDataQuery, TError, TData>(
      ['getAudiobookListPageData', variables],
      graphqlFetcher<GetAudiobookListPageDataQuery, GetAudiobookListPageDataQueryVariables>(GetAudiobookListPageDataDocument, variables),
      options
    );
export const useInfiniteGetAudiobookListPageDataQuery = <
      TData = GetAudiobookListPageDataQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetAudiobookListPageDataQueryVariables,
      variables: GetAudiobookListPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetAudiobookListPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetAudiobookListPageDataQuery, TError, TData>(
      ['getAudiobookListPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetAudiobookListPageDataQuery, GetAudiobookListPageDataQueryVariables>(GetAudiobookListPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetAudiobookListPathsDataDocument = `
    query getAudiobookListPathsData($language: Language!) {
  audiobooks(language: $language) {
    aggregate {
      count
    }
  }
}
    `;
export const useGetAudiobookListPathsDataQuery = <
      TData = GetAudiobookListPathsDataQuery,
      TError = unknown
    >(
      variables: GetAudiobookListPathsDataQueryVariables,
      options?: UseQueryOptions<GetAudiobookListPathsDataQuery, TError, TData>
    ) =>
    useQuery<GetAudiobookListPathsDataQuery, TError, TData>(
      ['getAudiobookListPathsData', variables],
      graphqlFetcher<GetAudiobookListPathsDataQuery, GetAudiobookListPathsDataQueryVariables>(GetAudiobookListPathsDataDocument, variables),
      options
    );
export const useInfiniteGetAudiobookListPathsDataQuery = <
      TData = GetAudiobookListPathsDataQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetAudiobookListPathsDataQueryVariables,
      variables: GetAudiobookListPathsDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetAudiobookListPathsDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetAudiobookListPathsDataQuery, TError, TData>(
      ['getAudiobookListPathsData.infinite', variables],
      (metaData) => graphqlFetcher<GetAudiobookListPathsDataQuery, GetAudiobookListPathsDataQueryVariables>(GetAudiobookListPathsDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getAudiobookListPageData<T>(
	variables: ExactAlt<T, GetAudiobookListPageDataQueryVariables>
): Promise<GetAudiobookListPageDataQuery> {
	return fetchApi(GetAudiobookListPageDataDocument, { variables });
}

export async function getAudiobookListPathsData<T>(
	variables: ExactAlt<T, GetAudiobookListPathsDataQueryVariables>
): Promise<GetAudiobookListPathsDataQuery> {
	return fetchApi(GetAudiobookListPathsDataDocument, { variables });
}