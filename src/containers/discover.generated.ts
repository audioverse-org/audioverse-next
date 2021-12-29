import * as Types from '../lib/generated/graphql';

import { CardRecordingFragmentDoc } from '../components/molecules/card/recording.generated';
import { CardRecordingSequenceHatFragmentDoc } from '../components/molecules/card/recordingSequenceHat.generated';
import { PersonLockupFragmentDoc } from '../components/molecules/personLockup.generated';
import { TeaseRecordingFragmentDoc } from '../components/molecules/teaseRecording.generated';
import { AndMiniplayerFragmentDoc } from '../components/templates/andMiniplayer.generated';
import { CardSequenceFragmentDoc } from '../components/molecules/card/sequence.generated';
import { CardCollectionFragmentDoc } from '../components/molecules/card/collection.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetDiscoverPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
}>;

export type GetDiscoverPageDataQuery = {
	__typename?: 'Query';
	recentTeachings: {
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
	trendingTeachings: {
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
	storySeasons: {
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
	};
	conferences: {
		__typename?: 'CollectionConnection';
		nodes:
			| Array<{
					__typename?: 'Collection';
					id: string | number;
					canonicalPath: string;
					title: string;
					startDate: string | null | undefined;
					endDate: string | null | undefined;
					duration: number;
					collectionContentType: Types.CollectionContentType;
					sequences: {
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
									speakers: {
										__typename?: 'PersonConnection';
										nodes:
											| Array<{
													__typename?: 'Person';
													name: string;
													canonicalPath: string;
													imageWithFallback: {
														__typename?: 'Image';
														url: string;
													};
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
													imageWithFallback: {
														__typename?: 'Image';
														url: string;
													};
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
					};
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
					image:
						| { __typename?: 'Image'; id: string | number; url: string }
						| null
						| undefined;
					allSequences: {
						__typename?: 'SequenceConnection';
						aggregate:
							| { __typename?: 'Aggregate'; count: number }
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
	};
};

export const GetDiscoverPageDataDocument = `
    query getDiscoverPageData($language: Language!) {
  recentTeachings: sermons(
    language: $language
    first: 6
    orderBy: {field: PUBLISHED_AT, direction: DESC}
  ) {
    nodes {
      ...cardRecording
    }
  }
  trendingTeachings: popularRecordings(language: $language, first: 6) {
    nodes {
      recording {
        ...cardRecording
      }
    }
  }
  storySeasons(
    language: $language
    first: 3
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardSequence
      recordings(first: 2) {
        nodes {
          ...cardRecording
        }
      }
    }
  }
  conferences(
    language: $language
    first: 3
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardCollection
      sequences(first: 2, orderBy: [{field: RECORDING_COUNT, direction: DESC}]) {
        nodes {
          ...cardSequence
        }
      }
      recordings(
        first: 2
        sequenceId: 0
        orderBy: [{field: PUBLISHED_AT, direction: DESC}]
      ) {
        nodes {
          ...cardRecording
        }
      }
    }
  }
}
    ${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}
${CardSequenceFragmentDoc}
${CardCollectionFragmentDoc}`;
export const useGetDiscoverPageDataQuery = <
	TData = GetDiscoverPageDataQuery,
	TError = unknown
>(
	variables: GetDiscoverPageDataQueryVariables,
	options?: UseQueryOptions<GetDiscoverPageDataQuery, TError, TData>
) =>
	useQuery<GetDiscoverPageDataQuery, TError, TData>(
		['getDiscoverPageData', variables],
		graphqlFetcher<GetDiscoverPageDataQuery, GetDiscoverPageDataQueryVariables>(
			GetDiscoverPageDataDocument,
			variables
		),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export const GetDiscoverPageDataDocument = `query getDiscoverPageData($language:Language!){recentTeachings:sermons(language:$language first:6 orderBy:{field:PUBLISHED_AT direction:DESC}){nodes{...cardRecording}}trendingTeachings:popularRecordings(language:$language first:6){nodes{recording{...cardRecording}}}storySeasons(language:$language first:3 orderBy:[{field:RECORDING_PUBLISHED_AT direction:DESC}]){nodes{...cardSequence recordings(first:2){nodes{...cardRecording}}}}conferences(language:$language first:3 orderBy:[{field:RECORDING_PUBLISHED_AT direction:DESC}]){nodes{...cardCollection sequences(first:2 orderBy:[{field:RECORDING_COUNT direction:DESC}]){nodes{...cardSequence}}recordings(first:2 sequenceId:0 orderBy:[{field:PUBLISHED_AT direction:DESC}]){nodes{...cardRecording}}}}}`;
export async function getDiscoverPageData<T>(
	variables: ExactAlt<T, GetDiscoverPageDataQueryVariables>
): Promise<GetDiscoverPageDataQuery> {
	return fetchApi(GetDiscoverPageDataDocument, { variables });
}
