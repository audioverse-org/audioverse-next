import * as Types from '../../lib/generated/graphql';

import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.generated';
import { CardRecordingSequenceHatFragmentDoc } from '../../components/molecules/card/recordingSequenceHat.generated';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.generated';
import { TeaseRecordingFragmentDoc } from '../../components/molecules/teaseRecording.generated';
import { AndMiniplayerFragmentDoc } from '../../components/templates/andMiniplayer.generated';
import { GenerateFeedFragmentDoc } from '../../lib/generateFeed.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetSermonListPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
	hasVideo: Types.InputMaybe<Types.Scalars['Boolean']>;
	first: Types.InputMaybe<Types.Scalars['Int']>;
	offset: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetSermonListPageDataQuery = {
	__typename?: 'Query';
	sermons: {
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
								image: { __typename?: 'Image'; url: string } | null | undefined;
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
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
	};
};

export type GetSermonListFeedDataQueryVariables = Types.Exact<{
	language: Types.Language;
}>;

export type GetSermonListFeedDataQuery = {
	__typename?: 'Query';
	sermons: {
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
					sponsor: { __typename?: 'Sponsor'; title: string } | null | undefined;
			  }>
			| null
			| undefined;
	};
};

export type GetSermonListPagePathsDataQueryVariables = Types.Exact<{
	language: Types.Language;
	hasVideo: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;

export type GetSermonListPagePathsDataQuery = {
	__typename?: 'Query';
	sermons: {
		__typename?: 'RecordingConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
	};
};

export const GetSermonListPageDataDocument = `
    query getSermonListPageData($language: Language!, $hasVideo: Boolean, $first: Int, $offset: Int) {
  sermons(
    language: $language
    hasVideo: $hasVideo
    first: $first
    offset: $offset
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
    ${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetSermonListPageDataQuery = <
	TData = GetSermonListPageDataQuery,
	TError = unknown
>(
	variables: GetSermonListPageDataQueryVariables,
	options?: UseQueryOptions<GetSermonListPageDataQuery, TError, TData>
) =>
	useQuery<GetSermonListPageDataQuery, TError, TData>(
		['getSermonListPageData', variables],
		graphqlFetcher<
			GetSermonListPageDataQuery,
			GetSermonListPageDataQueryVariables
		>(GetSermonListPageDataDocument, variables),
		options
	);
export const GetSermonListFeedDataDocument = `
    query getSermonListFeedData($language: Language!) {
  sermons(
    language: $language
    first: 25
    orderBy: [{field: PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...generateFeed
    }
  }
}
    ${GenerateFeedFragmentDoc}`;
export const useGetSermonListFeedDataQuery = <
	TData = GetSermonListFeedDataQuery,
	TError = unknown
>(
	variables: GetSermonListFeedDataQueryVariables,
	options?: UseQueryOptions<GetSermonListFeedDataQuery, TError, TData>
) =>
	useQuery<GetSermonListFeedDataQuery, TError, TData>(
		['getSermonListFeedData', variables],
		graphqlFetcher<
			GetSermonListFeedDataQuery,
			GetSermonListFeedDataQueryVariables
		>(GetSermonListFeedDataDocument, variables),
		options
	);
export const GetSermonListPagePathsDataDocument = `
    query getSermonListPagePathsData($language: Language!, $hasVideo: Boolean) {
  sermons(language: $language, hasVideo: $hasVideo) {
    aggregate {
      count
    }
  }
}
    `;
export const useGetSermonListPagePathsDataQuery = <
	TData = GetSermonListPagePathsDataQuery,
	TError = unknown
>(
	variables: GetSermonListPagePathsDataQueryVariables,
	options?: UseQueryOptions<GetSermonListPagePathsDataQuery, TError, TData>
) =>
	useQuery<GetSermonListPagePathsDataQuery, TError, TData>(
		['getSermonListPagePathsData', variables],
		graphqlFetcher<
			GetSermonListPagePathsDataQuery,
			GetSermonListPagePathsDataQueryVariables
		>(GetSermonListPagePathsDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export const GetSermonListPageDataDocument = `query getSermonListPageData($language:Language!$hasVideo:Boolean$first:Int$offset:Int){sermons(language:$language hasVideo:$hasVideo first:$first offset:$offset orderBy:[{field:PUBLISHED_AT direction:DESC}]){nodes{...cardRecording}aggregate{count}}}`;
export async function getSermonListPageData<T>(
	variables: ExactAlt<T, GetSermonListPageDataQueryVariables>
): Promise<GetSermonListPageDataQuery> {
	return fetchApi(GetSermonListPageDataDocument, { variables });
}

export const GetSermonListFeedDataDocument = `query getSermonListFeedData($language:Language!){sermons(language:$language first:25 orderBy:[{field:PUBLISHED_AT direction:DESC}]){nodes{...generateFeed}}}`;
export async function getSermonListFeedData<T>(
	variables: ExactAlt<T, GetSermonListFeedDataQueryVariables>
): Promise<GetSermonListFeedDataQuery> {
	return fetchApi(GetSermonListFeedDataDocument, { variables });
}

export const GetSermonListPagePathsDataDocument = `query getSermonListPagePathsData($language:Language!$hasVideo:Boolean){sermons(language:$language hasVideo:$hasVideo){aggregate{count}}}`;
export async function getSermonListPagePathsData<T>(
	variables: ExactAlt<T, GetSermonListPagePathsDataQueryVariables>
): Promise<GetSermonListPagePathsDataQuery> {
	return fetchApi(GetSermonListPagePathsDataDocument, { variables });
}
