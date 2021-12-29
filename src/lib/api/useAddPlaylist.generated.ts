import * as Types from '../generated/graphql';

import { useMutation, UseMutationOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type AddPlaylistMutationVariables = Types.Exact<{
	language: Types.Language;
	title: Types.Scalars['String'];
	isPublic: Types.Scalars['Boolean'];
	recordingIds: Types.InputMaybe<
		Array<Types.Scalars['ID']> | Types.Scalars['ID']
	>;
}>;

export type AddPlaylistMutation = {
	__typename?: 'Mutation';
	playlistAdd: { __typename?: 'UserPlaylist'; id: string | number };
};

export const AddPlaylistDocument = `
    mutation addPlaylist($language: Language!, $title: String!, $isPublic: Boolean!, $recordingIds: [ID!]) {
  playlistAdd(
    input: {language: $language, title: $title, isPublic: $isPublic, recordingIds: $recordingIds}
  ) {
    id
  }
}
    `;
export const useAddPlaylistMutation = <TError = unknown, TContext = unknown>(
	options?: UseMutationOptions<
		AddPlaylistMutation,
		TError,
		AddPlaylistMutationVariables,
		TContext
	>
) =>
	useMutation<
		AddPlaylistMutation,
		TError,
		AddPlaylistMutationVariables,
		TContext
	>(
		(variables?: AddPlaylistMutationVariables) =>
			graphqlFetcher<AddPlaylistMutation, AddPlaylistMutationVariables>(
				AddPlaylistDocument,
				variables
			)(),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function addPlaylist<T>(
	variables: ExactAlt<T, AddPlaylistMutationVariables>
): Promise<AddPlaylistMutation> {
	return fetchApi(AddPlaylistDocument, { variables });
}
