// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../../types/generated';

import { CardRecordingFragmentDoc } from '../../../components/molecules/card/recording.gql';
import { CardRecordingSequenceHatFragmentDoc } from '../../../components/molecules/card/recordingSequenceHat.gql';
import { PersonLockupFragmentDoc } from '../../../components/molecules/personLockup.gql';
import { CardHatSponsorFragmentDoc } from '../../../components/molecules/card/hat/sponsor.gql';
import { TeaseRecordingFragmentDoc } from '../../../components/molecules/teaseRecording.gql';
import { AndMiniplayerFragmentDoc } from '../../../components/templates/andMiniplayer.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetLibraryPlaylistPageDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetLibraryPlaylistPageDataQuery = {
	__typename?: 'Query';
	me?: {
		__typename?: 'AuthenticatedUser';
		user: {
			__typename?: 'User';
			playlist?: {
				__typename?: 'UserPlaylist';
				title: string;
				createdAt: any;
				summary: string;
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
						sequence?: {
							__typename?: 'Sequence';
							id: string;
							canonicalPath: string;
							contentType: Types.SequenceContentType;
							title: string;
							image?: { __typename?: 'Image'; url: any } | null;
							recordings: {
								__typename?: 'RecordingConnection';
								aggregate?: { __typename?: 'Aggregate'; count: number } | null;
							};
							collection?: { __typename?: 'Collection'; title: string } | null;
						} | null;
						writers: Array<{
							__typename?: 'Person';
							name: string;
							canonicalPath: string;
							imageWithFallback: { __typename?: 'Image'; url: any };
						}>;
						sponsor?: {
							__typename?: 'Sponsor';
							id: string;
							title: string;
							canonicalPath: string;
							image?: { __typename?: 'Image'; url: any } | null;
						} | null;
						persons: Array<{
							__typename?: 'Person';
							name: string;
							canonicalPath: string;
							imageWithFallback: { __typename?: 'Image'; url: any };
						}>;
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
			} | null;
		};
	} | null;
};

export const GetLibraryPlaylistPageDataDocument = `
    query getLibraryPlaylistPageData($id: ID!) {
  me {
    user {
      playlist(id: $id) {
        title
        createdAt
        summary
        recordings(offset: 0, first: 1500) {
          nodes {
            ...cardRecording
          }
          aggregate {
            count
          }
        }
      }
    }
  }
}
    ${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetLibraryPlaylistPageDataQuery = <
	TData = GetLibraryPlaylistPageDataQuery,
	TError = unknown
>(
	variables: GetLibraryPlaylistPageDataQueryVariables,
	options?: UseQueryOptions<GetLibraryPlaylistPageDataQuery, TError, TData>
) =>
	useQuery<GetLibraryPlaylistPageDataQuery, TError, TData>(
		['getLibraryPlaylistPageData', variables],
		graphqlFetcher<
			GetLibraryPlaylistPageDataQuery,
			GetLibraryPlaylistPageDataQueryVariables
		>(GetLibraryPlaylistPageDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getLibraryPlaylistPageData<T>(
	variables: ExactAlt<T, GetLibraryPlaylistPageDataQueryVariables>
): Promise<GetLibraryPlaylistPageDataQuery> {
	return fetchApi(GetLibraryPlaylistPageDataDocument, { variables });
}
