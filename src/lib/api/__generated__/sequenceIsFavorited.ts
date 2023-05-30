import * as Types from '../../../__generated__/graphql';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type SequenceIsFavoritedQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type SequenceIsFavoritedQuery = { __typename?: 'Query', sequence: { __typename?: 'Sequence', viewerHasFavorited: boolean, viewerPlaybackCompletedPercentage: number, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } } | null };


export const SequenceIsFavoritedDocument = `
    query sequenceIsFavorited($id: ID!) {
  sequence(id: $id) {
    viewerHasFavorited
    viewerPlaybackCompletedPercentage
    recordings(viewerHasFavorited: true) {
      aggregate {
        count
      }
    }
  }
}
    `;
export const useSequenceIsFavoritedQuery = <
      TData = SequenceIsFavoritedQuery,
      TError = unknown
    >(
      variables: SequenceIsFavoritedQueryVariables,
      options?: UseQueryOptions<SequenceIsFavoritedQuery, TError, TData>
    ) =>
    useQuery<SequenceIsFavoritedQuery, TError, TData>(
      ['sequenceIsFavorited', variables],
      graphqlFetcher<SequenceIsFavoritedQuery, SequenceIsFavoritedQueryVariables>(SequenceIsFavoritedDocument, variables),
      options
    );
export const useInfiniteSequenceIsFavoritedQuery = <
      TData = SequenceIsFavoritedQuery,
      TError = unknown
    >(
      variables: SequenceIsFavoritedQueryVariables,
      options?: UseInfiniteQueryOptions<SequenceIsFavoritedQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<SequenceIsFavoritedQuery, TError, TData>(
      ['sequenceIsFavorited.infinite', variables],
      (metaData) => graphqlFetcher<SequenceIsFavoritedQuery, SequenceIsFavoritedQueryVariables>(SequenceIsFavoritedDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function sequenceIsFavorited<T>(
	variables: ExactAlt<T, SequenceIsFavoritedQueryVariables>
): Promise<SequenceIsFavoritedQuery> {
	return fetchApi(SequenceIsFavoritedDocument, { variables });
}
import { QueryClient } from '@tanstack/react-query';

export async function prefetchQueries<T>(
	vars: {
		sequenceIsFavorited: ExactAlt<T, SequenceIsFavoritedQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['sequenceIsFavorited', vars.sequenceIsFavorited], () => sequenceIsFavorited(vars.sequenceIsFavorited), options),
		client.prefetchInfiniteQuery(['sequenceIsFavorited.infinite', vars.sequenceIsFavorited], () => sequenceIsFavorited(vars.sequenceIsFavorited), options),
	]);
	
	return client;
}