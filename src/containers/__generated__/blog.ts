import * as Types from '../../__generated__/graphql';

import { CardPostFragmentDoc } from '../../components/molecules/card/__generated__/post';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetBlogPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
	offset?: Types.InputMaybe<Types.Scalars['Int']>;
	first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetBlogPageDataQuery = {
	__typename?: 'Query';
	blogPosts: {
		__typename?: 'BlogPostConnection';
		nodes: Array<{
			__typename?: 'BlogPost';
			publishDate: string;
			title: string;
			teaser: string;
			canonicalPath: string;
			readingDuration: number | null;
			image: { __typename?: 'Image'; url: string } | null;
		}> | null;
		aggregate: { __typename?: 'Aggregate'; count: number } | null;
	};
};

export type GetBlogPathsDataQueryVariables = Types.Exact<{
	language: Types.Language;
}>;

export type GetBlogPathsDataQuery = {
	__typename?: 'Query';
	blogPosts: {
		__typename?: 'BlogPostConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null;
	};
};

export const GetBlogPageDataDocument = `
    query getBlogPageData($language: Language!, $offset: Int = 0, $first: Int = 12) {
  blogPosts(
    language: $language
    orderBy: {field: PUBLISHED_AT, direction: DESC}
    first: $first
    offset: $offset
  ) {
    nodes {
      ...cardPost
    }
    aggregate {
      count
    }
  }
}
    ${CardPostFragmentDoc}`;
export const useGetBlogPageDataQuery = <
	TData = GetBlogPageDataQuery,
	TError = unknown
>(
	variables: GetBlogPageDataQueryVariables,
	options?: UseQueryOptions<GetBlogPageDataQuery, TError, TData>
) =>
	useQuery<GetBlogPageDataQuery, TError, TData>(
		['getBlogPageData', variables],
		graphqlFetcher<GetBlogPageDataQuery, GetBlogPageDataQueryVariables>(
			GetBlogPageDataDocument,
			variables
		),
		options
	);
export const GetBlogPathsDataDocument = `
    query getBlogPathsData($language: Language!) {
  blogPosts(language: $language) {
    aggregate {
      count
    }
  }
}
    `;
export const useGetBlogPathsDataQuery = <
	TData = GetBlogPathsDataQuery,
	TError = unknown
>(
	variables: GetBlogPathsDataQueryVariables,
	options?: UseQueryOptions<GetBlogPathsDataQuery, TError, TData>
) =>
	useQuery<GetBlogPathsDataQuery, TError, TData>(
		['getBlogPathsData', variables],
		graphqlFetcher<GetBlogPathsDataQuery, GetBlogPathsDataQueryVariables>(
			GetBlogPathsDataDocument,
			variables
		),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getBlogPageData<T>(
	variables: ExactAlt<T, GetBlogPageDataQueryVariables>
): Promise<GetBlogPageDataQuery> {
	return fetchApi(GetBlogPageDataDocument, { variables });
}

export async function getBlogPathsData<T>(
	variables: ExactAlt<T, GetBlogPathsDataQueryVariables>
): Promise<GetBlogPathsDataQuery> {
	return fetchApi(GetBlogPathsDataDocument, { variables });
}
