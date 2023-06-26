import * as Types from '../../../__generated__/graphql';

import { CollectionPivotFragmentDoc } from './pivot';
import { CardSequenceFragmentDoc } from '../../../components/molecules/card/__generated__/sequence';
import { PersonLockupFragmentDoc } from '../../../components/molecules/__generated__/personLockup';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetCollectionSequencesPageDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  offset: Types.InputMaybe<Types.Scalars['Int']['input']>;
  first: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetCollectionSequencesPageDataQuery = { __typename?: 'Query', collection: { __typename?: 'Collection', id: string | number, title: string, canonicalPath: string, contentType: Types.CollectionContentType, sequences: { __typename?: 'SequenceConnection', nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } } | null };


export const GetCollectionSequencesPageDataDocument = `
    query getCollectionSequencesPageData($id: ID!, $offset: Int, $first: Int) {
  collection(id: $id) {
    id
    ...collectionPivot
    sequences(
      offset: $offset
      first: $first
      orderBy: [{field: TITLE, direction: ASC}]
    ) {
      nodes {
        ...cardSequence
      }
      aggregate {
        count
      }
    }
  }
}
    ${CollectionPivotFragmentDoc}
${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}`;
export const useGetCollectionSequencesPageDataQuery = <
      TData = GetCollectionSequencesPageDataQuery,
      TError = unknown
    >(
      variables: GetCollectionSequencesPageDataQueryVariables,
      options?: UseQueryOptions<GetCollectionSequencesPageDataQuery, TError, TData>
    ) =>
    useQuery<GetCollectionSequencesPageDataQuery, TError, TData>(
      ['getCollectionSequencesPageData', variables],
      graphqlFetcher<GetCollectionSequencesPageDataQuery, GetCollectionSequencesPageDataQueryVariables>(GetCollectionSequencesPageDataDocument, variables),
      options
    );
export const useInfiniteGetCollectionSequencesPageDataQuery = <
      TData = GetCollectionSequencesPageDataQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetCollectionSequencesPageDataQueryVariables,
      variables: GetCollectionSequencesPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetCollectionSequencesPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetCollectionSequencesPageDataQuery, TError, TData>(
      ['getCollectionSequencesPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetCollectionSequencesPageDataQuery, GetCollectionSequencesPageDataQueryVariables>(GetCollectionSequencesPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getCollectionSequencesPageData<T>(
	variables: ExactAlt<T, GetCollectionSequencesPageDataQueryVariables>
): Promise<GetCollectionSequencesPageDataQuery> {
	return fetchApi(GetCollectionSequencesPageDataDocument, { variables });
}

import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';


export async function prefetchQueries<T>(
	vars: {
		getCollectionSequencesPageData: ExactAlt<T, GetCollectionSequencesPageDataQueryVariables>
	},
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getCollectionSequencesPageData', vars.getCollectionSequencesPageData], () => getCollectionSequencesPageData(vars.getCollectionSequencesPageData), options),
		client.prefetchInfiniteQuery(['getCollectionSequencesPageData.infinite', vars.getCollectionSequencesPageData], () => getCollectionSequencesPageData(vars.getCollectionSequencesPageData), options),
	]);
	
	return client;
}
