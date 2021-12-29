import * as Types from '../lib/generated/graphql';

import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetAboutPageDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetAboutPageDataQuery = {
	__typename?: 'Query';
	page:
		| {
				__typename?: 'Page';
				title: string;
				body: string;
				type: Types.PageType;
				slug: string;
		  }
		| null
		| undefined;
};

export type GetAboutStaticPathsQueryVariables = Types.Exact<{
	language: Types.Language;
	first: Types.Scalars['Int'];
}>;

export type GetAboutStaticPathsQuery = {
	__typename?: 'Query';
	pages: {
		__typename?: 'PageConnection';
		nodes:
			| Array<{ __typename?: 'Page'; canonicalPath: string }>
			| null
			| undefined;
	};
};

export const GetAboutPageDataDocument = `
    query getAboutPageData($id: ID!) {
  page(id: $id) {
    title
    body
    type
    slug
  }
}
    `;
export const useGetAboutPageDataQuery = <
	TData = GetAboutPageDataQuery,
	TError = unknown
>(
	variables: GetAboutPageDataQueryVariables,
	options?: UseQueryOptions<GetAboutPageDataQuery, TError, TData>
) =>
	useQuery<GetAboutPageDataQuery, TError, TData>(
		['getAboutPageData', variables],
		graphqlFetcher<GetAboutPageDataQuery, GetAboutPageDataQueryVariables>(
			GetAboutPageDataDocument,
			variables
		),
		options
	);
export const GetAboutStaticPathsDocument = `
    query getAboutStaticPaths($language: Language!, $first: Int!) {
  pages(language: $language, first: $first) {
    nodes {
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetAboutStaticPathsQuery = <
	TData = GetAboutStaticPathsQuery,
	TError = unknown
>(
	variables: GetAboutStaticPathsQueryVariables,
	options?: UseQueryOptions<GetAboutStaticPathsQuery, TError, TData>
) =>
	useQuery<GetAboutStaticPathsQuery, TError, TData>(
		['getAboutStaticPaths', variables],
		graphqlFetcher<GetAboutStaticPathsQuery, GetAboutStaticPathsQueryVariables>(
			GetAboutStaticPathsDocument,
			variables
		),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getAboutPageData<T>(
	variables: ExactAlt<T, GetAboutPageDataQueryVariables>
): Promise<GetAboutPageDataQuery> {
	return fetchApi(GetAboutPageDataDocument, { variables });
}

export async function getAboutStaticPaths<T>(
	variables: ExactAlt<T, GetAboutStaticPathsQueryVariables>
): Promise<GetAboutStaticPathsQuery> {
	return fetchApi(GetAboutStaticPathsDocument, { variables });
}
