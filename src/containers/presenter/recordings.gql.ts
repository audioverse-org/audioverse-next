// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { PresenterPivotFragmentDoc } from './pivot.gql';
import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.gql';
import { CardRecordingSequenceHatFragmentDoc } from '../../components/molecules/card/recordingSequenceHat.gql';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.gql';
import { CardHatSponsorFragmentDoc } from '../../components/molecules/card/hat/sponsor.gql';
import { TeaseRecordingFragmentDoc } from '../../components/molecules/teaseRecording.gql';
import { AndMiniplayerFragmentDoc } from '../../components/templates/andMiniplayer.gql';
import { GenerateFeedFragmentDoc } from '../../lib/generateFeed.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetPresenterRecordingsPageDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
	offset?: Types.InputMaybe<Types.Scalars['Int']>;
	first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetPresenterRecordingsPageDataQuery = {
	__typename?: 'Query';
	person?: {
		__typename?: 'Person';
		id: string;
		name: string;
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
		imageWithFallback: { __typename?: 'Image'; url: any };
	} | null;
};

export type GetPresenterRecordingsFeedDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetPresenterRecordingsFeedDataQuery = {
	__typename?: 'Query';
	person?: {
		__typename?: 'Person';
		id: string;
		name: string;
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

export const GetPresenterRecordingsPageDataDocument = `
    query getPresenterRecordingsPageData($id: ID!, $offset: Int, $first: Int) {
  person(id: $id) {
    id
    ...presenterPivot
    recordings(
      offset: $offset
      first: $first
      orderBy: [{field: PUBLISHED_AT, direction: DESC}]
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
    ${PresenterPivotFragmentDoc}
${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetPresenterRecordingsPageDataQuery = <
	TData = GetPresenterRecordingsPageDataQuery,
	TError = unknown
>(
	variables: GetPresenterRecordingsPageDataQueryVariables,
	options?: UseQueryOptions<GetPresenterRecordingsPageDataQuery, TError, TData>
) =>
	useQuery<GetPresenterRecordingsPageDataQuery, TError, TData>(
		['getPresenterRecordingsPageData', variables],
		graphqlFetcher<
			GetPresenterRecordingsPageDataQuery,
			GetPresenterRecordingsPageDataQueryVariables
		>(GetPresenterRecordingsPageDataDocument, variables),
		options
	);
export const GetPresenterRecordingsFeedDataDocument = `
    query getPresenterRecordingsFeedData($id: ID!) {
  person(id: $id) {
    id
    name
    image {
      url(size: 600)
    }
    canonicalUrl(useFuturePath: true)
    language
    recordings(first: 25, orderBy: [{field: PUBLISHED_AT, direction: DESC}]) {
      nodes {
        ...generateFeed
      }
    }
  }
}
    ${GenerateFeedFragmentDoc}`;
export const useGetPresenterRecordingsFeedDataQuery = <
	TData = GetPresenterRecordingsFeedDataQuery,
	TError = unknown
>(
	variables: GetPresenterRecordingsFeedDataQueryVariables,
	options?: UseQueryOptions<GetPresenterRecordingsFeedDataQuery, TError, TData>
) =>
	useQuery<GetPresenterRecordingsFeedDataQuery, TError, TData>(
		['getPresenterRecordingsFeedData', variables],
		graphqlFetcher<
			GetPresenterRecordingsFeedDataQuery,
			GetPresenterRecordingsFeedDataQueryVariables
		>(GetPresenterRecordingsFeedDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getPresenterRecordingsPageData<T>(
	variables: ExactAlt<T, GetPresenterRecordingsPageDataQueryVariables>
): Promise<GetPresenterRecordingsPageDataQuery> {
	return fetchApi(GetPresenterRecordingsPageDataDocument, { variables });
}

export async function getPresenterRecordingsFeedData<T>(
	variables: ExactAlt<T, GetPresenterRecordingsFeedDataQueryVariables>
): Promise<GetPresenterRecordingsFeedDataQuery> {
	return fetchApi(GetPresenterRecordingsFeedDataDocument, { variables });
}
