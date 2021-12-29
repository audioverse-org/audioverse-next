import * as Types from '../../lib/generated/graphql';

import { SponsorLockupFragmentDoc } from '../../components/molecules/sponsorLockup.generated';
import { CardPersonFragmentDoc } from '../../components/molecules/card/person.generated';
import { CardSequenceFragmentDoc } from '../../components/molecules/card/sequence.generated';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.generated';
import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.generated';
import { CardRecordingSequenceHatFragmentDoc } from '../../components/molecules/card/recordingSequenceHat.generated';
import { TeaseRecordingFragmentDoc } from '../../components/molecules/teaseRecording.generated';
import { AndMiniplayerFragmentDoc } from '../../components/templates/andMiniplayer.generated';
import { GenerateFeedFragmentDoc } from '../../lib/generateFeed.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetCollectionDetailPageDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetCollectionDetailPageDataQuery = {
	__typename?: 'Query';
	collection:
		| {
				__typename?: 'Collection';
				id: string | number;
				title: string;
				contentType: Types.CollectionContentType;
				startDate: string | null | undefined;
				endDate: string | null | undefined;
				duration: number;
				description: string;
				canonicalUrl: string;
				language: Types.Language;
				shareUrl: string;
				location: string | null | undefined;
				image: { __typename?: 'Image'; url: string } | null | undefined;
				sponsor:
					| {
							__typename?: 'Sponsor';
							id: string | number;
							title: string;
							canonicalPath: string;
							imageWithFallback: { __typename?: 'Image'; url: string };
					  }
					| null
					| undefined;
				persons: {
					__typename?: 'PersonConnection';
					aggregate:
						| { __typename?: 'Aggregate'; count: number }
						| null
						| undefined;
					nodes:
						| Array<{
								__typename?: 'Person';
								id: string | number;
								name: string;
								canonicalPath: string;
								image:
									| { __typename?: 'Image'; id: string | number; url: string }
									| null
									| undefined;
								recordings: {
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
				sequences: {
					__typename?: 'SequenceConnection';
					aggregate:
						| { __typename?: 'Aggregate'; count: number }
						| null
						| undefined;
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
					pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean };
				};
				recordings: {
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
		  }
		| null
		| undefined;
};

export type GetCollectionFeedDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetCollectionFeedDataQuery = {
	__typename?: 'Query';
	collection:
		| {
				__typename?: 'Collection';
				title: string;
				canonicalUrl: string;
				language: Types.Language;
				image: { __typename?: 'Image'; url: string } | null | undefined;
				recordings: {
					__typename?: 'RecordingConnection';
					aggregate:
						| { __typename?: 'Aggregate'; count: number }
						| null
						| undefined;
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
								sponsor:
									| { __typename?: 'Sponsor'; title: string }
									| null
									| undefined;
						  }>
						| null
						| undefined;
				};
		  }
		| null
		| undefined;
};

export type GetCollectionDetailPathsDataQueryVariables = Types.Exact<{
	language: Types.Language;
	first: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetCollectionDetailPathsDataQuery = {
	__typename?: 'Query';
	collections: {
		__typename?: 'CollectionConnection';
		nodes:
			| Array<{
					__typename?: 'Collection';
					id: string | number;
					canonicalPath: string;
			  }>
			| null
			| undefined;
	};
};

export const GetCollectionDetailPageDataDocument = `
    query getCollectionDetailPageData($id: ID!) {
  collection(id: $id) {
    id
    title
    contentType
    startDate
    endDate
    duration
    description
    canonicalUrl(useFuturePath: true)
    language
    shareUrl
    location
    image {
      url(size: 1000, cropMode: MAX_SIZE)
    }
    sponsor {
      id
      title
      canonicalPath(useFuturePath: true)
      ...sponsorLockup
    }
    persons(
      first: 3
      role: SPEAKER
      orderBy: [{field: RECORDING_COUNT, direction: DESC}, {field: RECORDING_DOWNLOADS_ALL_TIME, direction: DESC}]
    ) {
      aggregate {
        count
      }
      nodes {
        ...cardPerson
      }
      pageInfo {
        hasNextPage
      }
    }
    sequences(first: 3, orderBy: [{field: RECORDING_COUNT, direction: DESC}]) {
      aggregate {
        count
      }
      nodes {
        ...cardSequence
      }
      pageInfo {
        hasNextPage
      }
    }
    recordings(
      first: 3
      sequenceId: 0
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
  }
}
    ${SponsorLockupFragmentDoc}
${CardPersonFragmentDoc}
${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}
${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetCollectionDetailPageDataQuery = <
	TData = GetCollectionDetailPageDataQuery,
	TError = unknown
>(
	variables: GetCollectionDetailPageDataQueryVariables,
	options?: UseQueryOptions<GetCollectionDetailPageDataQuery, TError, TData>
) =>
	useQuery<GetCollectionDetailPageDataQuery, TError, TData>(
		['getCollectionDetailPageData', variables],
		graphqlFetcher<
			GetCollectionDetailPageDataQuery,
			GetCollectionDetailPageDataQueryVariables
		>(GetCollectionDetailPageDataDocument, variables),
		options
	);
export const GetCollectionFeedDataDocument = `
    query getCollectionFeedData($id: ID!) {
  collection(id: $id) {
    title
    canonicalUrl(useFuturePath: true)
    language
    image {
      url(size: 600)
    }
    recordings(first: 25, orderBy: [{field: RECORDED_AT, direction: ASC}]) {
      aggregate {
        count
      }
      nodes {
        ...generateFeed
      }
    }
  }
}
    ${GenerateFeedFragmentDoc}`;
export const useGetCollectionFeedDataQuery = <
	TData = GetCollectionFeedDataQuery,
	TError = unknown
>(
	variables: GetCollectionFeedDataQueryVariables,
	options?: UseQueryOptions<GetCollectionFeedDataQuery, TError, TData>
) =>
	useQuery<GetCollectionFeedDataQuery, TError, TData>(
		['getCollectionFeedData', variables],
		graphqlFetcher<
			GetCollectionFeedDataQuery,
			GetCollectionFeedDataQueryVariables
		>(GetCollectionFeedDataDocument, variables),
		options
	);
export const GetCollectionDetailPathsDataDocument = `
    query getCollectionDetailPathsData($language: Language!, $first: Int) {
  collections(language: $language, first: $first) {
    nodes {
      id
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetCollectionDetailPathsDataQuery = <
	TData = GetCollectionDetailPathsDataQuery,
	TError = unknown
>(
	variables: GetCollectionDetailPathsDataQueryVariables,
	options?: UseQueryOptions<GetCollectionDetailPathsDataQuery, TError, TData>
) =>
	useQuery<GetCollectionDetailPathsDataQuery, TError, TData>(
		['getCollectionDetailPathsData', variables],
		graphqlFetcher<
			GetCollectionDetailPathsDataQuery,
			GetCollectionDetailPathsDataQueryVariables
		>(GetCollectionDetailPathsDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export const GetCollectionDetailPageDataDocument = `query getCollectionDetailPageData($id:ID!){collection(id:$id){id title contentType startDate endDate duration description canonicalUrl(useFuturePath:true)language shareUrl location image{url(size:1000 cropMode:MAX_SIZE)}sponsor{id title canonicalPath(useFuturePath:true)...sponsorLockup}persons(first:3 role:SPEAKER orderBy:[{field:RECORDING_COUNT direction:DESC}{field:RECORDING_DOWNLOADS_ALL_TIME direction:DESC}]){aggregate{count}nodes{...cardPerson}pageInfo{hasNextPage}}sequences(first:3 orderBy:[{field:RECORDING_COUNT direction:DESC}]){aggregate{count}nodes{...cardSequence}pageInfo{hasNextPage}}recordings(first:3 sequenceId:0 orderBy:[{field:PUBLISHED_AT direction:DESC}]){aggregate{count}nodes{...cardRecording}pageInfo{hasNextPage}}}}`;
export async function getCollectionDetailPageData<T>(
	variables: ExactAlt<T, GetCollectionDetailPageDataQueryVariables>
): Promise<GetCollectionDetailPageDataQuery> {
	return fetchApi(GetCollectionDetailPageDataDocument, { variables });
}

export const GetCollectionFeedDataDocument = `query getCollectionFeedData($id:ID!){collection(id:$id){title canonicalUrl(useFuturePath:true)language image{url(size:600)}recordings(first:25 orderBy:[{field:RECORDED_AT direction:ASC}]){aggregate{count}nodes{...generateFeed}}}}`;
export async function getCollectionFeedData<T>(
	variables: ExactAlt<T, GetCollectionFeedDataQueryVariables>
): Promise<GetCollectionFeedDataQuery> {
	return fetchApi(GetCollectionFeedDataDocument, { variables });
}

export const GetCollectionDetailPathsDataDocument = `query getCollectionDetailPathsData($language:Language!$first:Int){collections(language:$language first:$first){nodes{id canonicalPath(useFuturePath:true)}}}`;
export async function getCollectionDetailPathsData<T>(
	variables: ExactAlt<T, GetCollectionDetailPathsDataQueryVariables>
): Promise<GetCollectionDetailPathsDataQuery> {
	return fetchApi(GetCollectionDetailPathsDataDocument, { variables });
}
