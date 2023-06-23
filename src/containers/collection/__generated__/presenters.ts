import * as Types from '../../../__generated__/graphql';

import { CollectionPivotFragmentDoc } from './pivot';
import { CardPersonFragmentDoc } from '../../../components/molecules/card/__generated__/person';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetCollectionPresentersPageDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  offset: Types.InputMaybe<Types.Scalars['Int']['input']>;
  first: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetCollectionPresentersPageDataQuery = { __typename?: 'Query', collection: { __typename?: 'Collection', id: string | number, title: string, canonicalPath: string, contentType: Types.CollectionContentType, persons: { __typename?: 'PersonConnection', nodes: Array<{ __typename: 'Person', id: string | number, name: string, canonicalPath: string, image: { __typename?: 'Image', id: string | number, url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } } | null };


export const GetCollectionPresentersPageDataDocument = `
    query getCollectionPresentersPageData($id: ID!, $offset: Int, $first: Int) {
  collection(id: $id) {
    id
    ...collectionPivot
    persons(
      role: SPEAKER
      offset: $offset
      first: $first
      orderBy: [{field: NAME, direction: ASC}]
    ) {
      nodes {
        ...cardPerson
      }
      aggregate {
        count
      }
    }
  }
}
    ${CollectionPivotFragmentDoc}
${CardPersonFragmentDoc}`;
export const useGetCollectionPresentersPageDataQuery = <
      TData = GetCollectionPresentersPageDataQuery,
      TError = unknown
    >(
      variables: GetCollectionPresentersPageDataQueryVariables,
      options?: UseQueryOptions<GetCollectionPresentersPageDataQuery, TError, TData>
    ) =>
    useQuery<GetCollectionPresentersPageDataQuery, TError, TData>(
      ['getCollectionPresentersPageData', variables],
      graphqlFetcher<GetCollectionPresentersPageDataQuery, GetCollectionPresentersPageDataQueryVariables>(GetCollectionPresentersPageDataDocument, variables),
      options
    );
export const useInfiniteGetCollectionPresentersPageDataQuery = <
      TData = GetCollectionPresentersPageDataQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetCollectionPresentersPageDataQueryVariables,
      variables: GetCollectionPresentersPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetCollectionPresentersPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetCollectionPresentersPageDataQuery, TError, TData>(
      ['getCollectionPresentersPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetCollectionPresentersPageDataQuery, GetCollectionPresentersPageDataQueryVariables>(GetCollectionPresentersPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getCollectionPresentersPageData<T>(
	variables: ExactAlt<T, GetCollectionPresentersPageDataQueryVariables>
): Promise<GetCollectionPresentersPageDataQuery> {
	return fetchApi(GetCollectionPresentersPageDataDocument, { variables });
}

import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';


export async function prefetchQueries<T>(
	vars: {
		getCollectionPresentersPageData: ExactAlt<T, GetCollectionPresentersPageDataQueryVariables>
	},
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getCollectionPresentersPageData', vars.getCollectionPresentersPageData], () => getCollectionPresentersPageData(vars.getCollectionPresentersPageData), options),
		client.prefetchInfiniteQuery(['getCollectionPresentersPageData.infinite', vars.getCollectionPresentersPageData], () => getCollectionPresentersPageData(vars.getCollectionPresentersPageData), options),
	]);
	
	return client;
}
