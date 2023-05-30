import * as Types from '../../../__generated__/graphql';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type SponsorIsFavoritedQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type SponsorIsFavoritedQuery = { __typename?: 'Query', sponsor: { __typename?: 'Sponsor', viewerHasFavorited: boolean } | null };


export const SponsorIsFavoritedDocument = `
    query sponsorIsFavorited($id: ID!) {
  sponsor(id: $id) {
    viewerHasFavorited
  }
}
    `;
export const useSponsorIsFavoritedQuery = <
      TData = SponsorIsFavoritedQuery,
      TError = unknown
    >(
      variables: SponsorIsFavoritedQueryVariables,
      options?: UseQueryOptions<SponsorIsFavoritedQuery, TError, TData>
    ) =>
    useQuery<SponsorIsFavoritedQuery, TError, TData>(
      ['sponsorIsFavorited', variables],
      graphqlFetcher<SponsorIsFavoritedQuery, SponsorIsFavoritedQueryVariables>(SponsorIsFavoritedDocument, variables),
      options
    );
export const useInfiniteSponsorIsFavoritedQuery = <
      TData = SponsorIsFavoritedQuery,
      TError = unknown
    >(
      variables: SponsorIsFavoritedQueryVariables,
      options?: UseInfiniteQueryOptions<SponsorIsFavoritedQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<SponsorIsFavoritedQuery, TError, TData>(
      ['sponsorIsFavorited.infinite', variables],
      (metaData) => graphqlFetcher<SponsorIsFavoritedQuery, SponsorIsFavoritedQueryVariables>(SponsorIsFavoritedDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function sponsorIsFavorited<T>(
	variables: ExactAlt<T, SponsorIsFavoritedQueryVariables>
): Promise<SponsorIsFavoritedQuery> {
	return fetchApi(SponsorIsFavoritedDocument, { variables });
}
import { QueryClient } from '@tanstack/react-query';

export async function prefetchQueries<T>(
	vars: {
		sponsorIsFavorited: ExactAlt<T, SponsorIsFavoritedQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['sponsorIsFavorited', vars.sponsorIsFavorited], () => sponsorIsFavorited(vars.sponsorIsFavorited), options),
		client.prefetchInfiniteQuery(['sponsorIsFavorited.infinite', vars.sponsorIsFavorited], () => sponsorIsFavorited(vars.sponsorIsFavorited), options),
	]);
	
	return client;
}