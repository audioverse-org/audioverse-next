import * as Types from '../../__generated__/graphql';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetTestimoniesPageDataQueryVariables = Types.Exact<{
  language: Types.Language;
  offset: Types.InputMaybe<Types.Scalars['Int']>;
  first: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetTestimoniesPageDataQuery = { __typename?: 'Query', testimonies: { __typename?: 'TestimonyConnection', nodes: Array<{ __typename?: 'Testimony', author: string, body: string, writtenDate: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } };

export type GetTestimoniesPathsDataQueryVariables = Types.Exact<{
  language: Types.Language;
}>;


export type GetTestimoniesPathsDataQuery = { __typename?: 'Query', testimonies: { __typename?: 'TestimonyConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } };


export const GetTestimoniesPageDataDocument = `
    query getTestimoniesPageData($language: Language!, $offset: Int, $first: Int) {
  testimonies(
    language: $language
    first: $first
    offset: $offset
    orderBy: {direction: DESC, field: WRITTEN_DATE}
  ) {
    nodes {
      author
      body
      writtenDate
    }
    aggregate {
      count
    }
  }
}
    `;
export const useGetTestimoniesPageDataQuery = <
      TData = GetTestimoniesPageDataQuery,
      TError = unknown
    >(
      variables: GetTestimoniesPageDataQueryVariables,
      options?: UseQueryOptions<GetTestimoniesPageDataQuery, TError, TData>
    ) =>
    useQuery<GetTestimoniesPageDataQuery, TError, TData>(
      ['getTestimoniesPageData', variables],
      graphqlFetcher<GetTestimoniesPageDataQuery, GetTestimoniesPageDataQueryVariables>(GetTestimoniesPageDataDocument, variables),
      options
    );
export const useInfiniteGetTestimoniesPageDataQuery = <
      TData = GetTestimoniesPageDataQuery,
      TError = unknown
    >(
      variables: GetTestimoniesPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetTestimoniesPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetTestimoniesPageDataQuery, TError, TData>(
      ['getTestimoniesPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetTestimoniesPageDataQuery, GetTestimoniesPageDataQueryVariables>(GetTestimoniesPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetTestimoniesPathsDataDocument = `
    query getTestimoniesPathsData($language: Language!) {
  testimonies(language: $language) {
    aggregate {
      count
    }
  }
}
    `;
export const useGetTestimoniesPathsDataQuery = <
      TData = GetTestimoniesPathsDataQuery,
      TError = unknown
    >(
      variables: GetTestimoniesPathsDataQueryVariables,
      options?: UseQueryOptions<GetTestimoniesPathsDataQuery, TError, TData>
    ) =>
    useQuery<GetTestimoniesPathsDataQuery, TError, TData>(
      ['getTestimoniesPathsData', variables],
      graphqlFetcher<GetTestimoniesPathsDataQuery, GetTestimoniesPathsDataQueryVariables>(GetTestimoniesPathsDataDocument, variables),
      options
    );
export const useInfiniteGetTestimoniesPathsDataQuery = <
      TData = GetTestimoniesPathsDataQuery,
      TError = unknown
    >(
      variables: GetTestimoniesPathsDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetTestimoniesPathsDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetTestimoniesPathsDataQuery, TError, TData>(
      ['getTestimoniesPathsData.infinite', variables],
      (metaData) => graphqlFetcher<GetTestimoniesPathsDataQuery, GetTestimoniesPathsDataQueryVariables>(GetTestimoniesPathsDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getTestimoniesPageData<T>(
	variables: ExactAlt<T, GetTestimoniesPageDataQueryVariables>
): Promise<GetTestimoniesPageDataQuery> {
	return fetchApi(GetTestimoniesPageDataDocument, { variables });
}

export async function getTestimoniesPathsData<T>(
	variables: ExactAlt<T, GetTestimoniesPathsDataQueryVariables>
): Promise<GetTestimoniesPathsDataQuery> {
	return fetchApi(GetTestimoniesPathsDataDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getTestimoniesPageData: ExactAlt<T, GetTestimoniesPageDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getTestimoniesPageData', () => getTestimoniesPageData(vars.getTestimoniesPageData)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}