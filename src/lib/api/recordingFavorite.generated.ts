import * as Types from '../generated/graphql';

import { useMutation, UseMutationOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type RecordingFavoriteMutationVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type RecordingFavoriteMutation = {
	__typename?: 'Mutation';
	favorited: { __typename?: 'SuccessPayload'; success: boolean };
};

export const RecordingFavoriteDocument = `
    mutation recordingFavorite($id: ID!) {
  favorited: recordingFavorite(id: $id) {
    success
  }
}
    `;
export const useRecordingFavoriteMutation = <
	TError = unknown,
	TContext = unknown
>(
	options?: UseMutationOptions<
		RecordingFavoriteMutation,
		TError,
		RecordingFavoriteMutationVariables,
		TContext
	>
) =>
	useMutation<
		RecordingFavoriteMutation,
		TError,
		RecordingFavoriteMutationVariables,
		TContext
	>(
		(variables?: RecordingFavoriteMutationVariables) =>
			graphqlFetcher<
				RecordingFavoriteMutation,
				RecordingFavoriteMutationVariables
			>(RecordingFavoriteDocument, variables)(),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function recordingFavorite<T>(
	variables: ExactAlt<T, RecordingFavoriteMutationVariables>
): Promise<RecordingFavoriteMutation> {
	return fetchApi(RecordingFavoriteDocument, { variables });
}
