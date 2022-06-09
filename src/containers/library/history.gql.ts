// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.gql';
import { CardRecordingSequenceHatFragmentDoc } from '../../components/molecules/card/recordingSequenceHat.gql';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.gql';
import { CardHatSponsorFragmentDoc } from '../../components/molecules/card/hat/sponsor.gql';
import { TeaseRecordingFragmentDoc } from '../../components/molecules/teaseRecording.gql';
import { AndMiniplayerFragmentDoc } from '../../components/templates/andMiniplayer.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetLibraryHistoryPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
	first: Types.Scalars['Int'];
	offset: Types.Scalars['Int'];
}>;

export type GetLibraryHistoryPageDataQuery = {
	__typename?: 'Query';
	me?: {
		__typename?: 'AuthenticatedUser';
		user: {
			__typename?: 'User';
			downloadHistory: {
				__typename?: 'UserDownloadHistoryConnection';
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
				nodes?: Array<{
					__typename?: 'UserDownloadHistory';
					recording: {
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
					};
				}> | null;
				pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean };
			};
		};
	} | null;
};

export const GetLibraryHistoryPageDataDocument = `
    query getLibraryHistoryPageData($language: Language!, $first: Int!, $offset: Int!) {
  me {
    user {
      downloadHistory(
        language: $language
        first: $first
        offset: $offset
        orderBy: [{field: CREATED_AT, direction: DESC}]
      ) {
        aggregate {
          count
        }
        nodes {
          recording {
            ...cardRecording
          }
        }
        pageInfo {
          hasNextPage
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
export const useGetLibraryHistoryPageDataQuery = <
	TData = GetLibraryHistoryPageDataQuery,
	TError = unknown
>(
	variables: GetLibraryHistoryPageDataQueryVariables,
	options?: UseQueryOptions<GetLibraryHistoryPageDataQuery, TError, TData>
) =>
	useQuery<GetLibraryHistoryPageDataQuery, TError, TData>(
		['getLibraryHistoryPageData', variables],
		graphqlFetcher<
			GetLibraryHistoryPageDataQuery,
			GetLibraryHistoryPageDataQueryVariables
		>(GetLibraryHistoryPageDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getLibraryHistoryPageData<T>(
	variables: ExactAlt<T, GetLibraryHistoryPageDataQueryVariables>
): Promise<GetLibraryHistoryPageDataQuery> {
	return fetchApi(GetLibraryHistoryPageDataDocument, { variables });
}
