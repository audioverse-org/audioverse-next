import * as Types from '../../../__generated__/graphql';

import { CardPostFragmentDoc } from '../../../components/molecules/card/__generated__/post';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetBlogDetailDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  language: Types.Language;
}>;


export type GetBlogDetailDataQuery = { __typename?: 'Query', blogPost: { __typename?: 'BlogPost', id: string | number, title: string, body: string, canonicalPath: string, canonicalUrl: string, language: Types.Language, publishDate: string, readingDuration: number | null, teaser: string, image: { __typename?: 'Image', url: string } | null } | null, blogPosts: { __typename?: 'BlogPostConnection', nodes: Array<{ __typename?: 'BlogPost', publishDate: string, title: string, teaser: string, canonicalPath: string, readingDuration: number | null, image: { __typename?: 'Image', url: string } | null }> | null } };

export type GetBlogDetailStaticPathsQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetBlogDetailStaticPathsQuery = { __typename?: 'Query', blogPosts: { __typename?: 'BlogPostConnection', nodes: Array<{ __typename?: 'BlogPost', canonicalPath: string }> | null } };


export const GetBlogDetailDataDocument = `
    query getBlogDetailData($id: ID!, $language: Language!) {
  blogPost(id: $id) {
    id
    title
    image {
      url(size: 2100, cropMode: MAX_SIZE)
    }
    body
    canonicalPath(useFuturePath: true)
    canonicalUrl(useFuturePath: true)
    language
    publishDate
    readingDuration
    teaser
  }
  blogPosts(
    language: $language
    first: 5
    orderBy: [{field: PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardPost
    }
  }
}
    ${CardPostFragmentDoc}`;
export const useGetBlogDetailDataQuery = <
      TData = GetBlogDetailDataQuery,
      TError = unknown
    >(
      variables: GetBlogDetailDataQueryVariables,
      options?: UseQueryOptions<GetBlogDetailDataQuery, TError, TData>
    ) =>
    useQuery<GetBlogDetailDataQuery, TError, TData>(
      ['getBlogDetailData', variables],
      graphqlFetcher<GetBlogDetailDataQuery, GetBlogDetailDataQueryVariables>(GetBlogDetailDataDocument, variables),
      options
    );
export const useInfiniteGetBlogDetailDataQuery = <
      TData = GetBlogDetailDataQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetBlogDetailDataQueryVariables,
      variables: GetBlogDetailDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetBlogDetailDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetBlogDetailDataQuery, TError, TData>(
      ['getBlogDetailData.infinite', variables],
      (metaData) => graphqlFetcher<GetBlogDetailDataQuery, GetBlogDetailDataQueryVariables>(GetBlogDetailDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetBlogDetailStaticPathsDocument = `
    query getBlogDetailStaticPaths($language: Language!, $first: Int) {
  blogPosts(language: $language, first: $first) {
    nodes {
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetBlogDetailStaticPathsQuery = <
      TData = GetBlogDetailStaticPathsQuery,
      TError = unknown
    >(
      variables: GetBlogDetailStaticPathsQueryVariables,
      options?: UseQueryOptions<GetBlogDetailStaticPathsQuery, TError, TData>
    ) =>
    useQuery<GetBlogDetailStaticPathsQuery, TError, TData>(
      ['getBlogDetailStaticPaths', variables],
      graphqlFetcher<GetBlogDetailStaticPathsQuery, GetBlogDetailStaticPathsQueryVariables>(GetBlogDetailStaticPathsDocument, variables),
      options
    );
export const useInfiniteGetBlogDetailStaticPathsQuery = <
      TData = GetBlogDetailStaticPathsQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetBlogDetailStaticPathsQueryVariables,
      variables: GetBlogDetailStaticPathsQueryVariables,
      options?: UseInfiniteQueryOptions<GetBlogDetailStaticPathsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetBlogDetailStaticPathsQuery, TError, TData>(
      ['getBlogDetailStaticPaths.infinite', variables],
      (metaData) => graphqlFetcher<GetBlogDetailStaticPathsQuery, GetBlogDetailStaticPathsQueryVariables>(GetBlogDetailStaticPathsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getBlogDetailData<T>(
	variables: ExactAlt<T, GetBlogDetailDataQueryVariables>
): Promise<GetBlogDetailDataQuery> {
	return fetchApi(GetBlogDetailDataDocument, { variables });
}

export async function getBlogDetailStaticPaths<T>(
	variables: ExactAlt<T, GetBlogDetailStaticPathsQueryVariables>
): Promise<GetBlogDetailStaticPathsQuery> {
	return fetchApi(GetBlogDetailStaticPathsDocument, { variables });
}

import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';


export async function prefetchQueries<T>(
	vars: {
		getBlogDetailData: ExactAlt<T, GetBlogDetailDataQueryVariables>
	},
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getBlogDetailData', vars.getBlogDetailData], () => getBlogDetailData(vars.getBlogDetailData), options),
		client.prefetchInfiniteQuery(['getBlogDetailData.infinite', vars.getBlogDetailData], () => getBlogDetailData(vars.getBlogDetailData), options),
	]);
	
	return client;
}
