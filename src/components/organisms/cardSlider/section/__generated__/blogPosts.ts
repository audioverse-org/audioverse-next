import * as Types from '../../../../../__generated__/graphql';

import { CardPostFragmentDoc } from '../../../../molecules/card/__generated__/post';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetDiscoverBlogPostsQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.Scalars['Int']['input'];
  after: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetDiscoverBlogPostsQuery = { __typename?: 'Query', blogPosts: { __typename?: 'BlogPostConnection', nodes: Array<{ __typename?: 'BlogPost', publishDate: string, title: string, teaser: string, canonicalPath: string, readingDuration: number | null, image: { __typename?: 'Image', url: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };


export const GetDiscoverBlogPostsDocument = `
    query getDiscoverBlogPosts($language: Language!, $first: Int!, $after: String) {
  blogPosts(
    language: $language
    first: $first
    after: $after
    orderBy: {field: PUBLISHED_AT, direction: DESC}
  ) {
    nodes {
      ...cardPost
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${CardPostFragmentDoc}`;
export const useGetDiscoverBlogPostsQuery = <
      TData = GetDiscoverBlogPostsQuery,
      TError = unknown
    >(
      variables: GetDiscoverBlogPostsQueryVariables,
      options?: UseQueryOptions<GetDiscoverBlogPostsQuery, TError, TData>
    ) =>
    useQuery<GetDiscoverBlogPostsQuery, TError, TData>(
      ['getDiscoverBlogPosts', variables],
      graphqlFetcher<GetDiscoverBlogPostsQuery, GetDiscoverBlogPostsQueryVariables>(GetDiscoverBlogPostsDocument, variables),
      options
    );
export const useInfiniteGetDiscoverBlogPostsQuery = <
      TData = GetDiscoverBlogPostsQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetDiscoverBlogPostsQueryVariables,
      variables: GetDiscoverBlogPostsQueryVariables,
      options?: UseInfiniteQueryOptions<GetDiscoverBlogPostsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetDiscoverBlogPostsQuery, TError, TData>(
      ['getDiscoverBlogPosts.infinite', variables],
      (metaData) => graphqlFetcher<GetDiscoverBlogPostsQuery, GetDiscoverBlogPostsQueryVariables>(GetDiscoverBlogPostsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getDiscoverBlogPosts<T>(
	variables: ExactAlt<T, GetDiscoverBlogPostsQueryVariables>
): Promise<GetDiscoverBlogPostsQuery> {
	return fetchApi(GetDiscoverBlogPostsDocument, { variables });
}

import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';


export async function prefetchQueries<T>(
	vars: {
		getDiscoverBlogPosts: ExactAlt<T, GetDiscoverBlogPostsQueryVariables>
	},
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getDiscoverBlogPosts', vars.getDiscoverBlogPosts], () => getDiscoverBlogPosts(vars.getDiscoverBlogPosts), options),
		client.prefetchInfiniteQuery(['getDiscoverBlogPosts.infinite', vars.getDiscoverBlogPosts], () => getDiscoverBlogPosts(vars.getDiscoverBlogPosts), options),
	]);
	
	return client;
}
