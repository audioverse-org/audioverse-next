import * as Types from '../../../../../__generated__/graphql';

import { CardPostFragmentDoc } from '../../../../molecules/card/__generated__/post';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetSectionBlogPostsQueryVariables = Types.Exact<{
  language: Types.Language;
  first?: Types.Scalars['Int']['input'];
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetSectionBlogPostsQuery = { __typename?: 'Query', blogPosts: { __typename?: 'BlogPostConnection', nodes: Array<{ __typename?: 'BlogPost', publishDate: string, title: string, teaser: string, canonicalPath: string, readingDuration: number | null, image: { __typename?: 'Image', url: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };


export const GetSectionBlogPostsDocument = `
    query getSectionBlogPosts($language: Language!, $first: Int! = 3, $after: String = null) {
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
export const useGetSectionBlogPostsQuery = <
      TData = GetSectionBlogPostsQuery,
      TError = unknown
    >(
      variables: GetSectionBlogPostsQueryVariables,
      options?: UseQueryOptions<GetSectionBlogPostsQuery, TError, TData>
    ) =>
    useQuery<GetSectionBlogPostsQuery, TError, TData>(
      ['getSectionBlogPosts', variables],
      graphqlFetcher<GetSectionBlogPostsQuery, GetSectionBlogPostsQueryVariables>(GetSectionBlogPostsDocument, variables),
      options
    );
export const useInfiniteGetSectionBlogPostsQuery = <
      TData = GetSectionBlogPostsQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetSectionBlogPostsQueryVariables,
      variables: GetSectionBlogPostsQueryVariables,
      options?: UseInfiniteQueryOptions<GetSectionBlogPostsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetSectionBlogPostsQuery, TError, TData>(
      ['getSectionBlogPosts.infinite', variables],
      (metaData) => graphqlFetcher<GetSectionBlogPostsQuery, GetSectionBlogPostsQueryVariables>(GetSectionBlogPostsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getSectionBlogPosts<T>(
	variables: ExactAlt<T, GetSectionBlogPostsQueryVariables>
): Promise<GetSectionBlogPostsQuery> {
	return fetchApi(GetSectionBlogPostsDocument, { variables });
}