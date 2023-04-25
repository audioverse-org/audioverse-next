import * as Types from '../../../../__generated__/graphql';

import { SponsorListEntryFragmentDoc } from './list';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetSponsorListLetterPageDataQueryVariables = Types.Exact<{
  language: Types.Language;
  startsWith: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetSponsorListLetterPageDataQuery = { __typename?: 'Query', sponsors: { __typename?: 'SponsorConnection', nodes: Array<{ __typename?: 'Sponsor', canonicalPath: string, title: string, image: { __typename?: 'Image', url: string } | null }> | null }, sponsorLetterCounts: Array<{ __typename?: 'LetterCount', letter: string, count: number }> };


export const GetSponsorListLetterPageDataDocument = `
    query getSponsorListLetterPageData($language: Language!, $startsWith: String) {
  sponsors(
    language: $language
    startsWith: $startsWith
    first: 1500
    orderBy: [{field: TITLE, direction: ASC}]
  ) {
    nodes {
      ...sponsorListEntry
    }
  }
  sponsorLetterCounts(language: $language) {
    letter
    count
  }
}
    ${SponsorListEntryFragmentDoc}`;
export const useGetSponsorListLetterPageDataQuery = <
      TData = GetSponsorListLetterPageDataQuery,
      TError = unknown
    >(
      variables: GetSponsorListLetterPageDataQueryVariables,
      options?: UseQueryOptions<GetSponsorListLetterPageDataQuery, TError, TData>
    ) =>
    useQuery<GetSponsorListLetterPageDataQuery, TError, TData>(
      ['getSponsorListLetterPageData', variables],
      graphqlFetcher<GetSponsorListLetterPageDataQuery, GetSponsorListLetterPageDataQueryVariables>(GetSponsorListLetterPageDataDocument, variables),
      options
    );
export const useInfiniteGetSponsorListLetterPageDataQuery = <
      TData = GetSponsorListLetterPageDataQuery,
      TError = unknown
    >(
      variables: GetSponsorListLetterPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetSponsorListLetterPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetSponsorListLetterPageDataQuery, TError, TData>(
      ['getSponsorListLetterPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetSponsorListLetterPageDataQuery, GetSponsorListLetterPageDataQueryVariables>(GetSponsorListLetterPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getSponsorListLetterPageData<T>(
	variables: ExactAlt<T, GetSponsorListLetterPageDataQueryVariables>
): Promise<GetSponsorListLetterPageDataQuery> {
	return fetchApi(GetSponsorListLetterPageDataDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getSponsorListLetterPageData: ExactAlt<T, GetSponsorListLetterPageDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getSponsorListLetterPageData', () => getSponsorListLetterPageData(vars.getSponsorListLetterPageData)],
		['getSponsorListLetterPageData.infinite', () => getSponsorListLetterPageData(vars.getSponsorListLetterPageData)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}