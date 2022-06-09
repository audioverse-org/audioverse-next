// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { SponsorPivotFragmentDoc } from './pivot.gql';
import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.gql';
import { CardRecordingSequenceHatFragmentDoc } from '../../components/molecules/card/recordingSequenceHat.gql';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.gql';
import { CardHatSponsorFragmentDoc } from '../../components/molecules/card/hat/sponsor.gql';
import { TeaseRecordingFragmentDoc } from '../../components/molecules/teaseRecording.gql';
import { AndMiniplayerFragmentDoc } from '../../components/templates/andMiniplayer.gql';
import { GenerateFeedFragmentDoc } from '../../lib/generateFeed.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetSponsorTeachingsPageDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
	offset?: Types.InputMaybe<Types.Scalars['Int']>;
	first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetSponsorTeachingsPageDataQuery = {
	__typename?: 'Query';
	sponsor?: {
		__typename?: 'Sponsor';
		id: string;
		title: string;
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
			aggregate?: { __typename?: 'Aggregate'; count: number } | null;
		};
		image?: { __typename?: 'Image'; url: any } | null;
	} | null;
};

export type GetSponsorTeachingsFeedDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetSponsorTeachingsFeedDataQuery = {
	__typename?: 'Query';
	sponsor?: {
		__typename?: 'Sponsor';
		title: string;
		canonicalUrl: any;
		language: Types.Language;
		recordings: {
			__typename?: 'RecordingConnection';
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

export type GetSponsorTeachingsPathsDataQueryVariables = Types.Exact<{
	language: Types.Language;
	first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetSponsorTeachingsPathsDataQuery = {
	__typename?: 'Query';
	sponsors: {
		__typename?: 'SponsorConnection';
		nodes?: Array<{ __typename?: 'Sponsor'; id: string }> | null;
	};
};

export const GetSponsorTeachingsPageDataDocument = `
    query getSponsorTeachingsPageData($id: ID!, $offset: Int, $first: Int) {
  sponsor(id: $id) {
    id
    ...sponsorPivot
    recordings(
      offset: $offset
      first: $first
      orderBy: [{field: RECORDED_AT, direction: DESC}]
    ) {
      nodes {
        ...cardRecording
      }
      aggregate {
        count
      }
    }
  }
}
    ${SponsorPivotFragmentDoc}
${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetSponsorTeachingsPageDataQuery = <
	TData = GetSponsorTeachingsPageDataQuery,
	TError = unknown
>(
	variables: GetSponsorTeachingsPageDataQueryVariables,
	options?: UseQueryOptions<GetSponsorTeachingsPageDataQuery, TError, TData>
) =>
	useQuery<GetSponsorTeachingsPageDataQuery, TError, TData>(
		['getSponsorTeachingsPageData', variables],
		graphqlFetcher<
			GetSponsorTeachingsPageDataQuery,
			GetSponsorTeachingsPageDataQueryVariables
		>(GetSponsorTeachingsPageDataDocument, variables),
		options
	);
export const GetSponsorTeachingsFeedDataDocument = `
    query getSponsorTeachingsFeedData($id: ID!) {
  sponsor(id: $id) {
    title
    canonicalUrl(useFuturePath: true)
    language
    recordings(first: 25, orderBy: [{field: RECORDED_AT, direction: DESC}]) {
      nodes {
        ...generateFeed
      }
    }
  }
}
    ${GenerateFeedFragmentDoc}`;
export const useGetSponsorTeachingsFeedDataQuery = <
	TData = GetSponsorTeachingsFeedDataQuery,
	TError = unknown
>(
	variables: GetSponsorTeachingsFeedDataQueryVariables,
	options?: UseQueryOptions<GetSponsorTeachingsFeedDataQuery, TError, TData>
) =>
	useQuery<GetSponsorTeachingsFeedDataQuery, TError, TData>(
		['getSponsorTeachingsFeedData', variables],
		graphqlFetcher<
			GetSponsorTeachingsFeedDataQuery,
			GetSponsorTeachingsFeedDataQueryVariables
		>(GetSponsorTeachingsFeedDataDocument, variables),
		options
	);
export const GetSponsorTeachingsPathsDataDocument = `
    query getSponsorTeachingsPathsData($language: Language!, $first: Int) {
  sponsors(language: $language, first: $first) {
    nodes {
      id
    }
  }
}
    `;
export const useGetSponsorTeachingsPathsDataQuery = <
	TData = GetSponsorTeachingsPathsDataQuery,
	TError = unknown
>(
	variables: GetSponsorTeachingsPathsDataQueryVariables,
	options?: UseQueryOptions<GetSponsorTeachingsPathsDataQuery, TError, TData>
) =>
	useQuery<GetSponsorTeachingsPathsDataQuery, TError, TData>(
		['getSponsorTeachingsPathsData', variables],
		graphqlFetcher<
			GetSponsorTeachingsPathsDataQuery,
			GetSponsorTeachingsPathsDataQueryVariables
		>(GetSponsorTeachingsPathsDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getSponsorTeachingsPageData<T>(
	variables: ExactAlt<T, GetSponsorTeachingsPageDataQueryVariables>
): Promise<GetSponsorTeachingsPageDataQuery> {
	return fetchApi(GetSponsorTeachingsPageDataDocument, { variables });
}

export async function getSponsorTeachingsFeedData<T>(
	variables: ExactAlt<T, GetSponsorTeachingsFeedDataQueryVariables>
): Promise<GetSponsorTeachingsFeedDataQuery> {
	return fetchApi(GetSponsorTeachingsFeedDataDocument, { variables });
}

export async function getSponsorTeachingsPathsData<T>(
	variables: ExactAlt<T, GetSponsorTeachingsPathsDataQueryVariables>
): Promise<GetSponsorTeachingsPathsDataQuery> {
	return fetchApi(GetSponsorTeachingsPathsDataDocument, { variables });
}
