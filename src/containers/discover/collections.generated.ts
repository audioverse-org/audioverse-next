import * as Types from '../../lib/generated/graphql';

import { CardSequenceFragmentDoc } from '../../components/molecules/card/sequence.generated';
import { CardPersonFragmentDoc } from '../../components/molecules/card/person.generated';
import { CardCollectionFragmentDoc } from '../../components/molecules/card/collection.generated';
import { CardSponsorFragmentDoc } from '../../components/molecules/card/sponsor.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetDiscoverCollectionsPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
}>;

export type GetDiscoverCollectionsPageDataQuery = {
	__typename?: 'Query';
	sequence:
		| {
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
		  }
		| null
		| undefined;
	persons: {
		__typename?: 'PersonConnection';
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
	};
	serieses: {
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
	sponsors: {
		__typename?: 'SponsorConnection';
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
	};
	audiobooks: {
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
};

export const GetDiscoverCollectionsPageDataDocument = `
    query getDiscoverCollectionsPageData($language: Language!) {
  sequence(id: 175) {
    ...cardSequence
  }
  persons(
    language: $language
    first: 3
    orderBy: [{field: RECORDING_COUNT, direction: DESC}]
  ) {
    nodes {
      ...cardPerson
    }
  }
  serieses(
    language: $language
    first: 3
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardSequence
    }
  }
  conferences(
    language: $language
    first: 3
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardCollection
    }
  }
  sponsors(
    language: $language
    first: 3
    orderBy: [{field: RECORDING_COUNT, direction: DESC}]
  ) {
    nodes {
      ...cardSponsor
    }
  }
  audiobooks(
    language: $language
    first: 3
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardSequence
    }
  }
  storySeasons(
    language: $language
    first: 3
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardSequence
    }
  }
  musicAlbums(
    language: $language
    first: 3
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardSequence
    }
  }
}
    ${CardSequenceFragmentDoc}
${CardPersonFragmentDoc}
${CardCollectionFragmentDoc}
${CardSponsorFragmentDoc}`;
export const useGetDiscoverCollectionsPageDataQuery = <
	TData = GetDiscoverCollectionsPageDataQuery,
	TError = unknown
>(
	variables: GetDiscoverCollectionsPageDataQueryVariables,
	options?: UseQueryOptions<GetDiscoverCollectionsPageDataQuery, TError, TData>
) =>
	useQuery<GetDiscoverCollectionsPageDataQuery, TError, TData>(
		['getDiscoverCollectionsPageData', variables],
		graphqlFetcher<
			GetDiscoverCollectionsPageDataQuery,
			GetDiscoverCollectionsPageDataQueryVariables
		>(GetDiscoverCollectionsPageDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getDiscoverCollectionsPageData<T>(
	variables: ExactAlt<T, GetDiscoverCollectionsPageDataQueryVariables>
): Promise<GetDiscoverCollectionsPageDataQuery> {
	return fetchApi(GetDiscoverCollectionsPageDataDocument, { variables });
}
