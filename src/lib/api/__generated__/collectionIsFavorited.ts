import * as Types from '../../../__generated__/graphql';

import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type CollectionIsFavoritedQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type CollectionIsFavoritedQuery = {
	__typename?: 'Query';
	collection: {
		__typename?: 'Collection';
		viewerHasFavorited: boolean;
		viewerPlaybackCompletedPercentage: number;
	} | null;
};

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
		graphqlFetcher<
			CollectionIsFavoritedQuery,
			CollectionIsFavoritedQueryVariables
		>(CollectionIsFavoritedDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function collectionIsFavorited<T>(
	variables: ExactAlt<T, CollectionIsFavoritedQueryVariables>
): Promise<CollectionIsFavoritedQuery> {
	return fetchApi(CollectionIsFavoritedDocument, { variables });
}
