import * as Types from '../../../lib/generated/graphql';

import { CardSequenceFragmentDoc } from '../../../components/molecules/card/sequence.generated';
import { PersonLockupFragmentDoc } from '../../../components/molecules/personLockup.generated';
import { CardRecordingFragmentDoc } from '../../../components/molecules/card/recording.generated';
import { CardRecordingSequenceHatFragmentDoc } from '../../../components/molecules/card/recordingSequenceHat.generated';
import { TeaseRecordingFragmentDoc } from '../../../components/molecules/teaseRecording.generated';
import { AndMiniplayerFragmentDoc } from '../../../components/templates/andMiniplayer.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetSongAlbumsListPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
}>;

export type GetSongAlbumsListPageDataQuery = {
	__typename?: 'Query';
	musicAlbums: {
		__typename?: 'SequenceConnection';
		nodes:
			| Array<{
					__typename?: 'Sequence';
					id: string | number;
					title: string;
					canonicalPath: string;
					contentType: Types.SequenceContentType;
					duration: number;
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
					speakers: {
						__typename?: 'PersonConnection';
						nodes:
							| Array<{
									__typename?: 'Person';
									name: string;
									canonicalPath: string;
									imageWithFallback: { __typename?: 'Image'; url: string };
							  }>
							| null
							| undefined;
					};
					sequenceWriters: {
						__typename?: 'PersonConnection';
						nodes:
							| Array<{
									__typename?: 'Person';
									name: string;
									canonicalPath: string;
									imageWithFallback: { __typename?: 'Image'; url: string };
							  }>
							| null
							| undefined;
					};
					allRecordings: {
						__typename?: 'RecordingConnection';
						aggregate:
							| { __typename?: 'Aggregate'; count: number }
							| null
							| undefined;
					};
			  }>
			| null
			| undefined;
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
	};
	musicBookTags: {
		__typename?: 'TagConnection';
		nodes:
			| Array<{
					__typename?: 'Tag';
					id: string | number;
					name: string;
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
			  }>
			| null
			| undefined;
	};
};

export const GetSongAlbumsListPageDataDocument = `
    query getSongAlbumsListPageData($language: Language!) {
  musicAlbums(
    language: $language
    first: 1000
    orderBy: [{field: TITLE, direction: ASC}]
  ) {
    nodes {
      ...cardSequence
      recordings(first: 2) {
        nodes {
          ...cardRecording
        }
      }
    }
    aggregate {
      count
    }
  }
  musicBookTags(language: $language, first: 1000) {
    nodes {
      id
      name
      recordings(first: 1, orderBy: [{field: PUBLISHED_AT, direction: DESC}]) {
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
    ${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}
${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetSongAlbumsListPageDataQuery = <
	TData = GetSongAlbumsListPageDataQuery,
	TError = unknown
>(
	variables: GetSongAlbumsListPageDataQueryVariables,
	options?: UseQueryOptions<GetSongAlbumsListPageDataQuery, TError, TData>
) =>
	useQuery<GetSongAlbumsListPageDataQuery, TError, TData>(
		['getSongAlbumsListPageData', variables],
		graphqlFetcher<
			GetSongAlbumsListPageDataQuery,
			GetSongAlbumsListPageDataQueryVariables
		>(GetSongAlbumsListPageDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export const GetSongAlbumsListPageDataDocument = `query getSongAlbumsListPageData($language:Language!){musicAlbums(language:$language first:1000 orderBy:[{field:TITLE direction:ASC}]){nodes{...cardSequence recordings(first:2){nodes{...cardRecording}}}aggregate{count}}musicBookTags(language:$language first:1000){nodes{id name recordings(first:1 orderBy:[{field:PUBLISHED_AT direction:DESC}]){nodes{...cardRecording}aggregate{count}}}}}`;
export async function getSongAlbumsListPageData<T>(
	variables: ExactAlt<T, GetSongAlbumsListPageDataQueryVariables>
): Promise<GetSongAlbumsListPageDataQuery> {
	return fetchApi(GetSongAlbumsListPageDataDocument, { variables });
}
