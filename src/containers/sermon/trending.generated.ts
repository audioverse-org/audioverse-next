import * as Types from '../../lib/generated/graphql';

import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetTrendingTeachingsPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
}>;

export type GetTrendingTeachingsPageDataQuery = {
	__typename?: 'Query';
	recordings: {
		__typename?: 'PopularRecordingConnection';
		nodes:
			| Array<{
					__typename?: 'PopularRecording';
					recording: {
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
					};
			  }>
			| null
			| undefined;
	};
};

export const GetTrendingTeachingsPageDataDocument = `
    query getTrendingTeachingsPageData($language: Language!) {
  recordings: popularRecordings(language: $language, first: 24) {
    nodes {
      recording {
        ...cardRecording
      }
    }
  }
}
    ${CardRecordingFragmentDoc}`;
export const useGetTrendingTeachingsPageDataQuery = <
	TData = GetTrendingTeachingsPageDataQuery,
	TError = unknown
>(
	variables: GetTrendingTeachingsPageDataQueryVariables,
	options?: UseQueryOptions<GetTrendingTeachingsPageDataQuery, TError, TData>
) =>
	useQuery<GetTrendingTeachingsPageDataQuery, TError, TData>(
		['getTrendingTeachingsPageData', variables],
		graphqlFetcher<
			GetTrendingTeachingsPageDataQuery,
			GetTrendingTeachingsPageDataQueryVariables
		>(GetTrendingTeachingsPageDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getTrendingTeachingsPageData<T>(
	variables: ExactAlt<T, GetTrendingTeachingsPageDataQueryVariables>
): Promise<GetTrendingTeachingsPageDataQuery> {
	return fetchApi(GetTrendingTeachingsPageDataDocument, { variables });
}
