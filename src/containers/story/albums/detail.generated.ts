import * as Types from '../../../lib/generated/graphql';

import { SequenceFragmentDoc } from '../../../components/organisms/sequence.generated';
import { GenerateFeedFragmentDoc } from '../../../lib/generateFeed.generated';
import { BookFeedDescriptionFragmentDoc } from '../../audiobook/bookFeedDescription.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetStoryAlbumDetailPageDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetStoryAlbumDetailPageDataQuery = {
	__typename?: 'Query';
	storySeason:
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

export type GetStoryAlbumFeedDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetStoryAlbumFeedDataQuery = {
	__typename?: 'Query';
	storySeason:
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

export type GetStoryAlbumDetailPathsDataQueryVariables = Types.Exact<{
	language: Types.Language;
	first: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetStoryAlbumDetailPathsDataQuery = {
	__typename?: 'Query';
	storySeasons: {
		__typename?: 'SequenceConnection';
		nodes:
			| Array<{ __typename?: 'Sequence'; canonicalPath: string }>
			| null
			| undefined;
	};
};

export const GetStoryAlbumDetailPageDataDocument = `
    query getStoryAlbumDetailPageData($id: ID!) {
  storySeason(id: $id) {
    ...sequence
    canonicalUrl(useFuturePath: true)
    language
  }
}
    ${SequenceFragmentDoc}`;
export const useGetStoryAlbumDetailPageDataQuery = <
	TData = GetStoryAlbumDetailPageDataQuery,
	TError = unknown
>(
	variables: GetStoryAlbumDetailPageDataQueryVariables,
	options?: UseQueryOptions<GetStoryAlbumDetailPageDataQuery, TError, TData>
) =>
	useQuery<GetStoryAlbumDetailPageDataQuery, TError, TData>(
		['getStoryAlbumDetailPageData', variables],
		graphqlFetcher<
			GetStoryAlbumDetailPageDataQuery,
			GetStoryAlbumDetailPageDataQueryVariables
		>(GetStoryAlbumDetailPageDataDocument, variables),
		options
	);
export const GetStoryAlbumFeedDataDocument = `
    query getStoryAlbumFeedData($id: ID!) {
  storySeason(id: $id) {
    id
    title
    image {
      url(size: 600)
    }
    canonicalUrl(useFuturePath: true)
    recordings(first: 25) {
      nodes {
        ...generateFeed
      }
    }
    language
    ...bookFeedDescription
  }
}
    ${GenerateFeedFragmentDoc}
${BookFeedDescriptionFragmentDoc}`;
export const useGetStoryAlbumFeedDataQuery = <
	TData = GetStoryAlbumFeedDataQuery,
	TError = unknown
>(
	variables: GetStoryAlbumFeedDataQueryVariables,
	options?: UseQueryOptions<GetStoryAlbumFeedDataQuery, TError, TData>
) =>
	useQuery<GetStoryAlbumFeedDataQuery, TError, TData>(
		['getStoryAlbumFeedData', variables],
		graphqlFetcher<
			GetStoryAlbumFeedDataQuery,
			GetStoryAlbumFeedDataQueryVariables
		>(GetStoryAlbumFeedDataDocument, variables),
		options
	);
export const GetStoryAlbumDetailPathsDataDocument = `
    query getStoryAlbumDetailPathsData($language: Language!, $first: Int) {
  storySeasons(language: $language, first: $first) {
    nodes {
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetStoryAlbumDetailPathsDataQuery = <
	TData = GetStoryAlbumDetailPathsDataQuery,
	TError = unknown
>(
	variables: GetStoryAlbumDetailPathsDataQueryVariables,
	options?: UseQueryOptions<GetStoryAlbumDetailPathsDataQuery, TError, TData>
) =>
	useQuery<GetStoryAlbumDetailPathsDataQuery, TError, TData>(
		['getStoryAlbumDetailPathsData', variables],
		graphqlFetcher<
			GetStoryAlbumDetailPathsDataQuery,
			GetStoryAlbumDetailPathsDataQueryVariables
		>(GetStoryAlbumDetailPathsDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getStoryAlbumDetailPageData<T>(
	variables: ExactAlt<T, GetStoryAlbumDetailPageDataQueryVariables>
): Promise<GetStoryAlbumDetailPageDataQuery> {
	return fetchApi(GetStoryAlbumDetailPageDataDocument, { variables });
}

export async function getStoryAlbumFeedData<T>(
	variables: ExactAlt<T, GetStoryAlbumFeedDataQueryVariables>
): Promise<GetStoryAlbumFeedDataQuery> {
	return fetchApi(GetStoryAlbumFeedDataDocument, { variables });
}

export async function getStoryAlbumDetailPathsData<T>(
	variables: ExactAlt<T, GetStoryAlbumDetailPathsDataQueryVariables>
): Promise<GetStoryAlbumDetailPathsDataQuery> {
	return fetchApi(GetStoryAlbumDetailPathsDataDocument, { variables });
}
