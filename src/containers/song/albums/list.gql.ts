// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../../types/generated';

import { CardSequenceFragmentDoc } from '../../../components/molecules/card/sequence.gql';
import { PersonLockupFragmentDoc } from '../../../components/molecules/personLockup.gql';
import { CardRecordingFragmentDoc } from '../../../components/molecules/card/recording.gql';
import { CardRecordingSequenceHatFragmentDoc } from '../../../components/molecules/card/recordingSequenceHat.gql';
import { CardHatSponsorFragmentDoc } from '../../../components/molecules/card/hat/sponsor.gql';
import { TeaseRecordingFragmentDoc } from '../../../components/molecules/teaseRecording.gql';
import { AndMiniplayerFragmentDoc } from '../../../components/templates/andMiniplayer.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetSongAlbumsListPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
}>;

export type GetSongAlbumsListPageDataQuery = {
	__typename?: 'Query';
	musicAlbums: {
		__typename?: 'SequenceConnection';
		nodes?: Array<{
			__typename?: 'Sequence';
			id: string;
			title: string;
			canonicalPath: string;
			contentType: Types.SequenceContentType;
			duration: number;
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
			};
			speakers: {
				__typename?: 'PersonConnection';
				nodes?: Array<{
					__typename?: 'Person';
					name: string;
					canonicalPath: string;
					imageWithFallback: { __typename?: 'Image'; url: any };
				}> | null;
			};
			sequenceWriters: {
				__typename?: 'PersonConnection';
				nodes?: Array<{
					__typename?: 'Person';
					name: string;
					canonicalPath: string;
					imageWithFallback: { __typename?: 'Image'; url: any };
				}> | null;
			};
			allRecordings: {
				__typename?: 'RecordingConnection';
				nodes?: Array<{
					__typename?: 'Recording';
					canonicalPath: string;
				}> | null;
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
			collection?: { __typename?: 'Collection'; title: string } | null;
		}> | null;
		aggregate?: { __typename?: 'Aggregate'; count: number } | null;
	};
	musicBookTags: {
		__typename?: 'TagConnection';
		nodes?: Array<{
			__typename?: 'Tag';
			id: string;
			name: string;
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
		}> | null;
	};
};

export const GetSongAlbumsListPageDataDocument = `
    query getSongAlbumsListPageData($language: Language!) {
  musicAlbums(
    language: $language
    first: 1000
    orderBy: [{field: TITLE, direction: ASC}]
  ) {
    nodes {
      ...cardSequence
      recordings(first: 2) {
        nodes {
          ...cardRecording
        }
      }
    }
    aggregate {
      count
    }
  }
  musicBookTags(language: $language, first: 1000) {
    nodes {
      id
      name
      recordings(first: 1, orderBy: [{field: PUBLISHED_AT, direction: DESC}]) {
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
    ${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}
${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetSongAlbumsListPageDataQuery = <
	TData = GetSongAlbumsListPageDataQuery,
	TError = unknown
>(
	variables: GetSongAlbumsListPageDataQueryVariables,
	options?: UseQueryOptions<GetSongAlbumsListPageDataQuery, TError, TData>
) =>
	useQuery<GetSongAlbumsListPageDataQuery, TError, TData>(
		['getSongAlbumsListPageData', variables],
		graphqlFetcher<
			GetSongAlbumsListPageDataQuery,
			GetSongAlbumsListPageDataQueryVariables
		>(GetSongAlbumsListPageDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getSongAlbumsListPageData<T>(
	variables: ExactAlt<T, GetSongAlbumsListPageDataQueryVariables>
): Promise<GetSongAlbumsListPageDataQuery> {
	return fetchApi(GetSongAlbumsListPageDataDocument, { variables });
}
