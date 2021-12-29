import * as Types from '../../lib/generated/graphql';

import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.generated';
import { CardSequenceFragmentDoc } from '../../components/molecules/card/sequence.generated';
import { CardCollectionFragmentDoc } from '../../components/molecules/card/collection.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetPresenterDetailPageDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
	language: Types.Language;
}>;

export type GetPresenterDetailPageDataQuery = {
	__typename?: 'Query';
	person:
		| {
				__typename?: 'Person';
				id: string | number;
				name: string;
				description: string;
				canonicalUrl: string;
				language: Types.Language;
				shareUrl: string;
				website: string | null | undefined;
				imageWithFallback: { __typename?: 'Image'; url: string };
				sermons: {
					__typename?: 'RecordingConnection';
					aggregate:
						| { __typename?: 'Aggregate'; count: number }
						| null
						| undefined;
				};
				audiobookTracks: {
					__typename?: 'RecordingConnection';
					aggregate:
						| { __typename?: 'Aggregate'; count: number }
						| null
						| undefined;
				};
				musicTracks: {
					__typename?: 'RecordingConnection';
					aggregate:
						| { __typename?: 'Aggregate'; count: number }
						| null
						| undefined;
				};
				stories: {
					__typename?: 'RecordingConnection';
					aggregate:
						| { __typename?: 'Aggregate'; count: number }
						| null
						| undefined;
				};
				essentialRecordings: {
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
				recentRecordings: {
					__typename?: 'RecordingConnection';
					aggregate:
						| { __typename?: 'Aggregate'; count: number }
						| null
						| undefined;
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
					pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean };
				};
				topRecordings: {
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
					pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean };
				};
		  }
		| null
		| undefined;
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
		pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean };
	};
	collections: {
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
		pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean };
	};
};

export type GetPresenterDetailPathsDataQueryVariables = Types.Exact<{
	language: Types.Language;
	first: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetPresenterDetailPathsDataQuery = {
	__typename?: 'Query';
	persons: {
		__typename?: 'PersonConnection';
		nodes:
			| Array<{
					__typename?: 'Person';
					id: string | number;
					canonicalPath: string;
			  }>
			| null
			| undefined;
	};
};

export const GetPresenterDetailPageDataDocument = `
    query getPresenterDetailPageData($id: ID!, $language: Language!) {
  person(id: $id) {
    id
    name
    description
    canonicalUrl(useFuturePath: true)
    language
    shareUrl
    imageWithFallback {
      url(size: 128)
    }
    website
    sermons: recordings(contentType: SERMON) {
      aggregate {
        count
      }
    }
    audiobookTracks: recordings(contentType: AUDIOBOOK_TRACK) {
      aggregate {
        count
      }
    }
    musicTracks: recordings(contentType: MUSIC_TRACK) {
      aggregate {
        count
      }
    }
    stories: recordings(contentType: STORY) {
      aggregate {
        count
      }
    }
    essentialRecordings: recordings(
      first: 3
      isFeatured: true
      orderBy: [{field: DOWNLOADS_ALL_TIME, direction: DESC}]
    ) {
      nodes {
        ...cardRecording
      }
    }
    recentRecordings: recordings(
      first: 3
      orderBy: [{field: PUBLISHED_AT, direction: DESC}]
    ) {
      aggregate {
        count
      }
      nodes {
        ...cardRecording
      }
      pageInfo {
        hasNextPage
      }
    }
    topRecordings: recordings(
      first: 3
      orderBy: [{field: DOWNLOADS_ALL_TIME, direction: DESC}]
    ) {
      nodes {
        ...cardRecording
      }
      pageInfo {
        hasNextPage
      }
    }
  }
  sequences(
    language: $language
    persons: [{personId: $id}]
    first: 3
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardSequence
    }
    pageInfo {
      hasNextPage
    }
  }
  collections(
    language: $language
    persons: [{personId: $id}]
    first: 3
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardCollection
      sequences(persons: [{personId: $id}], orderBy: [{field: TITLE, direction: ASC}]) {
        nodes {
          ...cardSequence
        }
      }
    }
    pageInfo {
      hasNextPage
    }
  }
}
    ${CardRecordingFragmentDoc}
${CardSequenceFragmentDoc}
${CardCollectionFragmentDoc}`;
export const useGetPresenterDetailPageDataQuery = <
	TData = GetPresenterDetailPageDataQuery,
	TError = unknown
>(
	variables: GetPresenterDetailPageDataQueryVariables,
	options?: UseQueryOptions<GetPresenterDetailPageDataQuery, TError, TData>
) =>
	useQuery<GetPresenterDetailPageDataQuery, TError, TData>(
		['getPresenterDetailPageData', variables],
		graphqlFetcher<
			GetPresenterDetailPageDataQuery,
			GetPresenterDetailPageDataQueryVariables
		>(GetPresenterDetailPageDataDocument, variables),
		options
	);
export const GetPresenterDetailPathsDataDocument = `
    query getPresenterDetailPathsData($language: Language!, $first: Int) {
  persons(language: $language, first: $first) {
    nodes {
      id
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetPresenterDetailPathsDataQuery = <
	TData = GetPresenterDetailPathsDataQuery,
	TError = unknown
>(
	variables: GetPresenterDetailPathsDataQueryVariables,
	options?: UseQueryOptions<GetPresenterDetailPathsDataQuery, TError, TData>
) =>
	useQuery<GetPresenterDetailPathsDataQuery, TError, TData>(
		['getPresenterDetailPathsData', variables],
		graphqlFetcher<
			GetPresenterDetailPathsDataQuery,
			GetPresenterDetailPathsDataQueryVariables
		>(GetPresenterDetailPathsDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getPresenterDetailPageData<T>(
	variables: ExactAlt<T, GetPresenterDetailPageDataQueryVariables>
): Promise<GetPresenterDetailPageDataQuery> {
	return fetchApi(GetPresenterDetailPageDataDocument, { variables });
}

export async function getPresenterDetailPathsData<T>(
	variables: ExactAlt<T, GetPresenterDetailPathsDataQueryVariables>
): Promise<GetPresenterDetailPathsDataQuery> {
	return fetchApi(GetPresenterDetailPathsDataDocument, { variables });
}
