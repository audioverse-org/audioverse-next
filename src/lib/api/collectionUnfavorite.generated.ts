import * as Types from '../generated/graphql';

import { useMutation, UseMutationOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type CollectionUnfavoriteMutationVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type CollectionUnfavoriteMutation = {
	__typename?: 'Mutation';
	favorited: { __typename?: 'SuccessPayload'; success: boolean };
};

export const CollectionUnfavoriteDocument = `
    mutation collectionUnfavorite($id: ID!) {
  favorited: collectionUnfavorite(id: $id) {
    success
  }
}
    `;
export const useCollectionUnfavoriteMutation = <
	TError = unknown,
	TContext = unknown
>(
	options?: UseMutationOptions<
		CollectionUnfavoriteMutation,
		TError,
		CollectionUnfavoriteMutationVariables,
		TContext
	>
) =>
	useMutation<
		CollectionUnfavoriteMutation,
		TError,
		CollectionUnfavoriteMutationVariables,
		TContext
	>(
		(variables?: CollectionUnfavoriteMutationVariables) =>
			graphqlFetcher<
				CollectionUnfavoriteMutation,
				CollectionUnfavoriteMutationVariables
			>(CollectionUnfavoriteDocument, variables)(),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export const CollectionUnfavoriteDocument = `mutation collectionUnfavorite($id:ID!){favorited:collectionUnfavorite(id:$id){success}}`;
export async function collectionUnfavorite<T>(
	variables: ExactAlt<T, CollectionUnfavoriteMutationVariables>
): Promise<CollectionUnfavoriteMutation> {
	return fetchApi(CollectionUnfavoriteDocument, { variables });
}
