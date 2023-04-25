import * as Types from '../../../../__generated__/graphql';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetPresenterListAllPageDataQueryVariables = Types.Exact<{
  language: Types.Language;
  after: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetPresenterListAllPageDataQuery = { __typename?: 'Query', persons: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', canonicalPath: string, givenName: string, surname: string, summary: string, image: { __typename?: 'Image', url: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } }, personLetterCounts: Array<{ __typename?: 'LetterCount', letter: string, count: number }> };


export const GetPresenterListAllPageDataDocument = `
    query getPresenterListAllPageData($language: Language!, $after: String) {
  persons(
    language: $language
    orderBy: [{field: NAME, direction: ASC}]
    first: 20
    after: $after
  ) {
    nodes {
      canonicalPath(useFuturePath: true)
      givenName
      surname
      image {
        url(size: 128)
      }
      summary
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
  personLetterCounts(language: $language) {
    letter
    count
  }
}
    `;
export const useGetPresenterListAllPageDataQuery = <
      TData = GetPresenterListAllPageDataQuery,
      TError = unknown
    >(
      variables: GetPresenterListAllPageDataQueryVariables,
      options?: UseQueryOptions<GetPresenterListAllPageDataQuery, TError, TData>
    ) =>
    useQuery<GetPresenterListAllPageDataQuery, TError, TData>(
      ['getPresenterListAllPageData', variables],
      graphqlFetcher<GetPresenterListAllPageDataQuery, GetPresenterListAllPageDataQueryVariables>(GetPresenterListAllPageDataDocument, variables),
      options
    );
export const useInfiniteGetPresenterListAllPageDataQuery = <
      TData = GetPresenterListAllPageDataQuery,
      TError = unknown
    >(
      variables: GetPresenterListAllPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetPresenterListAllPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetPresenterListAllPageDataQuery, TError, TData>(
      ['getPresenterListAllPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetPresenterListAllPageDataQuery, GetPresenterListAllPageDataQueryVariables>(GetPresenterListAllPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getPresenterListAllPageData<T>(
	variables: ExactAlt<T, GetPresenterListAllPageDataQueryVariables>
): Promise<GetPresenterListAllPageDataQuery> {
	return fetchApi(GetPresenterListAllPageDataDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getPresenterListAllPageData: ExactAlt<T, GetPresenterListAllPageDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getPresenterListAllPageData', () => getPresenterListAllPageData(vars.getPresenterListAllPageData)],
		['getPresenterListAllPageData.infinite', () => getPresenterListAllPageData(vars.getPresenterListAllPageData)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}