import * as Types from '../../../__generated__/graphql';

import { useMutation, UseMutationOptions } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type SequenceUnfavoriteMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type SequenceUnfavoriteMutation = { __typename?: 'Mutation', favorited: { __typename?: 'SuccessPayload', success: boolean } };


export const SequenceUnfavoriteDocument = `
    mutation sequenceUnfavorite($id: ID!) {
  favorited: sequenceUnfavorite(id: $id) {
    success
  }
}
    `;
export const useSequenceUnfavoriteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SequenceUnfavoriteMutation, TError, SequenceUnfavoriteMutationVariables, TContext>) =>
    useMutation<SequenceUnfavoriteMutation, TError, SequenceUnfavoriteMutationVariables, TContext>(
      ['sequenceUnfavorite'],
      (variables?: SequenceUnfavoriteMutationVariables) => graphqlFetcher<SequenceUnfavoriteMutation, SequenceUnfavoriteMutationVariables>(SequenceUnfavoriteDocument, variables)(),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function sequenceUnfavorite<T>(
	variables: ExactAlt<T, SequenceUnfavoriteMutationVariables>
): Promise<SequenceUnfavoriteMutation> {
	return fetchApi(SequenceUnfavoriteDocument, { variables });
}