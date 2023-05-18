import * as Types from '../../../__generated__/graphql';

import { useMutation, UseMutationOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type CollectionFavoriteMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type CollectionFavoriteMutation = { __typename?: 'Mutation', favorited: { __typename?: 'SuccessPayload', success: boolean } };


export const CollectionFavoriteDocument = `
    mutation collectionFavorite($id: ID!) {
  favorited: collectionFavorite(id: $id) {
    success
  }
}
    `;
export const useCollectionFavoriteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CollectionFavoriteMutation, TError, CollectionFavoriteMutationVariables, TContext>) =>
    useMutation<CollectionFavoriteMutation, TError, CollectionFavoriteMutationVariables, TContext>(
      ['collectionFavorite'],
      (variables?: CollectionFavoriteMutationVariables) => graphqlFetcher<CollectionFavoriteMutation, CollectionFavoriteMutationVariables>(CollectionFavoriteDocument, variables)(),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function collectionFavorite<T>(
	variables: ExactAlt<T, CollectionFavoriteMutationVariables>
): Promise<CollectionFavoriteMutation> {
	return fetchApi(CollectionFavoriteDocument, { variables });
}