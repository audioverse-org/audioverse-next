import * as Types from '../../lib/generated/graphql';

import { CardCollectionFragmentDoc } from '../../components/molecules/card/collection.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetCollectionListPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
	offset: Types.InputMaybe<Types.Scalars['Int']>;
	first: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetCollectionListPageDataQuery = {
	__typename?: 'Query';
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
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
	};
};

export type GetCollectionListPathsDataQueryVariables = Types.Exact<{
	language: Types.Language;
}>;

export type GetCollectionListPathsDataQuery = {
	__typename?: 'Query';
	collections: {
		__typename?: 'CollectionConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
	};
};

export const GetCollectionListPageDataDocument = `
    query getCollectionListPageData($language: Language!, $offset: Int, $first: Int) {
  collections(
    language: $language
    offset: $offset
    first: $first
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardCollection
    }
    aggregate {
      count
    }
  }
}
    ${CardCollectionFragmentDoc}`;
export const useGetCollectionListPageDataQuery = <
	TData = GetCollectionListPageDataQuery,
	TError = unknown
>(
	variables: GetCollectionListPageDataQueryVariables,
	options?: UseQueryOptions<GetCollectionListPageDataQuery, TError, TData>
) =>
	useQuery<GetCollectionListPageDataQuery, TError, TData>(
		['getCollectionListPageData', variables],
		graphqlFetcher<
			GetCollectionListPageDataQuery,
			GetCollectionListPageDataQueryVariables
		>(GetCollectionListPageDataDocument, variables),
		options
	);
export const GetCollectionListPathsDataDocument = `
    query getCollectionListPathsData($language: Language!) {
  collections(language: $language) {
    aggregate {
      count
    }
  }
}
    `;
export const useGetCollectionListPathsDataQuery = <
	TData = GetCollectionListPathsDataQuery,
	TError = unknown
>(
	variables: GetCollectionListPathsDataQueryVariables,
	options?: UseQueryOptions<GetCollectionListPathsDataQuery, TError, TData>
) =>
	useQuery<GetCollectionListPathsDataQuery, TError, TData>(
		['getCollectionListPathsData', variables],
		graphqlFetcher<
			GetCollectionListPathsDataQuery,
			GetCollectionListPathsDataQueryVariables
		>(GetCollectionListPathsDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getCollectionListPageData<T>(
	variables: ExactAlt<T, GetCollectionListPageDataQueryVariables>
): Promise<GetCollectionListPageDataQuery> {
	return fetchApi(GetCollectionListPageDataDocument, { variables });
}

export async function getCollectionListPathsData<T>(
	variables: ExactAlt<T, GetCollectionListPathsDataQueryVariables>
): Promise<GetCollectionListPathsDataQuery> {
	return fetchApi(GetCollectionListPathsDataDocument, { variables });
}
