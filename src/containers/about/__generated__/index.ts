import * as Types from '../../../__generated__/graphql';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetAboutPageDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetAboutPageDataQuery = { __typename?: 'Query', page: { __typename?: 'Page', title: string, body: string, type: Types.PageType, slug: string } | null };

export type GetAboutStaticPathsQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.Scalars['Int'];
}>;


export type GetAboutStaticPathsQuery = { __typename?: 'Query', pages: { __typename?: 'PageConnection', nodes: Array<{ __typename?: 'Page', canonicalPath: string, type: Types.PageType }> | null } };


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
      graphqlFetcher<GetAboutPageDataQuery, GetAboutPageDataQueryVariables>(GetAboutPageDataDocument, variables),
      options
    );
export const useInfiniteGetAboutPageDataQuery = <
      TData = GetAboutPageDataQuery,
      TError = unknown
    >(
      variables: GetAboutPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetAboutPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetAboutPageDataQuery, TError, TData>(
      ['getAboutPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetAboutPageDataQuery, GetAboutPageDataQueryVariables>(GetAboutPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetAboutStaticPathsDocument = `
    query getAboutStaticPaths($language: Language!, $first: Int!) {
  pages(language: $language, first: $first) {
    nodes {
      canonicalPath(useFuturePath: true)
      type
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
      graphqlFetcher<GetAboutStaticPathsQuery, GetAboutStaticPathsQueryVariables>(GetAboutStaticPathsDocument, variables),
      options
    );
export const useInfiniteGetAboutStaticPathsQuery = <
      TData = GetAboutStaticPathsQuery,
      TError = unknown
    >(
      variables: GetAboutStaticPathsQueryVariables,
      options?: UseInfiniteQueryOptions<GetAboutStaticPathsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetAboutStaticPathsQuery, TError, TData>(
      ['getAboutStaticPaths.infinite', variables],
      (metaData) => graphqlFetcher<GetAboutStaticPathsQuery, GetAboutStaticPathsQueryVariables>(GetAboutStaticPathsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

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
import { QueryClient } from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getAboutPageData: ExactAlt<T, GetAboutPageDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getAboutPageData', vars.getAboutPageData], () => getAboutPageData(vars.getAboutPageData), options),
		client.prefetchInfiniteQuery(['getAboutPageData.infinite', vars.getAboutPageData], () => getAboutPageData(vars.getAboutPageData), options),
	]);
	
	return client;
}