// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { SponsorLockupFragmentDoc } from '../../components/molecules/sponsorLockup.gql';
import { CardPersonFragmentDoc } from '../../components/molecules/card/person.gql';
import { CardSequenceFragmentDoc } from '../../components/molecules/card/sequence.gql';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.gql';
import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.gql';
import { CardRecordingSequenceHatFragmentDoc } from '../../components/molecules/card/recordingSequenceHat.gql';
import { CardHatSponsorFragmentDoc } from '../../components/molecules/card/hat/sponsor.gql';
import { TeaseRecordingFragmentDoc } from '../../components/molecules/teaseRecording.gql';
import { AndMiniplayerFragmentDoc } from '../../components/templates/andMiniplayer.gql';
import { GenerateFeedFragmentDoc } from '../../lib/generateFeed.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetCollectionDetailPageDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetCollectionDetailPageDataQuery = {
	__typename?: 'Query';
	collection?: {
		__typename?: 'Collection';
		id: string;
		title: string;
		contentType: Types.CollectionContentType;
		startDate?: any | null;
		endDate?: any | null;
		duration: number;
		description: string;
		canonicalUrl: any;
		language: Types.Language;
		shareUrl: any;
		location?: string | null;
		image?: { __typename?: 'Image'; url: any } | null;
		sponsor?: {
			__typename?: 'Sponsor';
			id: string;
			title: string;
			canonicalPath: string;
			image?: { __typename?: 'Image'; url: any } | null;
		} | null;
		persons: {
			__typename?: 'PersonConnection';
			nodes?: Array<{
				__typename?: 'Person';
				id: string;
				name: string;
				canonicalPath: string;
				image?: { __typename?: 'Image'; id: string; url: any } | null;
				recordings: {
					__typename?: 'RecordingConnection';
					aggregate?: { __typename?: 'Aggregate'; count: number } | null;
				};
			}> | null;
			pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean };
		};
		sequences: {
			__typename?: 'SequenceConnection';
			aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			nodes?: Array<{
				__typename?: 'Sequence';
				id: string;
				title: string;
				canonicalPath: string;
				contentType: Types.SequenceContentType;
				duration: number;
				summary: string;
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
			pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean };
		};
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
			pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean };
		};
	} | null;
};

export type GetCollectionFeedDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetCollectionFeedDataQuery = {
	__typename?: 'Query';
	collection?: {
		__typename?: 'Collection';
		title: string;
		canonicalUrl: any;
		language: Types.Language;
		image?: { __typename?: 'Image'; url: any } | null;
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

export type GetCollectionDetailPathsDataQueryVariables = Types.Exact<{
	language: Types.Language;
	first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetCollectionDetailPathsDataQuery = {
	__typename?: 'Query';
	collections: {
		__typename?: 'CollectionConnection';
		nodes?: Array<{
			__typename?: 'Collection';
			id: string;
			canonicalPath: string;
		}> | null;
	};
};

export const GetCollectionDetailPageDataDocument = `
    query getCollectionDetailPageData($id: ID!) {
  collection(id: $id) {
    id
    title
    contentType
    startDate
    endDate
    duration
    description
    canonicalUrl(useFuturePath: true)
    language
    shareUrl
    location
    image {
      url(size: 1000, cropMode: MAX_SIZE)
    }
    sponsor {
      id
      title
      canonicalPath(useFuturePath: true)
      ...sponsorLockup
    }
    persons(
      first: 3
      role: SPEAKER
      orderBy: [{field: RECORDING_COUNT, direction: DESC}, {field: RECORDING_DOWNLOADS_ALL_TIME, direction: DESC}]
    ) {
      nodes {
        ...cardPerson
      }
      pageInfo {
        hasNextPage
      }
    }
    sequences(first: 3, orderBy: [{field: RECORDING_COUNT, direction: DESC}]) {
      aggregate {
        count
      }
      nodes {
        ...cardSequence
      }
      pageInfo {
        hasNextPage
      }
    }
    recordings(
      first: 3
      sequenceId: 0
      orderBy: [{field: PUBLISHED_AT, direction: DESC}]
    ) {
      aggregate {
        count
      }
      nodes {
        ...cardRecording
      }
      pageInfo {
        hasNextPage
      }
    }
  }
}
    ${SponsorLockupFragmentDoc}
${CardPersonFragmentDoc}
${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}
${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetCollectionDetailPageDataQuery = <
	TData = GetCollectionDetailPageDataQuery,
	TError = unknown
>(
	variables: GetCollectionDetailPageDataQueryVariables,
	options?: UseQueryOptions<GetCollectionDetailPageDataQuery, TError, TData>
) =>
	useQuery<GetCollectionDetailPageDataQuery, TError, TData>(
		['getCollectionDetailPageData', variables],
		graphqlFetcher<
			GetCollectionDetailPageDataQuery,
			GetCollectionDetailPageDataQueryVariables
		>(GetCollectionDetailPageDataDocument, variables),
		options
	);
export const GetCollectionFeedDataDocument = `
    query getCollectionFeedData($id: ID!) {
  collection(id: $id) {
    title
    canonicalUrl(useFuturePath: true)
    language
    image {
      url(size: 600)
    }
    recordings(first: 25, orderBy: [{field: RECORDED_AT, direction: ASC}]) {
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
export const useGetCollectionFeedDataQuery = <
	TData = GetCollectionFeedDataQuery,
	TError = unknown
>(
	variables: GetCollectionFeedDataQueryVariables,
	options?: UseQueryOptions<GetCollectionFeedDataQuery, TError, TData>
) =>
	useQuery<GetCollectionFeedDataQuery, TError, TData>(
		['getCollectionFeedData', variables],
		graphqlFetcher<
			GetCollectionFeedDataQuery,
			GetCollectionFeedDataQueryVariables
		>(GetCollectionFeedDataDocument, variables),
		options
	);
export const GetCollectionDetailPathsDataDocument = `
    query getCollectionDetailPathsData($language: Language!, $first: Int) {
  collections(language: $language, first: $first) {
    nodes {
      id
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetCollectionDetailPathsDataQuery = <
	TData = GetCollectionDetailPathsDataQuery,
	TError = unknown
>(
	variables: GetCollectionDetailPathsDataQueryVariables,
	options?: UseQueryOptions<GetCollectionDetailPathsDataQuery, TError, TData>
) =>
	useQuery<GetCollectionDetailPathsDataQuery, TError, TData>(
		['getCollectionDetailPathsData', variables],
		graphqlFetcher<
			GetCollectionDetailPathsDataQuery,
			GetCollectionDetailPathsDataQueryVariables
		>(GetCollectionDetailPathsDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getCollectionDetailPageData<T>(
	variables: ExactAlt<T, GetCollectionDetailPageDataQueryVariables>
): Promise<GetCollectionDetailPageDataQuery> {
	return fetchApi(GetCollectionDetailPageDataDocument, { variables });
}

export async function getCollectionFeedData<T>(
	variables: ExactAlt<T, GetCollectionFeedDataQueryVariables>
): Promise<GetCollectionFeedDataQuery> {
	return fetchApi(GetCollectionFeedDataDocument, { variables });
}

export async function getCollectionDetailPathsData<T>(
	variables: ExactAlt<T, GetCollectionDetailPathsDataQueryVariables>
): Promise<GetCollectionDetailPathsDataQuery> {
	return fetchApi(GetCollectionDetailPathsDataDocument, { variables });
}
