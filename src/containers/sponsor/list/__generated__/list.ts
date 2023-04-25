import * as Types from '../../../../__generated__/graphql';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type SponsorListEntryFragment = { __typename?: 'Sponsor', canonicalPath: string, title: string, image: { __typename?: 'Image', url: string } | null };

export type GetSponsorListLetterCountsQueryVariables = Types.Exact<{
  language: Types.Language;
}>;


export type GetSponsorListLetterCountsQuery = { __typename?: 'Query', sponsorLetterCounts: Array<{ __typename?: 'LetterCount', letter: string, count: number }> };

export const SponsorListEntryFragmentDoc = `
    fragment sponsorListEntry on Sponsor {
  canonicalPath(useFuturePath: true)
  title
  image {
    url(size: 128)
  }
}
    `;
export const GetSponsorListLetterCountsDocument = `
    query getSponsorListLetterCounts($language: Language!) {
  sponsorLetterCounts(language: $language) {
    letter
    count
  }
}
    `;
export const useGetSponsorListLetterCountsQuery = <
      TData = GetSponsorListLetterCountsQuery,
      TError = unknown
    >(
      variables: GetSponsorListLetterCountsQueryVariables,
      options?: UseQueryOptions<GetSponsorListLetterCountsQuery, TError, TData>
    ) =>
    useQuery<GetSponsorListLetterCountsQuery, TError, TData>(
      ['getSponsorListLetterCounts', variables],
      graphqlFetcher<GetSponsorListLetterCountsQuery, GetSponsorListLetterCountsQueryVariables>(GetSponsorListLetterCountsDocument, variables),
      options
    );
export const useInfiniteGetSponsorListLetterCountsQuery = <
      TData = GetSponsorListLetterCountsQuery,
      TError = unknown
    >(
      variables: GetSponsorListLetterCountsQueryVariables,
      options?: UseInfiniteQueryOptions<GetSponsorListLetterCountsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetSponsorListLetterCountsQuery, TError, TData>(
      ['getSponsorListLetterCounts.infinite', variables],
      (metaData) => graphqlFetcher<GetSponsorListLetterCountsQuery, GetSponsorListLetterCountsQueryVariables>(GetSponsorListLetterCountsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getSponsorListLetterCounts<T>(
	variables: ExactAlt<T, GetSponsorListLetterCountsQueryVariables>
): Promise<GetSponsorListLetterCountsQuery> {
	return fetchApi(GetSponsorListLetterCountsDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getSponsorListLetterCounts: ExactAlt<T, GetSponsorListLetterCountsQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getSponsorListLetterCounts', () => getSponsorListLetterCounts(vars.getSponsorListLetterCounts)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}