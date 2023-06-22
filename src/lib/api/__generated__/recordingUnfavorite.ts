import * as Types from '../../../__generated__/graphql';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type RecordingUnfavoriteMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type RecordingUnfavoriteMutation = { __typename?: 'Mutation', favorited: { __typename?: 'SuccessPayload', success: boolean } };


export const RecordingUnfavoriteDocument = `
    mutation recordingUnfavorite($id: ID!) {
  favorited: recordingUnfavorite(id: $id) {
    success
  }
}
    `;
export const useRecordingUnfavoriteMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RecordingUnfavoriteMutation, TError, RecordingUnfavoriteMutationVariables, TContext>) =>
    useMutation<RecordingUnfavoriteMutation, TError, RecordingUnfavoriteMutationVariables, TContext>(
      ['recordingUnfavorite'],
      (variables?: RecordingUnfavoriteMutationVariables) => graphqlFetcher<RecordingUnfavoriteMutation, RecordingUnfavoriteMutationVariables>(RecordingUnfavoriteDocument, variables)(),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function recordingUnfavorite<T>(
	variables: ExactAlt<T, RecordingUnfavoriteMutationVariables>
): Promise<RecordingUnfavoriteMutation> {
	return fetchApi(RecordingUnfavoriteDocument, { variables });
}