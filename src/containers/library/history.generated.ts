import * as Types from '../../lib/generated/graphql';

import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetLibraryHistoryPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
	first: Types.Scalars['Int'];
	offset: Types.Scalars['Int'];
}>;

export type GetLibraryHistoryPageDataQuery = {
	__typename?: 'Query';
	me:
		| {
				__typename?: 'AuthenticatedUser';
				user: {
					__typename?: 'User';
					downloadHistory: {
						__typename?: 'UserDownloadHistoryConnection';
						aggregate:
							| { __typename?: 'Aggregate'; count: number }
							| null
							| undefined;
						nodes:
							| Array<{
									__typename?: 'UserDownloadHistory';
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
						pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean };
					};
				};
		  }
		| null
		| undefined;
};

export const GetLibraryHistoryPageDataDocument = `
    query getLibraryHistoryPageData($language: Language!, $first: Int!, $offset: Int!) {
  me {
    user {
      downloadHistory(
        language: $language
        first: $first
        offset: $offset
        orderBy: [{field: CREATED_AT, direction: DESC}]
      ) {
        aggregate {
          count
        }
        nodes {
          recording {
            ...cardRecording
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
}
    ${CardRecordingFragmentDoc}`;
export const useGetLibraryHistoryPageDataQuery = <
	TData = GetLibraryHistoryPageDataQuery,
	TError = unknown
>(
	variables: GetLibraryHistoryPageDataQueryVariables,
	options?: UseQueryOptions<GetLibraryHistoryPageDataQuery, TError, TData>
) =>
	useQuery<GetLibraryHistoryPageDataQuery, TError, TData>(
		['getLibraryHistoryPageData', variables],
		graphqlFetcher<
			GetLibraryHistoryPageDataQuery,
			GetLibraryHistoryPageDataQueryVariables
		>(GetLibraryHistoryPageDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getLibraryHistoryPageData<T>(
	variables: ExactAlt<T, GetLibraryHistoryPageDataQueryVariables>
): Promise<GetLibraryHistoryPageDataQuery> {
	return fetchApi(GetLibraryHistoryPageDataDocument, { variables });
}
