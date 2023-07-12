import * as Types from '../../../../../__generated__/graphql';

import { CardTopicFragmentDoc } from '../../../../molecules/card/__generated__/topic';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetSectionTopicsQueryVariables = Types.Exact<{
  language: Types.Language;
  first?: Types.Scalars['Int']['input'];
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetSectionTopicsQuery = { __typename?: 'Query', topics: { __typename?: 'TopicConnection', nodes: Array<{ __typename?: 'Topic', id: string | number, title: string, summary: string, canonicalPath: string, items: { __typename?: 'TopicItemConnection', nodes: Array<{ __typename?: 'TopicItem', entity: { __typename: 'Recording' } | { __typename: 'Sequence' } }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };


export const GetSectionTopicsDocument = `
    query getSectionTopics($language: Language!, $first: Int! = 6, $after: String = null) {
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
export const useGetSectionTopicsQuery = <
      TData = GetSectionTopicsQuery,
      TError = unknown
    >(
      variables: GetSectionTopicsQueryVariables,
      options?: UseQueryOptions<GetSectionTopicsQuery, TError, TData>
    ) =>
    useQuery<GetSectionTopicsQuery, TError, TData>(
      ['getSectionTopics', variables],
      graphqlFetcher<GetSectionTopicsQuery, GetSectionTopicsQueryVariables>(GetSectionTopicsDocument, variables),
      options
    );
export const useInfiniteGetSectionTopicsQuery = <
      TData = GetSectionTopicsQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetSectionTopicsQueryVariables,
      variables: GetSectionTopicsQueryVariables,
      options?: UseInfiniteQueryOptions<GetSectionTopicsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetSectionTopicsQuery, TError, TData>(
      ['getSectionTopics.infinite', variables],
      (metaData) => graphqlFetcher<GetSectionTopicsQuery, GetSectionTopicsQueryVariables>(GetSectionTopicsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getSectionTopics<T>(
	variables: ExactAlt<T, GetSectionTopicsQueryVariables>
): Promise<GetSectionTopicsQuery> {
	return fetchApi(GetSectionTopicsDocument, { variables });
}