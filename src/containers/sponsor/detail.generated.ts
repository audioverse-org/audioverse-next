import * as Types from '../../lib/generated/graphql';

import { CardCollectionFragmentDoc } from '../../components/molecules/card/collection.generated';
import { CardSequenceFragmentDoc } from '../../components/molecules/card/sequence.generated';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.generated';
import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.generated';
import { CardRecordingSequenceHatFragmentDoc } from '../../components/molecules/card/recordingSequenceHat.generated';
import { TeaseRecordingFragmentDoc } from '../../components/molecules/teaseRecording.generated';
import { AndMiniplayerFragmentDoc } from '../../components/templates/andMiniplayer.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetSponsorDetailPageDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetSponsorDetailPageDataQuery = {
	__typename?: 'Query';
	sponsor:
		| {
				__typename?: 'Sponsor';
				id: string | number;
				title: string;
				location: string | null | undefined;
				website: string | null | undefined;
				description: string;
				canonicalUrl: string;
				language: Types.Language;
				shareUrl: string;
				image: { __typename?: 'Image'; url: string } | null | undefined;
				collections: {
					__typename?: 'CollectionConnection';
					aggregate:
						| { __typename?: 'Aggregate'; count: number }
						| null
						| undefined;
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
				};
		  }
		| null
		| undefined;
};

export type GetSponsorDetailPathsDataQueryVariables = Types.Exact<{
	language: Types.Language;
	first: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetSponsorDetailPathsDataQuery = {
	__typename?: 'Query';
	sponsors: {
		__typename?: 'SponsorConnection';
		nodes:
			| Array<{ __typename?: 'Sponsor'; canonicalPath: string }>
			| null
			| undefined;
	};
};

export const GetSponsorDetailPageDataDocument = `
    query getSponsorDetailPageData($id: ID!) {
  sponsor(id: $id) {
    id
    title
    location
    website
    description
    canonicalUrl(useFuturePath: true)
    language
    shareUrl
    image {
      url(size: 128)
    }
    collections(
      first: 3
      contentType: null
      orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
    ) {
      aggregate {
        count
      }
      nodes {
        ...cardCollection
      }
    }
    sequences(
      first: 3
      contentType: null
      orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
    ) {
      aggregate {
        count
      }
      nodes {
        ...cardSequence
      }
    }
    recordings(
      first: 3
      collectionId: 0
      sequenceId: 0
      orderBy: [{field: PUBLISHED_AT, direction: DESC}]
    ) {
      aggregate {
        count
      }
      nodes {
        ...cardRecording
      }
    }
  }
}
    ${CardCollectionFragmentDoc}
${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}
${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetSponsorDetailPageDataQuery = <
	TData = GetSponsorDetailPageDataQuery,
	TError = unknown
>(
	variables: GetSponsorDetailPageDataQueryVariables,
	options?: UseQueryOptions<GetSponsorDetailPageDataQuery, TError, TData>
) =>
	useQuery<GetSponsorDetailPageDataQuery, TError, TData>(
		['getSponsorDetailPageData', variables],
		graphqlFetcher<
			GetSponsorDetailPageDataQuery,
			GetSponsorDetailPageDataQueryVariables
		>(GetSponsorDetailPageDataDocument, variables),
		options
	);
export const GetSponsorDetailPathsDataDocument = `
    query getSponsorDetailPathsData($language: Language!, $first: Int) {
  sponsors(language: $language, first: $first) {
    nodes {
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetSponsorDetailPathsDataQuery = <
	TData = GetSponsorDetailPathsDataQuery,
	TError = unknown
>(
	variables: GetSponsorDetailPathsDataQueryVariables,
	options?: UseQueryOptions<GetSponsorDetailPathsDataQuery, TError, TData>
) =>
	useQuery<GetSponsorDetailPathsDataQuery, TError, TData>(
		['getSponsorDetailPathsData', variables],
		graphqlFetcher<
			GetSponsorDetailPathsDataQuery,
			GetSponsorDetailPathsDataQueryVariables
		>(GetSponsorDetailPathsDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export const GetSponsorDetailPageDataDocument = `query getSponsorDetailPageData($id:ID!){sponsor(id:$id){id title location website description canonicalUrl(useFuturePath:true)language shareUrl image{url(size:128)}collections(first:3 contentType:null orderBy:[{field:RECORDING_PUBLISHED_AT direction:DESC}]){aggregate{count}nodes{...cardCollection}}sequences(first:3 contentType:null orderBy:[{field:RECORDING_PUBLISHED_AT direction:DESC}]){aggregate{count}nodes{...cardSequence}}recordings(first:3 collectionId:0 sequenceId:0 orderBy:[{field:PUBLISHED_AT direction:DESC}]){aggregate{count}nodes{...cardRecording}}}}`;
export async function getSponsorDetailPageData<T>(
	variables: ExactAlt<T, GetSponsorDetailPageDataQueryVariables>
): Promise<GetSponsorDetailPageDataQuery> {
	return fetchApi(GetSponsorDetailPageDataDocument, { variables });
}

export const GetSponsorDetailPathsDataDocument = `query getSponsorDetailPathsData($language:Language!$first:Int){sponsors(language:$language first:$first){nodes{canonicalPath(useFuturePath:true)}}}`;
export async function getSponsorDetailPathsData<T>(
	variables: ExactAlt<T, GetSponsorDetailPathsDataQueryVariables>
): Promise<GetSponsorDetailPathsDataQuery> {
	return fetchApi(GetSponsorDetailPathsDataDocument, { variables });
}
