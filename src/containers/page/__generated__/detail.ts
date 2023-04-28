import * as Types from '../../../__generated__/graphql';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetCustomDetailPageDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetCustomDetailPageDataQuery = { __typename?: 'Query', page: { __typename?: 'Page', title: string, body: string, type: Types.PageType, slug: string } | null };

export type GetCustomDetailPageStaticPathsQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.Scalars['Int'];
}>;


export type GetCustomDetailPageStaticPathsQuery = { __typename?: 'Query', pages: { __typename?: 'PageConnection', nodes: Array<{ __typename?: 'Page', id: string | number, slug: string, type: Types.PageType }> | null } };


export const GetCustomDetailPageDataDocument = `
    query getCustomDetailPageData($id: ID!) {
  page(id: $id) {
    title
    body
    type
    slug
  }
}
    `;
export const useGetCustomDetailPageDataQuery = <
      TData = GetCustomDetailPageDataQuery,
      TError = unknown
    >(
      variables: GetCustomDetailPageDataQueryVariables,
      options?: UseQueryOptions<GetCustomDetailPageDataQuery, TError, TData>
    ) =>
    useQuery<GetCustomDetailPageDataQuery, TError, TData>(
      ['getCustomDetailPageData', variables],
      graphqlFetcher<GetCustomDetailPageDataQuery, GetCustomDetailPageDataQueryVariables>(GetCustomDetailPageDataDocument, variables),
      options
    );
export const useInfiniteGetCustomDetailPageDataQuery = <
      TData = GetCustomDetailPageDataQuery,
      TError = unknown
    >(
      variables: GetCustomDetailPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetCustomDetailPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetCustomDetailPageDataQuery, TError, TData>(
      ['getCustomDetailPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetCustomDetailPageDataQuery, GetCustomDetailPageDataQueryVariables>(GetCustomDetailPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetCustomDetailPageStaticPathsDocument = `
    query getCustomDetailPageStaticPaths($language: Language!, $first: Int!) {
  pages(language: $language, first: $first) {
    nodes {
      id
      slug
      type
    }
  }
}
    `;
export const useGetCustomDetailPageStaticPathsQuery = <
      TData = GetCustomDetailPageStaticPathsQuery,
      TError = unknown
    >(
      variables: GetCustomDetailPageStaticPathsQueryVariables,
      options?: UseQueryOptions<GetCustomDetailPageStaticPathsQuery, TError, TData>
    ) =>
    useQuery<GetCustomDetailPageStaticPathsQuery, TError, TData>(
      ['getCustomDetailPageStaticPaths', variables],
      graphqlFetcher<GetCustomDetailPageStaticPathsQuery, GetCustomDetailPageStaticPathsQueryVariables>(GetCustomDetailPageStaticPathsDocument, variables),
      options
    );
export const useInfiniteGetCustomDetailPageStaticPathsQuery = <
      TData = GetCustomDetailPageStaticPathsQuery,
      TError = unknown
    >(
      variables: GetCustomDetailPageStaticPathsQueryVariables,
      options?: UseInfiniteQueryOptions<GetCustomDetailPageStaticPathsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetCustomDetailPageStaticPathsQuery, TError, TData>(
      ['getCustomDetailPageStaticPaths.infinite', variables],
      (metaData) => graphqlFetcher<GetCustomDetailPageStaticPathsQuery, GetCustomDetailPageStaticPathsQueryVariables>(GetCustomDetailPageStaticPathsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getCustomDetailPageData<T>(
	variables: ExactAlt<T, GetCustomDetailPageDataQueryVariables>
): Promise<GetCustomDetailPageDataQuery> {
	return fetchApi(GetCustomDetailPageDataDocument, { variables });
}

export async function getCustomDetailPageStaticPaths<T>(
	variables: ExactAlt<T, GetCustomDetailPageStaticPathsQueryVariables>
): Promise<GetCustomDetailPageStaticPathsQuery> {
	return fetchApi(GetCustomDetailPageStaticPathsDocument, { variables });
}
import { QueryClient, QueryKey } from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getCustomDetailPageData: ExactAlt<T, GetCustomDetailPageDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	const promises = [
		client.prefetchQuery(['getCustomDetailPageData', vars.getCustomDetailPageData], () => getCustomDetailPageData(vars.getCustomDetailPageData), options),
		client.prefetchInfiniteQuery(['getCustomDetailPageData.infinite', vars.getCustomDetailPageData], () => getCustomDetailPageData(vars.getCustomDetailPageData), options),
	]

	await Promise.all(promises);
	
	return client;
}