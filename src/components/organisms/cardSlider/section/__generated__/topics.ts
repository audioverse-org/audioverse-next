import * as Types from '../../../../../__generated__/graphql';

import { CardTopicFragmentDoc } from '../../../../molecules/card/__generated__/topic';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetDiscoverTopicsQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.Scalars['Int']['input'];
  after: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetDiscoverTopicsQuery = { __typename?: 'Query', topics: { __typename?: 'TopicConnection', nodes: Array<{ __typename?: 'Topic', id: string | number, title: string, summary: string, canonicalPath: string, items: { __typename?: 'TopicItemConnection', nodes: Array<{ __typename?: 'TopicItem', entity: { __typename: 'Recording' } | { __typename: 'Sequence' } }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };


export const GetDiscoverTopicsDocument = `
    query getDiscoverTopics($language: Language!, $first: Int!, $after: String) {
  topics(
    language: $language
    first: $first
    after: $after
    orderBy: {field: ID, direction: DESC}
  ) {
    nodes {
      ...cardTopic
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${CardTopicFragmentDoc}`;
export const useGetDiscoverTopicsQuery = <
      TData = GetDiscoverTopicsQuery,
      TError = unknown
    >(
      variables: GetDiscoverTopicsQueryVariables,
      options?: UseQueryOptions<GetDiscoverTopicsQuery, TError, TData>
    ) =>
    useQuery<GetDiscoverTopicsQuery, TError, TData>(
      ['getDiscoverTopics', variables],
      graphqlFetcher<GetDiscoverTopicsQuery, GetDiscoverTopicsQueryVariables>(GetDiscoverTopicsDocument, variables),
      options
    );
export const useInfiniteGetDiscoverTopicsQuery = <
      TData = GetDiscoverTopicsQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetDiscoverTopicsQueryVariables,
      variables: GetDiscoverTopicsQueryVariables,
      options?: UseInfiniteQueryOptions<GetDiscoverTopicsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetDiscoverTopicsQuery, TError, TData>(
      ['getDiscoverTopics.infinite', variables],
      (metaData) => graphqlFetcher<GetDiscoverTopicsQuery, GetDiscoverTopicsQueryVariables>(GetDiscoverTopicsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getDiscoverTopics<T>(
	variables: ExactAlt<T, GetDiscoverTopicsQueryVariables>
): Promise<GetDiscoverTopicsQuery> {
	return fetchApi(GetDiscoverTopicsDocument, { variables });
}