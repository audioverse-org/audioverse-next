import * as Types from '../../../../../__generated__/graphql';

import { CardSequenceFragmentDoc } from '../../../../molecules/card/__generated__/sequence';
import { PersonLockupFragmentDoc } from '../../../../molecules/__generated__/personLockup';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetSectionScriptureSongsQueryVariables = Types.Exact<{
  language: Types.Language;
  first?: Types.Scalars['Int']['input'];
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetSectionScriptureSongsQuery = { __typename?: 'Query', musicAlbums: { __typename?: 'SequenceConnection', nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };


export const GetSectionScriptureSongsDocument = `
    query getSectionScriptureSongs($language: Language!, $first: Int! = 3, $after: String = null) {
  musicAlbums(
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
export const useGetSectionScriptureSongsQuery = <
      TData = GetSectionScriptureSongsQuery,
      TError = unknown
    >(
      variables: GetSectionScriptureSongsQueryVariables,
      options?: UseQueryOptions<GetSectionScriptureSongsQuery, TError, TData>
    ) =>
    useQuery<GetSectionScriptureSongsQuery, TError, TData>(
      ['getSectionScriptureSongs', variables],
      graphqlFetcher<GetSectionScriptureSongsQuery, GetSectionScriptureSongsQueryVariables>(GetSectionScriptureSongsDocument, variables),
      options
    );
export const useInfiniteGetSectionScriptureSongsQuery = <
      TData = GetSectionScriptureSongsQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetSectionScriptureSongsQueryVariables,
      variables: GetSectionScriptureSongsQueryVariables,
      options?: UseInfiniteQueryOptions<GetSectionScriptureSongsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetSectionScriptureSongsQuery, TError, TData>(
      ['getSectionScriptureSongs.infinite', variables],
      (metaData) => graphqlFetcher<GetSectionScriptureSongsQuery, GetSectionScriptureSongsQueryVariables>(GetSectionScriptureSongsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getSectionScriptureSongs<T>(
	variables: ExactAlt<T, GetSectionScriptureSongsQueryVariables>
): Promise<GetSectionScriptureSongsQuery> {
	return fetchApi(GetSectionScriptureSongsDocument, { variables });
}