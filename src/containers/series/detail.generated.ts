import * as Types from '../../lib/generated/graphql';

import { SequenceFragmentDoc } from '../../components/organisms/sequence.generated';
import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.generated';
import { CardRecordingSequenceHatFragmentDoc } from '../../components/molecules/card/recordingSequenceHat.generated';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.generated';
import { TeaseRecordingFragmentDoc } from '../../components/molecules/teaseRecording.generated';
import { AndMiniplayerFragmentDoc } from '../../components/templates/andMiniplayer.generated';
import { GenerateFeedFragmentDoc } from '../../lib/generateFeed.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetSeriesDetailPageDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetSeriesDetailPageDataQuery = {
	__typename?: 'Query';
	series:
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

export type GetSeriesFeedDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetSeriesFeedDataQuery = {
	__typename?: 'Query';
	series:
		| {
				__typename?: 'Sequence';
				title: string;
				canonicalUrl: string;
				language: Types.Language;
				recordings: {
					__typename?: 'RecordingConnection';
					aggregate:
						| { __typename?: 'Aggregate'; count: number }
						| null
						| undefined;
					nodes:
						| Array<{
								__typename?: 'Recording';
								id: string | number;
								title: string;
								contentType: Types.RecordingContentType;
								description: string | null | undefined;
								publishDate: string | null | undefined;
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

export type GetSeriesDetailPathsDataQueryVariables = Types.Exact<{
	language: Types.Language;
	first: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetSeriesDetailPathsDataQuery = {
	__typename?: 'Query';
	serieses: {
		__typename?: 'SequenceConnection';
		nodes:
			| Array<{ __typename?: 'Sequence'; canonicalPath: string }>
			| null
			| undefined;
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

export const GetSeriesDetailPageDataDocument = `query getSeriesDetailPageData($id:ID!){series(id:$id){...sequence canonicalUrl(useFuturePath:true)language}}`;
export async function getSeriesDetailPageData<T>(
	variables: ExactAlt<T, GetSeriesDetailPageDataQueryVariables>
): Promise<GetSeriesDetailPageDataQuery> {
	return fetchApi(GetSeriesDetailPageDataDocument, { variables });
}

export const GetSeriesFeedDataDocument = `query getSeriesFeedData($id:ID!){series(id:$id){title canonicalUrl(useFuturePath:true)language recordings(first:25){aggregate{count}nodes{...generateFeed}}}}`;
export async function getSeriesFeedData<T>(
	variables: ExactAlt<T, GetSeriesFeedDataQueryVariables>
): Promise<GetSeriesFeedDataQuery> {
	return fetchApi(GetSeriesFeedDataDocument, { variables });
}

export const GetSeriesDetailPathsDataDocument = `query getSeriesDetailPathsData($language:Language!$first:Int){serieses(language:$language first:$first){nodes{canonicalPath(useFuturePath:true)}}}`;
export async function getSeriesDetailPathsData<T>(
	variables: ExactAlt<T, GetSeriesDetailPathsDataQueryVariables>
): Promise<GetSeriesDetailPathsDataQuery> {
	return fetchApi(GetSeriesDetailPathsDataDocument, { variables });
}
