import * as Types from '../../lib/generated/graphql';

import { SequenceFragmentDoc } from '../../components/organisms/sequence.generated';
import { GenerateFeedFragmentDoc } from '../../lib/generateFeed.generated';
import { BookFeedDescriptionFragmentDoc } from './bookFeedDescription.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetAudiobookDetailPageDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetAudiobookDetailPageDataQuery = {
	__typename?: 'Query';
	audiobook:
		| {
				__typename?: 'Sequence';
				canonicalUrl: string;
				language: Types.Language;
				id: string | number;
				title: string;
				contentType: Types.SequenceContentType;
				duration: number;
				description: string;
				startDate: string | null | undefined;
				endDate: string | null | undefined;
				shareUrl: string;
				collection:
					| { __typename?: 'Collection'; title: string; canonicalPath: string }
					| null
					| undefined;
				image: { __typename?: 'Image'; url: string } | null | undefined;
				sponsor:
					| { __typename?: 'Sponsor'; title: string; canonicalPath: string }
					| null
					| undefined;
				recordings: {
					__typename?: 'RecordingConnection';
					aggregate:
						| { __typename?: 'Aggregate'; count: number }
						| null
						| undefined;
					nodes:
						| Array<{
								__typename?: 'Recording';
								canonicalPath: string;
								sequenceIndex: number | null | undefined;
								id: string | number;
								title: string;
								duration: number;
								recordingContentType: Types.RecordingContentType;
								sequence:
									| {
											__typename?: 'Sequence';
											id: string | number;
											canonicalPath: string;
											contentType: Types.SequenceContentType;
											title: string;
											image:
												| { __typename?: 'Image'; url: string }
												| null
												| undefined;
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
								writers: Array<{
									__typename?: 'Person';
									name: string;
									canonicalPath: string;
									imageWithFallback: { __typename?: 'Image'; url: string };
								}>;
								persons: Array<{
									__typename?: 'Person';
									name: string;
									canonicalPath: string;
									imageWithFallback: { __typename?: 'Image'; url: string };
								}>;
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
				};
		  }
		| null
		| undefined;
};

export type GetAudiobookFeedDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetAudiobookFeedDataQuery = {
	__typename?: 'Query';
	audiobook:
		| {
				__typename?: 'Sequence';
				id: string | number;
				title: string;
				canonicalUrl: string;
				language: Types.Language;
				image: { __typename?: 'Image'; url: string } | null | undefined;
				recordings: {
					__typename?: 'RecordingConnection';
					nodes:
						| Array<{
								__typename?: 'Recording';
								id: string | number;
								title: string;
								contentType: Types.RecordingContentType;
								description: string | null | undefined;
								publishDate: string | null | undefined;
								authors: Array<{ __typename?: 'Person'; name: string }>;
								narrators: Array<{ __typename?: 'Person'; name: string }>;
								audioFiles: Array<{
									__typename?: 'AudioFile';
									id: string | number;
									url: string;
									filesize: string;
									duration: number;
									mimeType: string;
									bitrate: number;
								}>;
								videoFiles: Array<{
									__typename?: 'VideoFile';
									id: string | number;
									url: string;
									filesize: string;
									duration: number;
									mimeType: string;
									bitrate: number;
									container: string;
								}>;
								persons: Array<{ __typename?: 'Person'; name: string }>;
								sequence:
									| { __typename?: 'Sequence'; title: string }
									| null
									| undefined;
								sponsor:
									| { __typename?: 'Sponsor'; title: string }
									| null
									| undefined;
						  }>
						| null
						| undefined;
				};
		  }
		| null
		| undefined;
};

export type GetAudiobookDetailPathsDataQueryVariables = Types.Exact<{
	language: Types.Language;
	first: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetAudiobookDetailPathsDataQuery = {
	__typename?: 'Query';
	audiobooks: {
		__typename?: 'SequenceConnection';
		nodes:
			| Array<{ __typename?: 'Sequence'; canonicalPath: string }>
			| null
			| undefined;
	};
};

export const GetAudiobookDetailPageDataDocument = `
    query getAudiobookDetailPageData($id: ID!) {
  audiobook(id: $id) {
    ...sequence
    canonicalUrl(useFuturePath: true)
    language
  }
}
    ${SequenceFragmentDoc}`;
export const useGetAudiobookDetailPageDataQuery = <
	TData = GetAudiobookDetailPageDataQuery,
	TError = unknown
>(
	variables: GetAudiobookDetailPageDataQueryVariables,
	options?: UseQueryOptions<GetAudiobookDetailPageDataQuery, TError, TData>
) =>
	useQuery<GetAudiobookDetailPageDataQuery, TError, TData>(
		['getAudiobookDetailPageData', variables],
		graphqlFetcher<
			GetAudiobookDetailPageDataQuery,
			GetAudiobookDetailPageDataQueryVariables
		>(GetAudiobookDetailPageDataDocument, variables),
		options
	);
export const GetAudiobookFeedDataDocument = `
    query getAudiobookFeedData($id: ID!) {
  audiobook(id: $id) {
    id
    title
    image {
      url(size: 600)
    }
    canonicalUrl(useFuturePath: true)
    language
    recordings(first: 25) {
      nodes {
        ...generateFeed
      }
    }
    ...bookFeedDescription
  }
}
    ${GenerateFeedFragmentDoc}
${BookFeedDescriptionFragmentDoc}`;
export const useGetAudiobookFeedDataQuery = <
	TData = GetAudiobookFeedDataQuery,
	TError = unknown
>(
	variables: GetAudiobookFeedDataQueryVariables,
	options?: UseQueryOptions<GetAudiobookFeedDataQuery, TError, TData>
) =>
	useQuery<GetAudiobookFeedDataQuery, TError, TData>(
		['getAudiobookFeedData', variables],
		graphqlFetcher<
			GetAudiobookFeedDataQuery,
			GetAudiobookFeedDataQueryVariables
		>(GetAudiobookFeedDataDocument, variables),
		options
	);
export const GetAudiobookDetailPathsDataDocument = `
    query getAudiobookDetailPathsData($language: Language!, $first: Int) {
  audiobooks(language: $language, first: $first) {
    nodes {
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetAudiobookDetailPathsDataQuery = <
	TData = GetAudiobookDetailPathsDataQuery,
	TError = unknown
>(
	variables: GetAudiobookDetailPathsDataQueryVariables,
	options?: UseQueryOptions<GetAudiobookDetailPathsDataQuery, TError, TData>
) =>
	useQuery<GetAudiobookDetailPathsDataQuery, TError, TData>(
		['getAudiobookDetailPathsData', variables],
		graphqlFetcher<
			GetAudiobookDetailPathsDataQuery,
			GetAudiobookDetailPathsDataQueryVariables
		>(GetAudiobookDetailPathsDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getAudiobookDetailPageData<T>(
	variables: ExactAlt<T, GetAudiobookDetailPageDataQueryVariables>
): Promise<GetAudiobookDetailPageDataQuery> {
	return fetchApi(GetAudiobookDetailPageDataDocument, { variables });
}

export async function getAudiobookFeedData<T>(
	variables: ExactAlt<T, GetAudiobookFeedDataQueryVariables>
): Promise<GetAudiobookFeedDataQuery> {
	return fetchApi(GetAudiobookFeedDataDocument, { variables });
}

export async function getAudiobookDetailPathsData<T>(
	variables: ExactAlt<T, GetAudiobookDetailPathsDataQueryVariables>
): Promise<GetAudiobookDetailPathsDataQuery> {
	return fetchApi(GetAudiobookDetailPathsDataDocument, { variables });
}
