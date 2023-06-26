import * as Types from '../../../__generated__/graphql';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type CollectionIsFavoritedQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type CollectionIsFavoritedQuery = { __typename?: 'Query', collection: { __typename?: 'Collection', viewerHasFavorited: boolean, viewerPlaybackCompletedPercentage: number } | null };


export const CollectionIsFavoritedDocument = `
    query collectionIsFavorited($id: ID!) {
  collection(id: $id) {
    viewerHasFavorited
    viewerPlaybackCompletedPercentage
  }
}
    `;
export const useCollectionIsFavoritedQuery = <
      TData = CollectionIsFavoritedQuery,
      TError = unknown
    >(
      variables: CollectionIsFavoritedQueryVariables,
      options?: UseQueryOptions<CollectionIsFavoritedQuery, TError, TData>
    ) =>
    useQuery<CollectionIsFavoritedQuery, TError, TData>(
      ['collectionIsFavorited', variables],
      graphqlFetcher<CollectionIsFavoritedQuery, CollectionIsFavoritedQueryVariables>(CollectionIsFavoritedDocument, variables),
      options
    );
export const useInfiniteCollectionIsFavoritedQuery = <
      TData = CollectionIsFavoritedQuery,
      TError = unknown
    >(
      pageParamKey: keyof CollectionIsFavoritedQueryVariables,
      variables: CollectionIsFavoritedQueryVariables,
      options?: UseInfiniteQueryOptions<CollectionIsFavoritedQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<CollectionIsFavoritedQuery, TError, TData>(
      ['collectionIsFavorited.infinite', variables],
      (metaData) => graphqlFetcher<CollectionIsFavoritedQuery, CollectionIsFavoritedQueryVariables>(CollectionIsFavoritedDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function collectionIsFavorited<T>(
	variables: ExactAlt<T, CollectionIsFavoritedQueryVariables>
): Promise<CollectionIsFavoritedQuery> {
	return fetchApi(CollectionIsFavoritedDocument, { variables });
}

import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';


export async function prefetchQueries<T>(
	vars: {
		collectionIsFavorited: ExactAlt<T, CollectionIsFavoritedQueryVariables>
	},
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['collectionIsFavorited', vars.collectionIsFavorited], () => collectionIsFavorited(vars.collectionIsFavorited), options),
		client.prefetchInfiniteQuery(['collectionIsFavorited.infinite', vars.collectionIsFavorited], () => collectionIsFavorited(vars.collectionIsFavorited), options),
	]);
	
	return client;
}
