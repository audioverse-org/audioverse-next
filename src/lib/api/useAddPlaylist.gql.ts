// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { useMutation, UseMutationOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type AddPlaylistMutationVariables = Types.Exact<{
	language: Types.Language;
	title: Types.Scalars['String'];
	isPublic: Types.Scalars['Boolean'];
	recordingIds?: Types.InputMaybe<
		Array<Types.Scalars['ID']> | Types.Scalars['ID']
	>;
}>;

export type AddPlaylistMutation = {
	__typename?: 'Mutation';
	playlistAdd: { __typename?: 'UserPlaylist'; id: string };
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
		['addPlaylist'],
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
