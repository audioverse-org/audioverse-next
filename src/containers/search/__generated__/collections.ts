import * as Types from '../../../__generated__/graphql';

import { CardCollectionFragmentDoc } from '../../../components/molecules/card/__generated__/collection';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetSearchResultsCollectionsQueryVariables = Types.Exact<{
  language: Types.Language;
  term: Types.Scalars['String']['input'];
  first: Types.Scalars['Int']['input'];
  offset: Types.Scalars['Int']['input'];
}>;


export type GetSearchResultsCollectionsQuery = { __typename?: 'Query', collections: { __typename?: 'CollectionConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename: 'Collection', id: string | number, canonicalPath: string, title: string, startDate: string | null, endDate: string | null, duration: number, collectionContentType: Types.CollectionContentType, image: { __typename?: 'Image', id: string | number, url: string } | null, allSequences: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, allRecordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } }> | null } };


export const GetSearchResultsCollectionsDocument = `
    query getSearchResultsCollections($language: Language!, $term: String!, $first: Int!, $offset: Int!) {
  collections(language: $language, search: $term, first: $first, offset: $offset) {
    aggregate {
      count
    }
    nodes {
      ...cardCollection
    }
  }
}
    ${CardCollectionFragmentDoc}`;
export const useGetSearchResultsCollectionsQuery = <
      TData = GetSearchResultsCollectionsQuery,
      TError = unknown
    >(
      variables: GetSearchResultsCollectionsQueryVariables,
      options?: UseQueryOptions<GetSearchResultsCollectionsQuery, TError, TData>
    ) =>
    useQuery<GetSearchResultsCollectionsQuery, TError, TData>(
      ['getSearchResultsCollections', variables],
      graphqlFetcher<GetSearchResultsCollectionsQuery, GetSearchResultsCollectionsQueryVariables>(GetSearchResultsCollectionsDocument, variables),
      options
    );
export const useInfiniteGetSearchResultsCollectionsQuery = <
      TData = GetSearchResultsCollectionsQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetSearchResultsCollectionsQueryVariables,
      variables: GetSearchResultsCollectionsQueryVariables,
      options?: UseInfiniteQueryOptions<GetSearchResultsCollectionsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetSearchResultsCollectionsQuery, TError, TData>(
      ['getSearchResultsCollections.infinite', variables],
      (metaData) => graphqlFetcher<GetSearchResultsCollectionsQuery, GetSearchResultsCollectionsQueryVariables>(GetSearchResultsCollectionsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getSearchResultsCollections<T>(
	variables: ExactAlt<T, GetSearchResultsCollectionsQueryVariables>
): Promise<GetSearchResultsCollectionsQuery> {
	return fetchApi(GetSearchResultsCollectionsDocument, { variables });
}