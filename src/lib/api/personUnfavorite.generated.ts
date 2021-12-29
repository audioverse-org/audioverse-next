import * as Types from '../generated/graphql';

import { useMutation, UseMutationOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type PersonUnfavoriteMutationVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type PersonUnfavoriteMutation = {
	__typename?: 'Mutation';
	favorited: { __typename?: 'SuccessPayload'; success: boolean };
};

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
>(
	options?: UseMutationOptions<
		PersonUnfavoriteMutation,
		TError,
		PersonUnfavoriteMutationVariables,
		TContext
	>
) =>
	useMutation<
		PersonUnfavoriteMutation,
		TError,
		PersonUnfavoriteMutationVariables,
		TContext
	>(
		(variables?: PersonUnfavoriteMutationVariables) =>
			graphqlFetcher<
				PersonUnfavoriteMutation,
				PersonUnfavoriteMutationVariables
			>(PersonUnfavoriteDocument, variables)(),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function personUnfavorite<T>(
	variables: ExactAlt<T, PersonUnfavoriteMutationVariables>
): Promise<PersonUnfavoriteMutation> {
	return fetchApi(PersonUnfavoriteDocument, { variables });
}
