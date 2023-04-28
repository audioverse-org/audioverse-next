import * as Types from '../../../__generated__/graphql';

import { CardSponsorFragmentDoc } from '../../../components/molecules/card/__generated__/sponsor';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetSearchResultsSponsorsQueryVariables = Types.Exact<{
  language: Types.Language;
  term: Types.Scalars['String'];
  first: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
}>;


export type GetSearchResultsSponsorsQuery = { __typename?: 'Query', sponsors: { __typename?: 'SponsorConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null, collections: { __typename?: 'CollectionConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, sequences: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } }> | null } };


export const GetSearchResultsSponsorsDocument = `
    query getSearchResultsSponsors($language: Language!, $term: String!, $first: Int!, $offset: Int!) {
  sponsors(language: $language, search: $term, first: $first, offset: $offset) {
    aggregate {
      count
    }
    nodes {
      ...cardSponsor
    }
  }
}
    ${CardSponsorFragmentDoc}`;
export const useGetSearchResultsSponsorsQuery = <
      TData = GetSearchResultsSponsorsQuery,
      TError = unknown
    >(
      variables: GetSearchResultsSponsorsQueryVariables,
      options?: UseQueryOptions<GetSearchResultsSponsorsQuery, TError, TData>
    ) =>
    useQuery<GetSearchResultsSponsorsQuery, TError, TData>(
      ['getSearchResultsSponsors', variables],
      graphqlFetcher<GetSearchResultsSponsorsQuery, GetSearchResultsSponsorsQueryVariables>(GetSearchResultsSponsorsDocument, variables),
      options
    );
export const useInfiniteGetSearchResultsSponsorsQuery = <
      TData = GetSearchResultsSponsorsQuery,
      TError = unknown
    >(
      variables: GetSearchResultsSponsorsQueryVariables,
      options?: UseInfiniteQueryOptions<GetSearchResultsSponsorsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetSearchResultsSponsorsQuery, TError, TData>(
      ['getSearchResultsSponsors.infinite', variables],
      (metaData) => graphqlFetcher<GetSearchResultsSponsorsQuery, GetSearchResultsSponsorsQueryVariables>(GetSearchResultsSponsorsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getSearchResultsSponsors<T>(
	variables: ExactAlt<T, GetSearchResultsSponsorsQueryVariables>
): Promise<GetSearchResultsSponsorsQuery> {
	return fetchApi(GetSearchResultsSponsorsDocument, { variables });
}
import { QueryClient, QueryKey } from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getSearchResultsSponsors: ExactAlt<T, GetSearchResultsSponsorsQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	const promises = [
		client.prefetchQuery(['getSearchResultsSponsors', vars.getSearchResultsSponsors], () => getSearchResultsSponsors(vars.getSearchResultsSponsors), options),
		client.prefetchInfiniteQuery(['getSearchResultsSponsors.infinite', vars.getSearchResultsSponsors], () => getSearchResultsSponsors(vars.getSearchResultsSponsors), options),
	]

	await Promise.all(promises);
	
	return client;
}