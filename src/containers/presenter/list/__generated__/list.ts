import * as Types from '../../../../__generated__/graphql';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type PresenterListEntryFragment = { __typename?: 'Person', canonicalPath: string, givenName: string, surname: string, summary: string, image: { __typename?: 'Image', url: string } | null };

export type GetPersonListLetterCountsQueryVariables = Types.Exact<{
  language: Types.Language;
}>;


export type GetPersonListLetterCountsQuery = { __typename?: 'Query', personLetterCounts: Array<{ __typename?: 'LetterCount', letter: string, count: number }> };

export const PresenterListEntryFragmentDoc = `
    fragment presenterListEntry on Person {
  canonicalPath(useFuturePath: true)
  givenName
  surname
  image {
    url(size: 128)
  }
  summary
}
    `;
export const GetPersonListLetterCountsDocument = `
    query getPersonListLetterCounts($language: Language!) {
  personLetterCounts(language: $language) {
    letter
    count
  }
}
    `;
export const useGetPersonListLetterCountsQuery = <
      TData = GetPersonListLetterCountsQuery,
      TError = unknown
    >(
      variables: GetPersonListLetterCountsQueryVariables,
      options?: UseQueryOptions<GetPersonListLetterCountsQuery, TError, TData>
    ) =>
    useQuery<GetPersonListLetterCountsQuery, TError, TData>(
      ['getPersonListLetterCounts', variables],
      graphqlFetcher<GetPersonListLetterCountsQuery, GetPersonListLetterCountsQueryVariables>(GetPersonListLetterCountsDocument, variables),
      options
    );
export const useInfiniteGetPersonListLetterCountsQuery = <
      TData = GetPersonListLetterCountsQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetPersonListLetterCountsQueryVariables,
      variables: GetPersonListLetterCountsQueryVariables,
      options?: UseInfiniteQueryOptions<GetPersonListLetterCountsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetPersonListLetterCountsQuery, TError, TData>(
      ['getPersonListLetterCounts.infinite', variables],
      (metaData) => graphqlFetcher<GetPersonListLetterCountsQuery, GetPersonListLetterCountsQueryVariables>(GetPersonListLetterCountsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getPersonListLetterCounts<T>(
	variables: ExactAlt<T, GetPersonListLetterCountsQueryVariables>
): Promise<GetPersonListLetterCountsQuery> {
	return fetchApi(GetPersonListLetterCountsDocument, { variables });
}

import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';


export async function prefetchQueries<T>(
	vars: {
		getPersonListLetterCounts: ExactAlt<T, GetPersonListLetterCountsQueryVariables>
	},
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getPersonListLetterCounts', vars.getPersonListLetterCounts], () => getPersonListLetterCounts(vars.getPersonListLetterCounts), options),
		client.prefetchInfiniteQuery(['getPersonListLetterCounts.infinite', vars.getPersonListLetterCounts], () => getPersonListLetterCounts(vars.getPersonListLetterCounts), options),
	]);
	
	return client;
}
