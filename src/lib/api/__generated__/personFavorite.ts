import * as Types from '../../../__generated__/graphql';

import { useMutation, UseMutationOptions, QueryFunctionContext } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type PersonFavoriteMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type PersonFavoriteMutation = { __typename?: 'Mutation', favorited: { __typename?: 'SuccessPayload', success: boolean } };


export const PersonFavoriteDocument = `
    mutation personFavorite($id: ID!) {
  favorited: personFavorite(id: $id) {
    success
  }
}
    `;
export const usePersonFavoriteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<PersonFavoriteMutation, TError, PersonFavoriteMutationVariables, TContext>) =>
    useMutation<PersonFavoriteMutation, TError, PersonFavoriteMutationVariables, TContext>(
      ['personFavorite'],
      (variables?: PersonFavoriteMutationVariables) => graphqlFetcher<PersonFavoriteMutation, PersonFavoriteMutationVariables>(PersonFavoriteDocument, variables)(),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function personFavorite<T>(
	variables: ExactAlt<T, PersonFavoriteMutationVariables>
): Promise<PersonFavoriteMutation> {
	return fetchApi(PersonFavoriteDocument, { variables });
}