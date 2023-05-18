import * as Types from '../../../__generated__/graphql';

import { useMutation, UseMutationOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type SponsorFavoriteMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type SponsorFavoriteMutation = { __typename?: 'Mutation', favorited: { __typename?: 'SuccessPayload', success: boolean } };


export const SponsorFavoriteDocument = `
    mutation sponsorFavorite($id: ID!) {
  favorited: sponsorFavorite(id: $id) {
    success
  }
}
    `;
export const useSponsorFavoriteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SponsorFavoriteMutation, TError, SponsorFavoriteMutationVariables, TContext>) =>
    useMutation<SponsorFavoriteMutation, TError, SponsorFavoriteMutationVariables, TContext>(
      ['sponsorFavorite'],
      (variables?: SponsorFavoriteMutationVariables) => graphqlFetcher<SponsorFavoriteMutation, SponsorFavoriteMutationVariables>(SponsorFavoriteDocument, variables)(),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function sponsorFavorite<T>(
	variables: ExactAlt<T, SponsorFavoriteMutationVariables>
): Promise<SponsorFavoriteMutation> {
	return fetchApi(SponsorFavoriteDocument, { variables });
}