// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../../types/generated';

import { CardPlaylistFragmentDoc } from '../../../components/molecules/card/playlist.gql';
import { TeaseRecordingFragmentDoc } from '../../../components/molecules/teaseRecording.gql';
import { AndMiniplayerFragmentDoc } from '../../../components/templates/andMiniplayer.gql';
import { PersonLockupFragmentDoc } from '../../../components/molecules/personLockup.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetLibraryPlaylistsDataQueryVariables = Types.Exact<{
	language: Types.Language;
	offset?: Types.InputMaybe<Types.Scalars['Int']>;
	first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetLibraryPlaylistsDataQuery = {
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
					recordings: {
						__typename?: 'RecordingConnection';
						nodes?: Array<{
							__typename?: 'Recording';
							canonicalPath: string;
							sequenceIndex?: number | null;
							id: string;
							title: string;
							duration: number;
							recordingContentType: Types.RecordingContentType;
							persons: Array<{
								__typename?: 'Person';
								name: string;
								canonicalPath: string;
								imageWithFallback: { __typename?: 'Image'; url: any };
							}>;
							sequence?: {
								__typename?: 'Sequence';
								id: string;
								title: string;
								contentType: Types.SequenceContentType;
								recordings: {
									__typename?: 'RecordingConnection';
									aggregate?: {
										__typename?: 'Aggregate';
										count: number;
									} | null;
								};
							} | null;
							collection?: { __typename?: 'Collection'; title: string } | null;
							audioFiles: Array<{
								__typename?: 'AudioFile';
								url: any;
								filesize: string;
								mimeType: string;
								duration: number;
							}>;
							videoFiles: Array<{
								__typename?: 'VideoFile';
								url: any;
								filesize: string;
								mimeType: string;
								duration: number;
							}>;
							videoStreams: Array<{
								__typename?: 'VideoFile';
								url: any;
								logUrl?: any | null;
								filesize: string;
								mimeType: string;
								duration: number;
							}>;
						}> | null;
						aggregate?: { __typename?: 'Aggregate'; count: number } | null;
					};
				}> | null;
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
		};
	} | null;
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

export async function getLibraryPlaylistsData<T>(
	variables: ExactAlt<T, GetLibraryPlaylistsDataQueryVariables>
): Promise<GetLibraryPlaylistsDataQuery> {
	return fetchApi(GetLibraryPlaylistsDataDocument, { variables });
}
