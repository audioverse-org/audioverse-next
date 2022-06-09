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
export type GetStoryDetailDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetStoryDetailDataQuery = {
	__typename?: 'Query';
	story?: {
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

export type GetStoryDetailStaticPathsQueryVariables = Types.Exact<{
	language: Types.Language;
	first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetStoryDetailStaticPathsQuery = {
	__typename?: 'Query';
	stories: {
		__typename?: 'RecordingConnection';
		nodes?: Array<{ __typename?: 'Recording'; canonicalPath: string }> | null;
	};
};

export const GetStoryDetailDataDocument = `
    query getStoryDetailData($id: ID!) {
  story(id: $id) {
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
export const useGetStoryDetailDataQuery = <
	TData = GetStoryDetailDataQuery,
	TError = unknown
>(
	variables: GetStoryDetailDataQueryVariables,
	options?: UseQueryOptions<GetStoryDetailDataQuery, TError, TData>
) =>
	useQuery<GetStoryDetailDataQuery, TError, TData>(
		['getStoryDetailData', variables],
		graphqlFetcher<GetStoryDetailDataQuery, GetStoryDetailDataQueryVariables>(
			GetStoryDetailDataDocument,
			variables
		),
		options
	);
export const GetStoryDetailStaticPathsDocument = `
    query getStoryDetailStaticPaths($language: Language!, $first: Int) {
  stories(language: $language, first: $first) {
    nodes {
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetStoryDetailStaticPathsQuery = <
	TData = GetStoryDetailStaticPathsQuery,
	TError = unknown
>(
	variables: GetStoryDetailStaticPathsQueryVariables,
	options?: UseQueryOptions<GetStoryDetailStaticPathsQuery, TError, TData>
) =>
	useQuery<GetStoryDetailStaticPathsQuery, TError, TData>(
		['getStoryDetailStaticPaths', variables],
		graphqlFetcher<
			GetStoryDetailStaticPathsQuery,
			GetStoryDetailStaticPathsQueryVariables
		>(GetStoryDetailStaticPathsDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getStoryDetailData<T>(
	variables: ExactAlt<T, GetStoryDetailDataQueryVariables>
): Promise<GetStoryDetailDataQuery> {
	return fetchApi(GetStoryDetailDataDocument, { variables });
}

export async function getStoryDetailStaticPaths<T>(
	variables: ExactAlt<T, GetStoryDetailStaticPathsQueryVariables>
): Promise<GetStoryDetailStaticPathsQuery> {
	return fetchApi(GetStoryDetailStaticPathsDocument, { variables });
}
