import * as Types from '../../lib/generated/graphql';

import { CardRecordingFragmentDoc } from '../molecules/card/recording.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetNotFoundPageDataQueryVariables = Types.Exact<{
	[key: string]: never;
}>;

export type GetNotFoundPageDataQuery = {
	__typename?: 'Query';
	websiteRecentRecordings: {
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
	};
};

export const GetNotFoundPageDataDocument = `
    query getNotFoundPageData {
  websiteRecentRecordings(language: ENGLISH, first: 3) {
    nodes {
      ...cardRecording
    }
  }
}
    ${CardRecordingFragmentDoc}`;
export const useGetNotFoundPageDataQuery = <
	TData = GetNotFoundPageDataQuery,
	TError = unknown
>(
	variables?: GetNotFoundPageDataQueryVariables,
	options?: UseQueryOptions<GetNotFoundPageDataQuery, TError, TData>
) =>
	useQuery<GetNotFoundPageDataQuery, TError, TData>(
		['getNotFoundPageData', variables],
		graphqlFetcher<GetNotFoundPageDataQuery, GetNotFoundPageDataQueryVariables>(
			GetNotFoundPageDataDocument,
			variables
		),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getNotFoundPageData<T>(
	variables: ExactAlt<T, GetNotFoundPageDataQueryVariables>
): Promise<GetNotFoundPageDataQuery> {
	return fetchApi(GetNotFoundPageDataDocument, { variables });
}
