import * as Types from '../../lib/generated/graphql';

import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetPlaylistButtonDataQueryVariables = Types.Exact<{
	language: Types.Language;
	recordingId: Types.Scalars['ID'];
}>;

export type GetPlaylistButtonDataQuery = {
	__typename?: 'Query';
	me:
		| {
				__typename?: 'AuthenticatedUser';
				user: {
					__typename?: 'User';
					playlists: {
						__typename?: 'UserPlaylistConnection';
						nodes:
							| Array<{
									__typename?: 'UserPlaylist';
									id: string | number;
									title: string;
									hasRecording: boolean;
							  }>
							| null
							| undefined;
					};
				};
		  }
		| null
		| undefined;
};

export const GetPlaylistButtonDataDocument = `
    query getPlaylistButtonData($language: Language!, $recordingId: ID!) {
  me {
    user {
      playlists(language: $language) {
        nodes {
          id
          title
          hasRecording(id: $recordingId)
        }
      }
    }
  }
}
    `;
export const useGetPlaylistButtonDataQuery = <
	TData = GetPlaylistButtonDataQuery,
	TError = unknown
>(
	variables: GetPlaylistButtonDataQueryVariables,
	options?: UseQueryOptions<GetPlaylistButtonDataQuery, TError, TData>
) =>
	useQuery<GetPlaylistButtonDataQuery, TError, TData>(
		['getPlaylistButtonData', variables],
		graphqlFetcher<
			GetPlaylistButtonDataQuery,
			GetPlaylistButtonDataQueryVariables
		>(GetPlaylistButtonDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export const GetPlaylistButtonDataDocument = `query getPlaylistButtonData($language:Language!$recordingId:ID!){me{user{playlists(language:$language){nodes{id title hasRecording(id:$recordingId)}}}}}`;
export async function getPlaylistButtonData<T>(
	variables: ExactAlt<T, GetPlaylistButtonDataQueryVariables>
): Promise<GetPlaylistButtonDataQuery> {
	return fetchApi(GetPlaylistButtonDataDocument, { variables });
}
