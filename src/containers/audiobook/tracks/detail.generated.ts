import * as Types from '../../../lib/generated/graphql';

import { RecordingFragmentDoc } from '../../../components/organisms/recording.generated';
import { PersonLockupFragmentDoc } from '../../../components/molecules/personLockup.generated';
import { TeaseRecordingFragmentDoc } from '../../../components/molecules/teaseRecording.generated';
import { AndMiniplayerFragmentDoc } from '../../../components/templates/andMiniplayer.generated';
import { SequenceNavFragmentDoc } from '../../../components/molecules/sequenceNav.generated';
import { CopyrightInfoFragmentDoc } from '../../../components/molecules/copyrightInfo.generated';
import { PlayerFragmentDoc } from '../../../components/molecules/player.generated';
import { ButtonDownloadFragmentDoc } from '../../../components/molecules/buttonDownload.generated';
import { ButtonShareRecordingFragmentDoc } from '../../../components/molecules/buttonShareRecording.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetAudiobookTrackDetailDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetAudiobookTrackDetailDataQuery = {
	__typename?: 'Query';
	audiobookTrack:
		| {
				__typename?: 'Recording';
				language: Types.Language;
				id: string | number;
				title: string;
				contentType: Types.RecordingContentType;
				description: string | null | undefined;
				recordingDate: string | null | undefined;
				sequenceIndex: number | null | undefined;
				canonicalUrl: string;
				shareUrl: string;
				copyrightYear: number | null | undefined;
				canonicalPath: string;
				duration: number;
				isDownloadAllowed: boolean;
				speakers: Array<{
					__typename?: 'Person';
					name: string;
					canonicalPath: string;
					imageWithFallback: { __typename?: 'Image'; url: string };
				}>;
				writers: Array<{
					__typename?: 'Person';
					name: string;
					canonicalPath: string;
					imageWithFallback: { __typename?: 'Image'; url: string };
				}>;
				attachments: Array<{
					__typename?: 'Attachment';
					filename: string;
					url: string;
				}>;
				imageWithFallback: { __typename?: 'Image'; url: string };
				recordingTags: {
					__typename?: 'RecordingTagConnection';
					nodes:
						| Array<{
								__typename?: 'RecordingTag';
								tag: { __typename?: 'Tag'; id: string | number; name: string };
						  }>
						| null
						| undefined;
				};
				sponsor:
					| { __typename?: 'Sponsor'; title: string; canonicalPath: string }
					| null
					| undefined;
				sequence:
					| {
							__typename?: 'Sequence';
							id: string | number;
							title: string;
							contentType: Types.SequenceContentType;
							canonicalPath: string;
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
																| { __typename?: 'Aggregate'; count: number }
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
					  }
					| null
					| undefined;
				collection:
					| { __typename?: 'Collection'; title: string; canonicalPath: string }
					| null
					| undefined;
				transcript:
					| { __typename?: 'Transcript'; text: string }
					| null
					| undefined;
				sequencePreviousRecording:
					| { __typename?: 'Recording'; canonicalPath: string }
					| null
					| undefined;
				sequenceNextRecording:
					| { __typename?: 'Recording'; canonicalPath: string }
					| null
					| undefined;
				distributionAgreement:
					| {
							__typename?: 'DistributionAgreement';
							sponsor:
								| { __typename?: 'Sponsor'; title: string }
								| null
								| undefined;
							license:
								| {
										__typename?: 'License';
										summary: string;
										image:
											| { __typename?: 'Image'; url: string }
											| null
											| undefined;
								  }
								| null
								| undefined;
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
				videoDownloads: Array<{
					__typename?: 'VideoFile';
					url: string;
					filesize: string;
					height: number;
					width: number;
				}>;
				audioDownloads: Array<{
					__typename?: 'AudioFile';
					url: string;
					filesize: string;
					bitrate: number;
				}>;
		  }
		| null
		| undefined;
};

export type GetAudiobookTrackDetailStaticPathsQueryVariables = Types.Exact<{
	language: Types.Language;
	first: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetAudiobookTrackDetailStaticPathsQuery = {
	__typename?: 'Query';
	audiobookTracks: {
		__typename?: 'RecordingConnection';
		nodes:
			| Array<{ __typename?: 'Recording'; canonicalPath: string }>
			| null
			| undefined;
	};
};

export const GetAudiobookTrackDetailDataDocument = `
    query getAudiobookTrackDetailData($id: ID!) {
  audiobookTrack(id: $id) {
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
export const useGetAudiobookTrackDetailDataQuery = <
	TData = GetAudiobookTrackDetailDataQuery,
	TError = unknown
>(
	variables: GetAudiobookTrackDetailDataQueryVariables,
	options?: UseQueryOptions<GetAudiobookTrackDetailDataQuery, TError, TData>
) =>
	useQuery<GetAudiobookTrackDetailDataQuery, TError, TData>(
		['getAudiobookTrackDetailData', variables],
		graphqlFetcher<
			GetAudiobookTrackDetailDataQuery,
			GetAudiobookTrackDetailDataQueryVariables
		>(GetAudiobookTrackDetailDataDocument, variables),
		options
	);
export const GetAudiobookTrackDetailStaticPathsDocument = `
    query getAudiobookTrackDetailStaticPaths($language: Language!, $first: Int) {
  audiobookTracks(language: $language, first: $first) {
    nodes {
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetAudiobookTrackDetailStaticPathsQuery = <
	TData = GetAudiobookTrackDetailStaticPathsQuery,
	TError = unknown
>(
	variables: GetAudiobookTrackDetailStaticPathsQueryVariables,
	options?: UseQueryOptions<
		GetAudiobookTrackDetailStaticPathsQuery,
		TError,
		TData
	>
) =>
	useQuery<GetAudiobookTrackDetailStaticPathsQuery, TError, TData>(
		['getAudiobookTrackDetailStaticPaths', variables],
		graphqlFetcher<
			GetAudiobookTrackDetailStaticPathsQuery,
			GetAudiobookTrackDetailStaticPathsQueryVariables
		>(GetAudiobookTrackDetailStaticPathsDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export const GetAudiobookTrackDetailDataDocument = `query getAudiobookTrackDetailData($id:ID!){audiobookTrack(id:$id){...recording language}}`;
export async function getAudiobookTrackDetailData<T>(
	variables: ExactAlt<T, GetAudiobookTrackDetailDataQueryVariables>
): Promise<GetAudiobookTrackDetailDataQuery> {
	return fetchApi(GetAudiobookTrackDetailDataDocument, { variables });
}

export const GetAudiobookTrackDetailStaticPathsDocument = `query getAudiobookTrackDetailStaticPaths($language:Language!$first:Int){audiobookTracks(language:$language first:$first){nodes{canonicalPath(useFuturePath:true)}}}`;
export async function getAudiobookTrackDetailStaticPaths<T>(
	variables: ExactAlt<T, GetAudiobookTrackDetailStaticPathsQueryVariables>
): Promise<GetAudiobookTrackDetailStaticPathsQuery> {
	return fetchApi(GetAudiobookTrackDetailStaticPathsDocument, { variables });
}
