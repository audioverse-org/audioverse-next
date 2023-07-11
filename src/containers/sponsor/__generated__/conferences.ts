import * as Types from '../../../__generated__/graphql';

import { SponsorPivotFragmentDoc } from './pivot';
import { CardCollectionFragmentDoc } from '../../../components/molecules/card/__generated__/collection';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetSponsorConferencesPageDataQueryVariables = Types.Exact<{
  language: Types.Language;
  id: Types.Scalars['ID']['input'];
  offset: Types.InputMaybe<Types.Scalars['Int']['input']>;
  first: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetSponsorConferencesPageDataQuery = { __typename?: 'Query', sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, collections: { __typename?: 'CollectionConnection', nodes: Array<{ __typename: 'Collection', id: string | number, canonicalPath: string, title: string, startDate: string | null, endDate: string | null, duration: number, collectionContentType: Types.CollectionContentType, image: { __typename?: 'Image', id: string | number, url: string } | null, allSequences: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, allRecordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } };

export type GetSponsorConferencesPathsDataQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetSponsorConferencesPathsDataQuery = { __typename?: 'Query', sponsors: { __typename?: 'SponsorConnection', nodes: Array<{ __typename?: 'Sponsor', id: string | number }> | null } };


export const GetSponsorConferencesPageDataDocument = `
    query getSponsorConferencesPageData($language: Language!, $id: ID!, $offset: Int, $first: Int) {
  sponsor(id: $id) {
    ...sponsorPivot
  }
  collections(
    language: $language
    sponsorId: $id
    offset: $offset
    first: $first
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardCollection
    }
    aggregate {
      count
    }
  }
}
    ${SponsorPivotFragmentDoc}
${CardCollectionFragmentDoc}`;
export const useGetSponsorConferencesPageDataQuery = <
      TData = GetSponsorConferencesPageDataQuery,
      TError = unknown
    >(
      variables: GetSponsorConferencesPageDataQueryVariables,
      options?: UseQueryOptions<GetSponsorConferencesPageDataQuery, TError, TData>
    ) =>
    useQuery<GetSponsorConferencesPageDataQuery, TError, TData>(
      ['getSponsorConferencesPageData', variables],
      graphqlFetcher<GetSponsorConferencesPageDataQuery, GetSponsorConferencesPageDataQueryVariables>(GetSponsorConferencesPageDataDocument, variables),
      options
    );
export const useInfiniteGetSponsorConferencesPageDataQuery = <
      TData = GetSponsorConferencesPageDataQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetSponsorConferencesPageDataQueryVariables,
      variables: GetSponsorConferencesPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetSponsorConferencesPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetSponsorConferencesPageDataQuery, TError, TData>(
      ['getSponsorConferencesPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetSponsorConferencesPageDataQuery, GetSponsorConferencesPageDataQueryVariables>(GetSponsorConferencesPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetSponsorConferencesPathsDataDocument = `
    query getSponsorConferencesPathsData($language: Language!, $first: Int) {
  sponsors(language: $language, first: $first) {
    nodes {
      id
    }
  }
}
    `;
export const useGetSponsorConferencesPathsDataQuery = <
      TData = GetSponsorConferencesPathsDataQuery,
      TError = unknown
    >(
      variables: GetSponsorConferencesPathsDataQueryVariables,
      options?: UseQueryOptions<GetSponsorConferencesPathsDataQuery, TError, TData>
    ) =>
    useQuery<GetSponsorConferencesPathsDataQuery, TError, TData>(
      ['getSponsorConferencesPathsData', variables],
      graphqlFetcher<GetSponsorConferencesPathsDataQuery, GetSponsorConferencesPathsDataQueryVariables>(GetSponsorConferencesPathsDataDocument, variables),
      options
    );
export const useInfiniteGetSponsorConferencesPathsDataQuery = <
      TData = GetSponsorConferencesPathsDataQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetSponsorConferencesPathsDataQueryVariables,
      variables: GetSponsorConferencesPathsDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetSponsorConferencesPathsDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetSponsorConferencesPathsDataQuery, TError, TData>(
      ['getSponsorConferencesPathsData.infinite', variables],
      (metaData) => graphqlFetcher<GetSponsorConferencesPathsDataQuery, GetSponsorConferencesPathsDataQueryVariables>(GetSponsorConferencesPathsDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getSponsorConferencesPageData<T>(
	variables: ExactAlt<T, GetSponsorConferencesPageDataQueryVariables>
): Promise<GetSponsorConferencesPageDataQuery> {
	return fetchApi(GetSponsorConferencesPageDataDocument, { variables });
}

export async function getSponsorConferencesPathsData<T>(
	variables: ExactAlt<T, GetSponsorConferencesPathsDataQueryVariables>
): Promise<GetSponsorConferencesPathsDataQuery> {
	return fetchApi(GetSponsorConferencesPathsDataDocument, { variables });
}