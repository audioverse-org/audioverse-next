import * as Types from '../../../../../__generated__/graphql';

import { CardPersonFragmentDoc } from '../../../../molecules/card/__generated__/person';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetSectionPresentersQueryVariables = Types.Exact<{
  language: Types.Language;
  first?: Types.Scalars['Int']['input'];
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetSectionPresentersQuery = { __typename?: 'Query', persons: { __typename?: 'PersonConnection', nodes: Array<{ __typename: 'Person', id: string | number, name: string, canonicalPath: string, image: { __typename?: 'Image', id: string | number, url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };


export const GetSectionPresentersDocument = `
    query getSectionPresenters($language: Language!, $first: Int! = 3, $after: String = null) {
  persons(
    language: $language
    first: $first
    after: $after
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardPerson
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${CardPersonFragmentDoc}`;
export const useGetSectionPresentersQuery = <
      TData = GetSectionPresentersQuery,
      TError = unknown
    >(
      variables: GetSectionPresentersQueryVariables,
      options?: UseQueryOptions<GetSectionPresentersQuery, TError, TData>
    ) =>
    useQuery<GetSectionPresentersQuery, TError, TData>(
      ['getSectionPresenters', variables],
      graphqlFetcher<GetSectionPresentersQuery, GetSectionPresentersQueryVariables>(GetSectionPresentersDocument, variables),
      options
    );
export const useInfiniteGetSectionPresentersQuery = <
      TData = GetSectionPresentersQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetSectionPresentersQueryVariables,
      variables: GetSectionPresentersQueryVariables,
      options?: UseInfiniteQueryOptions<GetSectionPresentersQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetSectionPresentersQuery, TError, TData>(
      ['getSectionPresenters.infinite', variables],
      (metaData) => graphqlFetcher<GetSectionPresentersQuery, GetSectionPresentersQueryVariables>(GetSectionPresentersDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getSectionPresenters<T>(
	variables: ExactAlt<T, GetSectionPresentersQueryVariables>
): Promise<GetSectionPresentersQuery> {
	return fetchApi(GetSectionPresentersDocument, { variables });
}