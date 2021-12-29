import * as Types from '../../../lib/generated/graphql';

import { CardPlaylistFragmentDoc } from '../../../components/molecules/card/playlist.generated';
import { TeaseRecordingFragmentDoc } from '../../../components/molecules/teaseRecording.generated';
import { AndMiniplayerFragmentDoc } from '../../../components/templates/andMiniplayer.generated';
import { PersonLockupFragmentDoc } from '../../../components/molecules/personLockup.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetLibraryPlaylistsDataQueryVariables = Types.Exact<{
	language: Types.Language;
	offset: Types.InputMaybe<Types.Scalars['Int']>;
	first: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetLibraryPlaylistsDataQuery = {
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
									recordings: {
										__typename?: 'RecordingConnection';
										nodes:
											| Array<{
													__typename?: 'Recording';
													canonicalPath: string;
													sequenceIndex: number | null | undefined;
													id: string | number;
													title: string;
													duration: number;
													recordingContentType: Types.RecordingContentType;
													persons: Array<{
														__typename?: 'Person';
														name: string;
														canonicalPath: string;
														imageWithFallback: {
															__typename?: 'Image';
															url: string;
														};
													}>;
													sequence:
														| {
																__typename?: 'Sequence';
																id: string | number;
																title: string;
																contentType: Types.SequenceContentType;
																recordings: {
																	__typename?: 'RecordingConnection';
																	aggregate:
																		| {
																				__typename?: 'Aggregate';
																				count: number;
																		  }
																		| null
																		| undefined;
																};
														  }
														| null
														| undefined;
													audioFiles: Array<{
														__typename?: 'AudioFile';
														url: string;
														filesize: string;
														mimeType: string;
														duration: number;
													}>;
													videoFiles: Array<{
														__typename?: 'VideoFile';
														url: string;
														filesize: string;
														mimeType: string;
														duration: number;
													}>;
													videoStreams: Array<{
														__typename?: 'VideoFile';
														url: string;
														filesize: string;
														mimeType: string;
														duration: number;
													}>;
											  }>
											| null
											| undefined;
										aggregate:
											| { __typename?: 'Aggregate'; count: number }
											| null
											| undefined;
									};
							  }>
							| null
							| undefined;
						aggregate:
							| { __typename?: 'Aggregate'; count: number }
							| null
							| undefined;
					};
				};
		  }
		| null
		| undefined;
};

export const GetLibraryPlaylistsDataDocument = `
    query getLibraryPlaylistsData($language: Language!, $offset: Int, $first: Int) {
  me {
    user {
      playlists(
        language: $language
        offset: $offset
        first: $first
        orderBy: [{field: CREATED_AT, direction: DESC}]
      ) {
        nodes {
          ...cardPlaylist
        }
        aggregate {
          count
        }
      }
    }
  }
}
    ${CardPlaylistFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}
${PersonLockupFragmentDoc}`;
export const useGetLibraryPlaylistsDataQuery = <
	TData = GetLibraryPlaylistsDataQuery,
	TError = unknown
>(
	variables: GetLibraryPlaylistsDataQueryVariables,
	options?: UseQueryOptions<GetLibraryPlaylistsDataQuery, TError, TData>
) =>
	useQuery<GetLibraryPlaylistsDataQuery, TError, TData>(
		['getLibraryPlaylistsData', variables],
		graphqlFetcher<
			GetLibraryPlaylistsDataQuery,
			GetLibraryPlaylistsDataQueryVariables
		>(GetLibraryPlaylistsDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export const GetLibraryPlaylistsDataDocument = `query getLibraryPlaylistsData($language:Language!$offset:Int$first:Int){me{user{playlists(language:$language offset:$offset first:$first orderBy:[{field:CREATED_AT direction:DESC}]){nodes{...cardPlaylist}aggregate{count}}}}}`;
export async function getLibraryPlaylistsData<T>(
	variables: ExactAlt<T, GetLibraryPlaylistsDataQueryVariables>
): Promise<GetLibraryPlaylistsDataQuery> {
	return fetchApi(GetLibraryPlaylistsDataDocument, { variables });
}
