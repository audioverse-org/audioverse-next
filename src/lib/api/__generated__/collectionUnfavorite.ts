import * as Types from '../../../__generated__/graphql';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type CollectionUnfavoriteMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type CollectionUnfavoriteMutation = { __typename?: 'Mutation', favorited: { __typename?: 'SuccessPayload', success: boolean } };


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
    >(options?: UseMutationOptions<CollectionUnfavoriteMutation, TError, CollectionUnfavoriteMutationVariables, TContext>) =>
    useMutation<CollectionUnfavoriteMutation, TError, CollectionUnfavoriteMutationVariables, TContext>(
      ['collectionUnfavorite'],
      (variables?: CollectionUnfavoriteMutationVariables) => graphqlFetcher<CollectionUnfavoriteMutation, CollectionUnfavoriteMutationVariables>(CollectionUnfavoriteDocument, variables)(),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function collectionUnfavorite<T>(
	variables: ExactAlt<T, CollectionUnfavoriteMutationVariables>
): Promise<CollectionUnfavoriteMutation> {
	return fetchApi(CollectionUnfavoriteDocument, { variables });
}