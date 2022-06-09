// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { CardCollectionFragmentDoc } from '../../components/molecules/card/collection.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
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
		aggregate?: { __typename?: 'Aggregate'; count: number } | null;
		nodes?: Array<{
			__typename?: 'Collection';
			id: string;
			canonicalPath: string;
			title: string;
			startDate?: any | null;
			endDate?: any | null;
			duration: number;
			collectionContentType: Types.CollectionContentType;
			image?: { __typename?: 'Image'; id: string; url: any } | null;
			allSequences: {
				__typename?: 'SequenceConnection';
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
			allRecordings: {
				__typename?: 'RecordingConnection';
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
		}> | null;
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
