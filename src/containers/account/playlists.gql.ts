// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import {
	useQuery,
	UseQueryOptions,
	useMutation,
	UseMutationOptions,
} from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetAccountPlaylistsPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
}>;

export type GetAccountPlaylistsPageDataQuery = {
	__typename?: 'Query';
	me?: {
		__typename?: 'AuthenticatedUser';
		user: {
			__typename?: 'User';
			playlists: {
				__typename?: 'UserPlaylistConnection';
				nodes?: Array<{
					__typename?: 'UserPlaylist';
					id: string;
					title: string;
					isPublic: boolean;
					summary: string;
					recordings: {
						__typename?: 'RecordingConnection';
						aggregate?: { __typename?: 'Aggregate'; count: number } | null;
					};
				}> | null;
			};
		};
	} | null;
};

export type AddAccountPlaylistMutationVariables = Types.Exact<{
	isPublic: Types.Scalars['Boolean'];
	language: Types.Language;
	recordingIds?: Types.InputMaybe<
		Array<Types.Scalars['ID']> | Types.Scalars['ID']
	>;
	summary?: Types.InputMaybe<Types.Scalars['String']>;
	title: Types.Scalars['String'];
}>;

export type AddAccountPlaylistMutation = {
	__typename?: 'Mutation';
	playlistAdd: { __typename?: 'UserPlaylist'; id: string };
};

export const GetAccountPlaylistsPageDataDocument = `
    query getAccountPlaylistsPageData($language: Language!) {
  me {
    user {
      playlists(language: $language) {
        nodes {
          id
          title
          isPublic
          summary
          recordings {
            aggregate {
              count
            }
          }
        }
      }
    }
  }
}
    `;
export const useGetAccountPlaylistsPageDataQuery = <
	TData = GetAccountPlaylistsPageDataQuery,
	TError = unknown
>(
	variables: GetAccountPlaylistsPageDataQueryVariables,
	options?: UseQueryOptions<GetAccountPlaylistsPageDataQuery, TError, TData>
) =>
	useQuery<GetAccountPlaylistsPageDataQuery, TError, TData>(
		['getAccountPlaylistsPageData', variables],
		graphqlFetcher<
			GetAccountPlaylistsPageDataQuery,
			GetAccountPlaylistsPageDataQueryVariables
		>(GetAccountPlaylistsPageDataDocument, variables),
		options
	);
export const AddAccountPlaylistDocument = `
    mutation addAccountPlaylist($isPublic: Boolean!, $language: Language!, $recordingIds: [ID!], $summary: String, $title: String!) {
  playlistAdd(
    input: {isPublic: $isPublic, language: $language, recordingIds: $recordingIds, summary: $summary, title: $title}
  ) {
    id
  }
}
    `;
export const useAddAccountPlaylistMutation = <
	TError = unknown,
	TContext = unknown
>(
	options?: UseMutationOptions<
		AddAccountPlaylistMutation,
		TError,
		AddAccountPlaylistMutationVariables,
		TContext
	>
) =>
	useMutation<
		AddAccountPlaylistMutation,
		TError,
		AddAccountPlaylistMutationVariables,
		TContext
	>(
		['addAccountPlaylist'],
		(variables?: AddAccountPlaylistMutationVariables) =>
			graphqlFetcher<
				AddAccountPlaylistMutation,
				AddAccountPlaylistMutationVariables
			>(AddAccountPlaylistDocument, variables)(),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getAccountPlaylistsPageData<T>(
	variables: ExactAlt<T, GetAccountPlaylistsPageDataQueryVariables>
): Promise<GetAccountPlaylistsPageDataQuery> {
	return fetchApi(GetAccountPlaylistsPageDataDocument, { variables });
}

export async function addAccountPlaylist<T>(
	variables: ExactAlt<T, AddAccountPlaylistMutationVariables>
): Promise<AddAccountPlaylistMutation> {
	return fetchApi(AddAccountPlaylistDocument, { variables });
}
