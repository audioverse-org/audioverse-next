import * as Types from '../../../../../__generated__/graphql';

import { CardSponsorFragmentDoc } from '../../../../molecules/card/__generated__/sponsor';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetSectionSponsorsQueryVariables = Types.Exact<{
  language: Types.Language;
  first?: Types.Scalars['Int']['input'];
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetSectionSponsorsQuery = { __typename?: 'Query', sponsors: { __typename?: 'SponsorConnection', nodes: Array<{ __typename: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null, collections: { __typename?: 'CollectionConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, sequences: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };


export const GetSectionSponsorsDocument = `
    query getSectionSponsors($language: Language!, $first: Int! = 3, $after: String = null) {
  sponsors(
    language: $language
    first: $first
    after: $after
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardSponsor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${CardSponsorFragmentDoc}`;
export const useGetSectionSponsorsQuery = <
      TData = GetSectionSponsorsQuery,
      TError = unknown
    >(
      variables: GetSectionSponsorsQueryVariables,
      options?: UseQueryOptions<GetSectionSponsorsQuery, TError, TData>
    ) =>
    useQuery<GetSectionSponsorsQuery, TError, TData>(
      ['getSectionSponsors', variables],
      graphqlFetcher<GetSectionSponsorsQuery, GetSectionSponsorsQueryVariables>(GetSectionSponsorsDocument, variables),
      options
    );
export const useInfiniteGetSectionSponsorsQuery = <
      TData = GetSectionSponsorsQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetSectionSponsorsQueryVariables,
      variables: GetSectionSponsorsQueryVariables,
      options?: UseInfiniteQueryOptions<GetSectionSponsorsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetSectionSponsorsQuery, TError, TData>(
      ['getSectionSponsors.infinite', variables],
      (metaData) => graphqlFetcher<GetSectionSponsorsQuery, GetSectionSponsorsQueryVariables>(GetSectionSponsorsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getSectionSponsors<T>(
	variables: ExactAlt<T, GetSectionSponsorsQueryVariables>
): Promise<GetSectionSponsorsQuery> {
	return fetchApi(GetSectionSponsorsDocument, { variables });
}