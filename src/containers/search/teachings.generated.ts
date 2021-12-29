import * as Types from '../../lib/generated/graphql';

import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetSearchResultsRecordingsQueryVariables = Types.Exact<{
	language: Types.Language;
	term: Types.Scalars['String'];
	first: Types.Scalars['Int'];
	offset: Types.Scalars['Int'];
}>;

export type GetSearchResultsRecordingsQuery = {
	__typename?: 'Query';
	recordings: {
		__typename?: 'RecordingConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
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

export const GetSearchResultsRecordingsDocument = `
    query getSearchResultsRecordings($language: Language!, $term: String!, $first: Int!, $offset: Int!) {
  recordings(language: $language, search: $term, first: $first, offset: $offset) {
    aggregate {
      count
    }
    nodes {
      ...cardRecording
    }
  }
}
    ${CardRecordingFragmentDoc}`;
export const useGetSearchResultsRecordingsQuery = <
	TData = GetSearchResultsRecordingsQuery,
	TError = unknown
>(
	variables: GetSearchResultsRecordingsQueryVariables,
	options?: UseQueryOptions<GetSearchResultsRecordingsQuery, TError, TData>
) =>
	useQuery<GetSearchResultsRecordingsQuery, TError, TData>(
		['getSearchResultsRecordings', variables],
		graphqlFetcher<
			GetSearchResultsRecordingsQuery,
			GetSearchResultsRecordingsQueryVariables
		>(GetSearchResultsRecordingsDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getSearchResultsRecordings<T>(
	variables: ExactAlt<T, GetSearchResultsRecordingsQueryVariables>
): Promise<GetSearchResultsRecordingsQuery> {
	return fetchApi(GetSearchResultsRecordingsDocument, { variables });
}
