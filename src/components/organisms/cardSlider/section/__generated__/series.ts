import * as Types from '../../../../../__generated__/graphql';

import { CardSequenceFragmentDoc } from '../../../../molecules/card/__generated__/sequence';
import { PersonLockupFragmentDoc } from '../../../../molecules/__generated__/personLockup';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetSectionSeriesQueryVariables = Types.Exact<{
  language: Types.Language;
  first?: Types.Scalars['Int']['input'];
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetSectionSeriesQuery = { __typename?: 'Query', serieses: { __typename?: 'SequenceConnection', nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };


export const GetSectionSeriesDocument = `
    query getSectionSeries($language: Language!, $first: Int! = 3, $after: String = null) {
  serieses(
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
export const useGetSectionSeriesQuery = <
      TData = GetSectionSeriesQuery,
      TError = unknown
    >(
      variables: GetSectionSeriesQueryVariables,
      options?: UseQueryOptions<GetSectionSeriesQuery, TError, TData>
    ) =>
    useQuery<GetSectionSeriesQuery, TError, TData>(
      ['getSectionSeries', variables],
      graphqlFetcher<GetSectionSeriesQuery, GetSectionSeriesQueryVariables>(GetSectionSeriesDocument, variables),
      options
    );
export const useInfiniteGetSectionSeriesQuery = <
      TData = GetSectionSeriesQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetSectionSeriesQueryVariables,
      variables: GetSectionSeriesQueryVariables,
      options?: UseInfiniteQueryOptions<GetSectionSeriesQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetSectionSeriesQuery, TError, TData>(
      ['getSectionSeries.infinite', variables],
      (metaData) => graphqlFetcher<GetSectionSeriesQuery, GetSectionSeriesQueryVariables>(GetSectionSeriesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getSectionSeries<T>(
	variables: ExactAlt<T, GetSectionSeriesQueryVariables>
): Promise<GetSectionSeriesQuery> {
	return fetchApi(GetSectionSeriesDocument, { variables });
}