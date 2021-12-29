import * as Types from '../../lib/generated/graphql';

import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.generated';
import { CardRecordingSequenceHatFragmentDoc } from '../../components/molecules/card/recordingSequenceHat.generated';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.generated';
import { TeaseRecordingFragmentDoc } from '../../components/molecules/teaseRecording.generated';
import { AndMiniplayerFragmentDoc } from '../../components/templates/andMiniplayer.generated';
import { CardSequenceFragmentDoc } from '../../components/molecules/card/sequence.generated';
import { CardCollectionFragmentDoc } from '../../components/molecules/card/collection.generated';
import { CardSponsorFragmentDoc } from '../../components/molecules/card/sponsor.generated';
import { CardPersonFragmentDoc } from '../../components/molecules/card/person.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetSearchResultsPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
	term: Types.Scalars['String'];
}>;

export type GetSearchResultsPageDataQuery = {
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
		pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean };
	};
	sequences: {
		__typename?: 'SequenceConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
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
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
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
		pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean };
	};
	sponsors: {
		__typename?: 'SponsorConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
		nodes:
			| Array<{
					__typename?: 'Sponsor';
					id: string | number;
					title: string;
					canonicalPath: string;
					image: { __typename?: 'Image'; url: string } | null | undefined;
					collections: {
						__typename?: 'CollectionConnection';
						aggregate:
							| { __typename?: 'Aggregate'; count: number }
							| null
							| undefined;
					};
					sequences: {
						__typename?: 'SequenceConnection';
						aggregate:
							| { __typename?: 'Aggregate'; count: number }
							| null
							| undefined;
					};
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
	persons: {
		__typename?: 'PersonConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
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
};

export const GetSearchResultsPageDataDocument = `
    query getSearchResultsPageData($language: Language!, $term: String!) {
  recordings(language: $language, search: $term, first: 6) {
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
  sequences(language: $language, search: $term, first: 3) {
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
  collections(language: $language, search: $term, first: 3) {
    aggregate {
      count
    }
    nodes {
      ...cardCollection
    }
    pageInfo {
      hasNextPage
    }
  }
  sponsors(language: $language, search: $term, first: 3) {
    aggregate {
      count
    }
    nodes {
      ...cardSponsor
    }
    pageInfo {
      hasNextPage
    }
  }
  persons(language: $language, search: $term, first: 3) {
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
}
    ${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}
${CardSequenceFragmentDoc}
${CardCollectionFragmentDoc}
${CardSponsorFragmentDoc}
${CardPersonFragmentDoc}`;
export const useGetSearchResultsPageDataQuery = <
	TData = GetSearchResultsPageDataQuery,
	TError = unknown
>(
	variables: GetSearchResultsPageDataQueryVariables,
	options?: UseQueryOptions<GetSearchResultsPageDataQuery, TError, TData>
) =>
	useQuery<GetSearchResultsPageDataQuery, TError, TData>(
		['getSearchResultsPageData', variables],
		graphqlFetcher<
			GetSearchResultsPageDataQuery,
			GetSearchResultsPageDataQueryVariables
		>(GetSearchResultsPageDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export const GetSearchResultsPageDataDocument = `query getSearchResultsPageData($language:Language!$term:String!){recordings(language:$language search:$term first:6){aggregate{count}nodes{...cardRecording}pageInfo{hasNextPage}}sequences(language:$language search:$term first:3){aggregate{count}nodes{...cardSequence}pageInfo{hasNextPage}}collections(language:$language search:$term first:3){aggregate{count}nodes{...cardCollection}pageInfo{hasNextPage}}sponsors(language:$language search:$term first:3){aggregate{count}nodes{...cardSponsor}pageInfo{hasNextPage}}persons(language:$language search:$term first:3){aggregate{count}nodes{...cardPerson}pageInfo{hasNextPage}}}`;
export async function getSearchResultsPageData<T>(
	variables: ExactAlt<T, GetSearchResultsPageDataQueryVariables>
): Promise<GetSearchResultsPageDataQuery> {
	return fetchApi(GetSearchResultsPageDataDocument, { variables });
}
