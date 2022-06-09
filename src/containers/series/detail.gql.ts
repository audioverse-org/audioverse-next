// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { SequenceFragmentDoc } from '../../components/organisms/sequence.gql';
import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.gql';
import { CardRecordingSequenceHatFragmentDoc } from '../../components/molecules/card/recordingSequenceHat.gql';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.gql';
import { CardHatSponsorFragmentDoc } from '../../components/molecules/card/hat/sponsor.gql';
import { TeaseRecordingFragmentDoc } from '../../components/molecules/teaseRecording.gql';
import { AndMiniplayerFragmentDoc } from '../../components/templates/andMiniplayer.gql';
import { GenerateFeedFragmentDoc } from '../../lib/generateFeed.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetSeriesDetailPageDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetSeriesDetailPageDataQuery = {
	__typename?: 'Query';
	series?: {
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

export type GetSeriesFeedDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetSeriesFeedDataQuery = {
	__typename?: 'Query';
	series?: {
		__typename?: 'Sequence';
		title: string;
		canonicalUrl: any;
		language: Types.Language;
		recordings: {
			__typename?: 'RecordingConnection';
			aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			nodes?: Array<{
				__typename?: 'Recording';
				id: string;
				title: string;
				contentType: Types.RecordingContentType;
				description?: string | null;
				publishDate?: any | null;
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

export type GetSeriesDetailPathsDataQueryVariables = Types.Exact<{
	language: Types.Language;
	first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetSeriesDetailPathsDataQuery = {
	__typename?: 'Query';
	serieses: {
		__typename?: 'SequenceConnection';
		nodes?: Array<{ __typename?: 'Sequence'; canonicalPath: string }> | null;
	};
};

export const GetSeriesDetailPageDataDocument = `
    query getSeriesDetailPageData($id: ID!) {
  series(id: $id) {
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
export const useGetSeriesDetailPageDataQuery = <
	TData = GetSeriesDetailPageDataQuery,
	TError = unknown
>(
	variables: GetSeriesDetailPageDataQueryVariables,
	options?: UseQueryOptions<GetSeriesDetailPageDataQuery, TError, TData>
) =>
	useQuery<GetSeriesDetailPageDataQuery, TError, TData>(
		['getSeriesDetailPageData', variables],
		graphqlFetcher<
			GetSeriesDetailPageDataQuery,
			GetSeriesDetailPageDataQueryVariables
		>(GetSeriesDetailPageDataDocument, variables),
		options
	);
export const GetSeriesFeedDataDocument = `
    query getSeriesFeedData($id: ID!) {
  series(id: $id) {
    title
    canonicalUrl(useFuturePath: true)
    language
    recordings(first: 25) {
      aggregate {
        count
      }
      nodes {
        ...generateFeed
      }
    }
  }
}
    ${GenerateFeedFragmentDoc}`;
export const useGetSeriesFeedDataQuery = <
	TData = GetSeriesFeedDataQuery,
	TError = unknown
>(
	variables: GetSeriesFeedDataQueryVariables,
	options?: UseQueryOptions<GetSeriesFeedDataQuery, TError, TData>
) =>
	useQuery<GetSeriesFeedDataQuery, TError, TData>(
		['getSeriesFeedData', variables],
		graphqlFetcher<GetSeriesFeedDataQuery, GetSeriesFeedDataQueryVariables>(
			GetSeriesFeedDataDocument,
			variables
		),
		options
	);
export const GetSeriesDetailPathsDataDocument = `
    query getSeriesDetailPathsData($language: Language!, $first: Int) {
  serieses(language: $language, first: $first) {
    nodes {
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetSeriesDetailPathsDataQuery = <
	TData = GetSeriesDetailPathsDataQuery,
	TError = unknown
>(
	variables: GetSeriesDetailPathsDataQueryVariables,
	options?: UseQueryOptions<GetSeriesDetailPathsDataQuery, TError, TData>
) =>
	useQuery<GetSeriesDetailPathsDataQuery, TError, TData>(
		['getSeriesDetailPathsData', variables],
		graphqlFetcher<
			GetSeriesDetailPathsDataQuery,
			GetSeriesDetailPathsDataQueryVariables
		>(GetSeriesDetailPathsDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getSeriesDetailPageData<T>(
	variables: ExactAlt<T, GetSeriesDetailPageDataQueryVariables>
): Promise<GetSeriesDetailPageDataQuery> {
	return fetchApi(GetSeriesDetailPageDataDocument, { variables });
}

export async function getSeriesFeedData<T>(
	variables: ExactAlt<T, GetSeriesFeedDataQueryVariables>
): Promise<GetSeriesFeedDataQuery> {
	return fetchApi(GetSeriesFeedDataDocument, { variables });
}

export async function getSeriesDetailPathsData<T>(
	variables: ExactAlt<T, GetSeriesDetailPathsDataQueryVariables>
): Promise<GetSeriesDetailPathsDataQuery> {
	return fetchApi(GetSeriesDetailPathsDataDocument, { variables });
}
