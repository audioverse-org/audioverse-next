import * as Types from '../../lib/generated/graphql';

import { PresenterPivotFragmentDoc } from './pivot.generated';
import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.generated';
import { GenerateFeedFragmentDoc } from '../../lib/generateFeed.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetPresenterRecordingsPageDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
	offset: Types.InputMaybe<Types.Scalars['Int']>;
	first: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetPresenterRecordingsPageDataQuery = {
	__typename?: 'Query';
	person:
		| {
				__typename?: 'Person';
				id: string | number;
				name: string;
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
					aggregate:
						| { __typename?: 'Aggregate'; count: number }
						| null
						| undefined;
				};
				imageWithFallback: { __typename?: 'Image'; url: string };
		  }
		| null
		| undefined;
};

export type GetPresenterRecordingsFeedDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetPresenterRecordingsFeedDataQuery = {
	__typename?: 'Query';
	person:
		| {
				__typename?: 'Person';
				id: string | number;
				name: string;
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
${CardRecordingFragmentDoc}`;
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
