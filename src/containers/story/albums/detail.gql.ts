// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../../types/generated';

import { SequenceFragmentDoc } from '../../../components/organisms/sequence.gql';
import { CardRecordingFragmentDoc } from '../../../components/molecules/card/recording.gql';
import { CardRecordingSequenceHatFragmentDoc } from '../../../components/molecules/card/recordingSequenceHat.gql';
import { PersonLockupFragmentDoc } from '../../../components/molecules/personLockup.gql';
import { CardHatSponsorFragmentDoc } from '../../../components/molecules/card/hat/sponsor.gql';
import { TeaseRecordingFragmentDoc } from '../../../components/molecules/teaseRecording.gql';
import { AndMiniplayerFragmentDoc } from '../../../components/templates/andMiniplayer.gql';
import { GenerateFeedFragmentDoc } from '../../../lib/generateFeed.gql';
import { BookFeedDescriptionFragmentDoc } from '../../../pages/[language]/books/[id]/feed.xml/bookFeedDescription.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetStoryAlbumDetailPageDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetStoryAlbumDetailPageDataQuery = {
	__typename?: 'Query';
	storySeason?: {
		__typename?: 'Sequence';
		canonicalUrl: any;
		language: Types.Language;
		id: string;
		title: string;
		contentType: Types.SequenceContentType;
		duration: number;
		description: string;
		startDate?: any | null;
		endDate?: any | null;
		shareUrl: any;
		collection?: {
			__typename?: 'Collection';
			title: string;
			canonicalPath: string;
		} | null;
		image?: { __typename?: 'Image'; url: any } | null;
		sponsor?: {
			__typename?: 'Sponsor';
			title: string;
			canonicalPath: string;
		} | null;
		recordings: {
			__typename?: 'RecordingConnection';
			aggregate?: { __typename?: 'Aggregate'; count: number } | null;
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
	} | null;
};

export type GetStoryAlbumFeedDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetStoryAlbumFeedDataQuery = {
	__typename?: 'Query';
	storySeason?: {
		__typename?: 'Sequence';
		id: string;
		title: string;
		canonicalUrl: any;
		language: Types.Language;
		image?: { __typename?: 'Image'; url: any } | null;
		recordings: {
			__typename?: 'RecordingConnection';
			nodes?: Array<{
				__typename?: 'Recording';
				id: string;
				title: string;
				contentType: Types.RecordingContentType;
				description?: string | null;
				publishDate?: any | null;
				authors: Array<{ __typename?: 'Person'; name: string }>;
				narrators: Array<{ __typename?: 'Person'; name: string }>;
				audioFiles: Array<{
					__typename?: 'AudioFile';
					id: string;
					url: any;
					filesize: string;
					duration: number;
					mimeType: string;
					bitrate: number;
				}>;
				videoFiles: Array<{
					__typename?: 'VideoFile';
					id: string;
					url: any;
					filesize: string;
					duration: number;
					mimeType: string;
					bitrate: number;
					container: string;
				}>;
				persons: Array<{ __typename?: 'Person'; name: string }>;
				sequence?: { __typename?: 'Sequence'; title: string } | null;
				sponsor?: { __typename?: 'Sponsor'; title: string } | null;
			}> | null;
		};
	} | null;
};

export type GetStoryAlbumDetailPathsDataQueryVariables = Types.Exact<{
	language: Types.Language;
	first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetStoryAlbumDetailPathsDataQuery = {
	__typename?: 'Query';
	storySeasons: {
		__typename?: 'SequenceConnection';
		nodes?: Array<{ __typename?: 'Sequence'; canonicalPath: string }> | null;
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
    ${SequenceFragmentDoc}
${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
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
