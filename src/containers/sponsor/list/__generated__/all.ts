import * as Types from '../../../../__generated__/graphql';

import { SponsorListEntryFragmentDoc } from './list';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetSponsorListAllPageDataQueryVariables = Types.Exact<{
  language: Types.Language;
  after: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetSponsorListAllPageDataQuery = { __typename?: 'Query', sponsors: { __typename?: 'SponsorConnection', nodes: Array<{ __typename?: 'Sponsor', canonicalPath: string, title: string, image: { __typename?: 'Image', url: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };


export const GetSponsorListAllPageDataDocument = `
    query getSponsorListAllPageData($language: Language!, $after: String) {
  sponsors(
    language: $language
    orderBy: [{field: TITLE, direction: ASC}]
    first: 20
    after: $after
  ) {
    nodes {
      ...sponsorListEntry
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${SponsorListEntryFragmentDoc}`;
export const useGetSponsorListAllPageDataQuery = <
      TData = GetSponsorListAllPageDataQuery,
      TError = unknown
    >(
      variables: GetSponsorListAllPageDataQueryVariables,
      options?: UseQueryOptions<GetSponsorListAllPageDataQuery, TError, TData>
    ) =>
    useQuery<GetSponsorListAllPageDataQuery, TError, TData>(
      ['getSponsorListAllPageData', variables],
      graphqlFetcher<GetSponsorListAllPageDataQuery, GetSponsorListAllPageDataQueryVariables>(GetSponsorListAllPageDataDocument, variables),
      options
    );
export const useInfiniteGetSponsorListAllPageDataQuery = <
      TData = GetSponsorListAllPageDataQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetSponsorListAllPageDataQueryVariables,
      variables: GetSponsorListAllPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetSponsorListAllPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetSponsorListAllPageDataQuery, TError, TData>(
      ['getSponsorListAllPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetSponsorListAllPageDataQuery, GetSponsorListAllPageDataQueryVariables>(GetSponsorListAllPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getSponsorListAllPageData<T>(
	variables: ExactAlt<T, GetSponsorListAllPageDataQueryVariables>
): Promise<GetSponsorListAllPageDataQuery> {
	return fetchApi(GetSponsorListAllPageDataDocument, { variables });
}

import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';


export async function prefetchQueries<T>(
	vars: {
		getSponsorListAllPageData: ExactAlt<T, GetSponsorListAllPageDataQueryVariables>
	},
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getSponsorListAllPageData', vars.getSponsorListAllPageData], () => getSponsorListAllPageData(vars.getSponsorListAllPageData), options),
		client.prefetchInfiniteQuery(['getSponsorListAllPageData.infinite', vars.getSponsorListAllPageData], () => getSponsorListAllPageData(vars.getSponsorListAllPageData), options),
	]);
	
	return client;
}
