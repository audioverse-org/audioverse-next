import * as Types from '../../../../__generated__/graphql';

import { PresenterListEntryFragmentDoc } from './list';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetPresenterListLetterPageDataQueryVariables = Types.Exact<{
  language: Types.Language;
  startsWith: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetPresenterListLetterPageDataQuery = { __typename?: 'Query', persons: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', canonicalPath: string, givenName: string, surname: string, summary: string, image: { __typename?: 'Image', url: string } | null }> | null }, personLetterCounts: Array<{ __typename?: 'LetterCount', letter: string, count: number }> };


export const GetPresenterListLetterPageDataDocument = `
    query getPresenterListLetterPageData($language: Language!, $startsWith: String) {
  persons(
    language: $language
    startsWith: $startsWith
    first: 1500
    orderBy: [{field: NAME, direction: ASC}]
  ) {
    nodes {
      ...presenterListEntry
    }
  }
  personLetterCounts(language: $language) {
    letter
    count
  }
}
    ${PresenterListEntryFragmentDoc}`;
export const useGetPresenterListLetterPageDataQuery = <
      TData = GetPresenterListLetterPageDataQuery,
      TError = unknown
    >(
      variables: GetPresenterListLetterPageDataQueryVariables,
      options?: UseQueryOptions<GetPresenterListLetterPageDataQuery, TError, TData>
    ) =>
    useQuery<GetPresenterListLetterPageDataQuery, TError, TData>(
      ['getPresenterListLetterPageData', variables],
      graphqlFetcher<GetPresenterListLetterPageDataQuery, GetPresenterListLetterPageDataQueryVariables>(GetPresenterListLetterPageDataDocument, variables),
      options
    );
export const useInfiniteGetPresenterListLetterPageDataQuery = <
      TData = GetPresenterListLetterPageDataQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetPresenterListLetterPageDataQueryVariables,
      variables: GetPresenterListLetterPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetPresenterListLetterPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetPresenterListLetterPageDataQuery, TError, TData>(
      ['getPresenterListLetterPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetPresenterListLetterPageDataQuery, GetPresenterListLetterPageDataQueryVariables>(GetPresenterListLetterPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getPresenterListLetterPageData<T>(
	variables: ExactAlt<T, GetPresenterListLetterPageDataQueryVariables>
): Promise<GetPresenterListLetterPageDataQuery> {
	return fetchApi(GetPresenterListLetterPageDataDocument, { variables });
}

import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';


export async function prefetchQueries<T>(
	vars: {
		getPresenterListLetterPageData: ExactAlt<T, GetPresenterListLetterPageDataQueryVariables>
	},
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getPresenterListLetterPageData', vars.getPresenterListLetterPageData], () => getPresenterListLetterPageData(vars.getPresenterListLetterPageData), options),
		client.prefetchInfiniteQuery(['getPresenterListLetterPageData.infinite', vars.getPresenterListLetterPageData], () => getPresenterListLetterPageData(vars.getPresenterListLetterPageData), options),
	]);
	
	return client;
}
