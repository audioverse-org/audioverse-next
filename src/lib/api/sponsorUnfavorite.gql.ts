// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { useMutation, UseMutationOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type SponsorUnfavoriteMutationVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type SponsorUnfavoriteMutation = {
	__typename?: 'Mutation';
	favorited: { __typename?: 'SuccessPayload'; success: boolean };
};

export const SponsorUnfavoriteDocument = `
    mutation sponsorUnfavorite($id: ID!) {
  favorited: sponsorUnfavorite(id: $id) {
    success
  }
}
    `;
export const useSponsorUnfavoriteMutation = <
	TError = unknown,
	TContext = unknown
>(
	options?: UseMutationOptions<
		SponsorUnfavoriteMutation,
		TError,
		SponsorUnfavoriteMutationVariables,
		TContext
	>
) =>
	useMutation<
		SponsorUnfavoriteMutation,
		TError,
		SponsorUnfavoriteMutationVariables,
		TContext
	>(
		['sponsorUnfavorite'],
		(variables?: SponsorUnfavoriteMutationVariables) =>
			graphqlFetcher<
				SponsorUnfavoriteMutation,
				SponsorUnfavoriteMutationVariables
			>(SponsorUnfavoriteDocument, variables)(),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function sponsorUnfavorite<T>(
	variables: ExactAlt<T, SponsorUnfavoriteMutationVariables>
): Promise<SponsorUnfavoriteMutation> {
	return fetchApi(SponsorUnfavoriteDocument, { variables });
}
