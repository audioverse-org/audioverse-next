import * as Types from '../../lib/generated/graphql';

import { CardCollectionFragmentDoc } from '../../components/molecules/card/collection.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetSearchResultsCollectionsQueryVariables = Types.Exact<{
	language: Types.Language;
	term: Types.Scalars['String'];
	first: Types.Scalars['Int'];
	offset: Types.Scalars['Int'];
}>;

export type GetSearchResultsCollectionsQuery = {
	__typename?: 'Query';
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
	};
};

export const GetSearchResultsCollectionsDocument = `
    query getSearchResultsCollections($language: Language!, $term: String!, $first: Int!, $offset: Int!) {
  collections(language: $language, search: $term, first: $first, offset: $offset) {
    aggregate {
      count
    }
    nodes {
      ...cardCollection
    }
  }
}
    ${CardCollectionFragmentDoc}`;
export const useGetSearchResultsCollectionsQuery = <
	TData = GetSearchResultsCollectionsQuery,
	TError = unknown
>(
	variables: GetSearchResultsCollectionsQueryVariables,
	options?: UseQueryOptions<GetSearchResultsCollectionsQuery, TError, TData>
) =>
	useQuery<GetSearchResultsCollectionsQuery, TError, TData>(
		['getSearchResultsCollections', variables],
		graphqlFetcher<
			GetSearchResultsCollectionsQuery,
			GetSearchResultsCollectionsQueryVariables
		>(GetSearchResultsCollectionsDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getSearchResultsCollections<T>(
	variables: ExactAlt<T, GetSearchResultsCollectionsQueryVariables>
): Promise<GetSearchResultsCollectionsQuery> {
	return fetchApi(GetSearchResultsCollectionsDocument, { variables });
}
