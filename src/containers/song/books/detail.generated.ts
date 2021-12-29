import * as Types from '../../../lib/generated/graphql';

import { CardRecordingFragmentDoc } from '../../../components/molecules/card/recording.generated';
import { CardRecordingSequenceHatFragmentDoc } from '../../../components/molecules/card/recordingSequenceHat.generated';
import { PersonLockupFragmentDoc } from '../../../components/molecules/personLockup.generated';
import { TeaseRecordingFragmentDoc } from '../../../components/molecules/teaseRecording.generated';
import { AndMiniplayerFragmentDoc } from '../../../components/templates/andMiniplayer.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetSongBooksDetailPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
	book: Types.Scalars['String'];
}>;

export type GetSongBooksDetailPageDataQuery = {
	__typename?: 'Query';
	musicTracks: {
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

export const GetSongBooksDetailPageDataDocument = `
    query getSongBooksDetailPageData($language: Language!, $book: String!) {
  musicTracks(
    language: $language
    tagName: $book
    first: 1000
    orderBy: [{field: PUBLISHED_AT, direction: ASC}]
  ) {
    nodes {
      ...cardRecording
    }
  }
}
    ${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetSongBooksDetailPageDataQuery = <
	TData = GetSongBooksDetailPageDataQuery,
	TError = unknown
>(
	variables: GetSongBooksDetailPageDataQueryVariables,
	options?: UseQueryOptions<GetSongBooksDetailPageDataQuery, TError, TData>
) =>
	useQuery<GetSongBooksDetailPageDataQuery, TError, TData>(
		['getSongBooksDetailPageData', variables],
		graphqlFetcher<
			GetSongBooksDetailPageDataQuery,
			GetSongBooksDetailPageDataQueryVariables
		>(GetSongBooksDetailPageDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export const GetSongBooksDetailPageDataDocument = `query getSongBooksDetailPageData($language:Language!$book:String!){musicTracks(language:$language tagName:$book first:1000 orderBy:[{field:PUBLISHED_AT direction:ASC}]){nodes{...cardRecording}}}`;
export async function getSongBooksDetailPageData<T>(
	variables: ExactAlt<T, GetSongBooksDetailPageDataQueryVariables>
): Promise<GetSongBooksDetailPageDataQuery> {
	return fetchApi(GetSongBooksDetailPageDataDocument, { variables });
}
