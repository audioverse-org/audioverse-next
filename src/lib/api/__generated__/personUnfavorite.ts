import * as Types from '../../../__generated__/graphql';

import { useMutation, UseMutationOptions, QueryFunctionContext } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type PersonUnfavoriteMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type PersonUnfavoriteMutation = { __typename?: 'Mutation', favorited: { __typename?: 'SuccessPayload', success: boolean } };


export const PersonUnfavoriteDocument = `
    mutation personUnfavorite($id: ID!) {
  favorited: personUnfavorite(id: $id) {
    success
  }
}
    `;
export const usePersonUnfavoriteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<PersonUnfavoriteMutation, TError, PersonUnfavoriteMutationVariables, TContext>) =>
    useMutation<PersonUnfavoriteMutation, TError, PersonUnfavoriteMutationVariables, TContext>(
      ['personUnfavorite'],
      (variables?: PersonUnfavoriteMutationVariables) => graphqlFetcher<PersonUnfavoriteMutation, PersonUnfavoriteMutationVariables>(PersonUnfavoriteDocument, variables)(),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function personUnfavorite<T>(
	variables: ExactAlt<T, PersonUnfavoriteMutationVariables>
): Promise<PersonUnfavoriteMutation> {
	return fetchApi(PersonUnfavoriteDocument, { variables });
}