import * as Types from '../generated/graphql';

import { useMutation, UseMutationOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type RecordingUnfavoriteMutationVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type RecordingUnfavoriteMutation = {
	__typename?: 'Mutation';
	favorited: { __typename?: 'SuccessPayload'; success: boolean };
};

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
>(
	options?: UseMutationOptions<
		RecordingUnfavoriteMutation,
		TError,
		RecordingUnfavoriteMutationVariables,
		TContext
	>
) =>
	useMutation<
		RecordingUnfavoriteMutation,
		TError,
		RecordingUnfavoriteMutationVariables,
		TContext
	>(
		(variables?: RecordingUnfavoriteMutationVariables) =>
			graphqlFetcher<
				RecordingUnfavoriteMutation,
				RecordingUnfavoriteMutationVariables
			>(RecordingUnfavoriteDocument, variables)(),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function recordingUnfavorite<T>(
	variables: ExactAlt<T, RecordingUnfavoriteMutationVariables>
): Promise<RecordingUnfavoriteMutation> {
	return fetchApi(RecordingUnfavoriteDocument, { variables });
}
