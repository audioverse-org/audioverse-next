// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { CardCollectionFragmentDoc } from '../../components/molecules/card/collection.gql';
import { CardSequenceFragmentDoc } from '../../components/molecules/card/sequence.gql';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.gql';
import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.gql';
import { CardRecordingSequenceHatFragmentDoc } from '../../components/molecules/card/recordingSequenceHat.gql';
import { CardHatSponsorFragmentDoc } from '../../components/molecules/card/hat/sponsor.gql';
import { TeaseRecordingFragmentDoc } from '../../components/molecules/teaseRecording.gql';
import { AndMiniplayerFragmentDoc } from '../../components/templates/andMiniplayer.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetSponsorDetailPageDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetSponsorDetailPageDataQuery = {
	__typename?: 'Query';
	sponsor?: {
		__typename?: 'Sponsor';
		id: string;
		title: string;
		location?: string | null;
		website?: any | null;
		description: string;
		canonicalUrl: any;
		language: Types.Language;
		shareUrl: any;
		image?: { __typename?: 'Image'; url: any } | null;
		collections: {
			__typename?: 'CollectionConnection';
			aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			nodes?: Array<{
				__typename?: 'Collection';
				id: string;
				canonicalPath: string;
				title: string;
				startDate?: any | null;
				endDate?: any | null;
				duration: number;
				collectionContentType: Types.CollectionContentType;
				image?: { __typename?: 'Image'; id: string; url: any } | null;
				allSequences: {
					__typename?: 'SequenceConnection';
					aggregate?: { __typename?: 'Aggregate'; count: number } | null;
				};
				allRecordings: {
					__typename?: 'RecordingConnection';
					aggregate?: { __typename?: 'Aggregate'; count: number } | null;
				};
			}> | null;
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
		};
	} | null;
};

export type GetSponsorDetailPathsDataQueryVariables = Types.Exact<{
	language: Types.Language;
	first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetSponsorDetailPathsDataQuery = {
	__typename?: 'Query';
	sponsors: {
		__typename?: 'SponsorConnection';
		nodes?: Array<{ __typename?: 'Sponsor'; canonicalPath: string }> | null;
	};
};

export const GetSponsorDetailPageDataDocument = `
    query getSponsorDetailPageData($id: ID!) {
  sponsor(id: $id) {
    id
    title
    location
    website
    description
    canonicalUrl(useFuturePath: true)
    language
    shareUrl
    image {
      url(size: 128)
    }
    collections(
      first: 3
      orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
    ) {
      aggregate {
        count
      }
      nodes {
        ...cardCollection
      }
    }
    sequences(
      first: 3
      contentType: null
      orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
    ) {
      aggregate {
        count
      }
      nodes {
        ...cardSequence
      }
    }
    recordings(
      first: 3
      collectionId: 0
      sequenceId: 0
      orderBy: [{field: PUBLISHED_AT, direction: DESC}]
    ) {
      aggregate {
        count
      }
      nodes {
        ...cardRecording
      }
    }
  }
}
    ${CardCollectionFragmentDoc}
${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}
${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetSponsorDetailPageDataQuery = <
	TData = GetSponsorDetailPageDataQuery,
	TError = unknown
>(
	variables: GetSponsorDetailPageDataQueryVariables,
	options?: UseQueryOptions<GetSponsorDetailPageDataQuery, TError, TData>
) =>
	useQuery<GetSponsorDetailPageDataQuery, TError, TData>(
		['getSponsorDetailPageData', variables],
		graphqlFetcher<
			GetSponsorDetailPageDataQuery,
			GetSponsorDetailPageDataQueryVariables
		>(GetSponsorDetailPageDataDocument, variables),
		options
	);
export const GetSponsorDetailPathsDataDocument = `
    query getSponsorDetailPathsData($language: Language!, $first: Int) {
  sponsors(language: $language, first: $first) {
    nodes {
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetSponsorDetailPathsDataQuery = <
	TData = GetSponsorDetailPathsDataQuery,
	TError = unknown
>(
	variables: GetSponsorDetailPathsDataQueryVariables,
	options?: UseQueryOptions<GetSponsorDetailPathsDataQuery, TError, TData>
) =>
	useQuery<GetSponsorDetailPathsDataQuery, TError, TData>(
		['getSponsorDetailPathsData', variables],
		graphqlFetcher<
			GetSponsorDetailPathsDataQuery,
			GetSponsorDetailPathsDataQueryVariables
		>(GetSponsorDetailPathsDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getSponsorDetailPageData<T>(
	variables: ExactAlt<T, GetSponsorDetailPageDataQueryVariables>
): Promise<GetSponsorDetailPageDataQuery> {
	return fetchApi(GetSponsorDetailPageDataDocument, { variables });
}

export async function getSponsorDetailPathsData<T>(
	variables: ExactAlt<T, GetSponsorDetailPathsDataQueryVariables>
): Promise<GetSponsorDetailPathsDataQuery> {
	return fetchApi(GetSponsorDetailPathsDataDocument, { variables });
}
