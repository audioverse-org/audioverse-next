import * as Types from '../../../lib/generated/graphql';

import { CardRecordingFragmentDoc } from '../../../components/molecules/card/recording.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetLibraryPlaylistPageDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetLibraryPlaylistPageDataQuery = {
	__typename?: 'Query';
	me:
		| {
				__typename?: 'AuthenticatedUser';
				user: {
					__typename?: 'User';
					playlist:
						| {
								__typename?: 'UserPlaylist';
								title: string;
								createdAt: string;
								summary: string;
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
													imageWithFallback: {
														__typename?: 'Image';
														url: string;
													};
												}>;
												persons: Array<{
													__typename?: 'Person';
													name: string;
													canonicalPath: string;
													imageWithFallback: {
														__typename?: 'Image';
														url: string;
													};
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
						  }
						| null
						| undefined;
				};
		  }
		| null
		| undefined;
};

export const GetLibraryPlaylistPageDataDocument = `
    query getLibraryPlaylistPageData($id: ID!) {
  me {
    user {
      playlist(id: $id) {
        title
        createdAt
        summary
        recordings(offset: 0, first: 1500) {
          nodes {
            ...cardRecording
          }
          aggregate {
            count
          }
        }
      }
    }
  }
}
    ${CardRecordingFragmentDoc}`;
export const useGetLibraryPlaylistPageDataQuery = <
	TData = GetLibraryPlaylistPageDataQuery,
	TError = unknown
>(
	variables: GetLibraryPlaylistPageDataQueryVariables,
	options?: UseQueryOptions<GetLibraryPlaylistPageDataQuery, TError, TData>
) =>
	useQuery<GetLibraryPlaylistPageDataQuery, TError, TData>(
		['getLibraryPlaylistPageData', variables],
		graphqlFetcher<
			GetLibraryPlaylistPageDataQuery,
			GetLibraryPlaylistPageDataQueryVariables
		>(GetLibraryPlaylistPageDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getLibraryPlaylistPageData<T>(
	variables: ExactAlt<T, GetLibraryPlaylistPageDataQueryVariables>
): Promise<GetLibraryPlaylistPageDataQuery> {
	return fetchApi(GetLibraryPlaylistPageDataDocument, { variables });
}
