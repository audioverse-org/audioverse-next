import * as Types from '../../../__generated__/graphql';

import { useMutation, UseMutationOptions } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type SequenceFavoriteMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type SequenceFavoriteMutation = { __typename?: 'Mutation', favorited: { __typename?: 'SuccessPayload', success: boolean } };


export const SequenceFavoriteDocument = `
    mutation sequenceFavorite($id: ID!) {
  favorited: sequenceFavorite(id: $id) {
    success
  }
}
    `;
export const useSequenceFavoriteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SequenceFavoriteMutation, TError, SequenceFavoriteMutationVariables, TContext>) =>
    useMutation<SequenceFavoriteMutation, TError, SequenceFavoriteMutationVariables, TContext>(
      ['sequenceFavorite'],
      (variables?: SequenceFavoriteMutationVariables) => graphqlFetcher<SequenceFavoriteMutation, SequenceFavoriteMutationVariables>(SequenceFavoriteDocument, variables)(),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function sequenceFavorite<T>(
	variables: ExactAlt<T, SequenceFavoriteMutationVariables>
): Promise<SequenceFavoriteMutation> {
	return fetchApi(SequenceFavoriteDocument, { variables });
}