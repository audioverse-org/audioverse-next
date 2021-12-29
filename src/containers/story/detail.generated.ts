import * as Types from '../../lib/generated/graphql';

import { RecordingFragmentDoc } from '../../components/organisms/recording.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetStoryDetailDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetStoryDetailDataQuery = {
	__typename?: 'Query';
	story:
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

export type GetStoryDetailStaticPathsQueryVariables = Types.Exact<{
	language: Types.Language;
	first: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetStoryDetailStaticPathsQuery = {
	__typename?: 'Query';
	stories: {
		__typename?: 'RecordingConnection';
		nodes:
			| Array<{ __typename?: 'Recording'; canonicalPath: string }>
			| null
			| undefined;
	};
};

export const GetStoryDetailDataDocument = `
    query getStoryDetailData($id: ID!) {
  story(id: $id) {
    ...recording
    language
  }
}
    ${RecordingFragmentDoc}`;
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
