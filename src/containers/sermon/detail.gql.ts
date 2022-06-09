// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { RecordingFragmentDoc } from '../../components/organisms/recording.gql';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.gql';
import { TeaseRecordingFragmentDoc } from '../../components/molecules/teaseRecording.gql';
import { AndMiniplayerFragmentDoc } from '../../components/templates/andMiniplayer.gql';
import { SequenceNavFragmentDoc } from '../../components/molecules/sequenceNav.gql';
import { CopyrightInfoFragmentDoc } from '../../components/molecules/copyrightInfo.gql';
import { PlayerFragmentDoc } from '../../components/molecules/player.gql';
import { ButtonDownloadFragmentDoc } from '../../components/molecules/buttonDownload.gql';
import { ButtonShareRecordingFragmentDoc } from '../../components/molecules/buttonShareRecording.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetSermonDetailDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetSermonDetailDataQuery = {
	__typename?: 'Query';
	sermon?: {
		__typename?: 'Recording';
		language: Types.Language;
		id: string;
		title: string;
		contentType: Types.RecordingContentType;
		description?: string | null;
		recordingDate?: any | null;
		sequenceIndex?: number | null;
		canonicalUrl: any;
		shareUrl: any;
		copyrightYear?: number | null;
		canonicalPath: string;
		duration: number;
		isDownloadAllowed: boolean;
		speakers: Array<{
			__typename?: 'Person';
			name: string;
			canonicalPath: string;
			imageWithFallback: { __typename?: 'Image'; url: any };
		}>;
		writers: Array<{
			__typename?: 'Person';
			name: string;
			canonicalPath: string;
			imageWithFallback: { __typename?: 'Image'; url: any };
		}>;
		attachments: Array<{
			__typename?: 'Attachment';
			filename: string;
			url: any;
		}>;
		imageWithFallback: { __typename?: 'Image'; url: any };
		recordingTags: {
			__typename?: 'RecordingTagConnection';
			nodes?: Array<{
				__typename?: 'RecordingTag';
				tag: { __typename?: 'Tag'; id: string; name: string };
			}> | null;
		};
		sponsor?: {
			__typename?: 'Sponsor';
			title: string;
			canonicalPath: string;
		} | null;
		sequence?: {
			__typename?: 'Sequence';
			id: string;
			title: string;
			contentType: Types.SequenceContentType;
			canonicalPath: string;
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
							aggregate?: { __typename?: 'Aggregate'; count: number } | null;
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
		} | null;
		collection?: {
			__typename?: 'Collection';
			title: string;
			canonicalPath: string;
		} | null;
		transcript?: { __typename?: 'Transcript'; text: string } | null;
		sequencePreviousRecording?: {
			__typename?: 'Recording';
			canonicalPath: string;
		} | null;
		sequenceNextRecording?: {
			__typename?: 'Recording';
			canonicalPath: string;
		} | null;
		distributionAgreement?: {
			__typename?: 'DistributionAgreement';
			sponsor?: { __typename?: 'Sponsor'; title: string } | null;
			license?: {
				__typename?: 'License';
				summary: string;
				image?: { __typename?: 'Image'; url: any } | null;
			} | null;
		} | null;
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
		videoDownloads: Array<{
			__typename?: 'VideoFile';
			url: any;
			filesize: string;
			height: number;
			width: number;
		}>;
		audioDownloads: Array<{
			__typename?: 'AudioFile';
			url: any;
			filesize: string;
			bitrate: number;
		}>;
	} | null;
};

export type GetSermonDetailStaticPathsQueryVariables = Types.Exact<{
	language: Types.Language;
	first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetSermonDetailStaticPathsQuery = {
	__typename?: 'Query';
	sermons: {
		__typename?: 'RecordingConnection';
		nodes?: Array<{
			__typename?: 'Recording';
			id: string;
			canonicalPath: string;
		}> | null;
	};
};

export const GetSermonDetailDataDocument = `
    query getSermonDetailData($id: ID!) {
  sermon(id: $id) {
    ...recording
    language
  }
}
    ${RecordingFragmentDoc}
${PersonLockupFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}
${SequenceNavFragmentDoc}
${CopyrightInfoFragmentDoc}
${PlayerFragmentDoc}
${ButtonDownloadFragmentDoc}
${ButtonShareRecordingFragmentDoc}`;
export const useGetSermonDetailDataQuery = <
	TData = GetSermonDetailDataQuery,
	TError = unknown
>(
	variables: GetSermonDetailDataQueryVariables,
	options?: UseQueryOptions<GetSermonDetailDataQuery, TError, TData>
) =>
	useQuery<GetSermonDetailDataQuery, TError, TData>(
		['getSermonDetailData', variables],
		graphqlFetcher<GetSermonDetailDataQuery, GetSermonDetailDataQueryVariables>(
			GetSermonDetailDataDocument,
			variables
		),
		options
	);
export const GetSermonDetailStaticPathsDocument = `
    query getSermonDetailStaticPaths($language: Language!, $first: Int) {
  sermons(language: $language, first: $first) {
    nodes {
      id
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetSermonDetailStaticPathsQuery = <
	TData = GetSermonDetailStaticPathsQuery,
	TError = unknown
>(
	variables: GetSermonDetailStaticPathsQueryVariables,
	options?: UseQueryOptions<GetSermonDetailStaticPathsQuery, TError, TData>
) =>
	useQuery<GetSermonDetailStaticPathsQuery, TError, TData>(
		['getSermonDetailStaticPaths', variables],
		graphqlFetcher<
			GetSermonDetailStaticPathsQuery,
			GetSermonDetailStaticPathsQueryVariables
		>(GetSermonDetailStaticPathsDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getSermonDetailData<T>(
	variables: ExactAlt<T, GetSermonDetailDataQueryVariables>
): Promise<GetSermonDetailDataQuery> {
	return fetchApi(GetSermonDetailDataDocument, { variables });
}

export async function getSermonDetailStaticPaths<T>(
	variables: ExactAlt<T, GetSermonDetailStaticPathsQueryVariables>
): Promise<GetSermonDetailStaticPathsQuery> {
	return fetchApi(GetSermonDetailStaticPathsDocument, { variables });
}
