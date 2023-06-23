import * as Types from '../../../__generated__/graphql';

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type RecordingIsFavoritedQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type RecordingIsFavoritedQuery = { __typename?: 'Query', recording: { __typename?: 'Recording', viewerHasFavorited: boolean } | null };


export const RecordingIsFavoritedDocument = `
    query recordingIsFavorited($id: ID!) {
  recording(id: $id) {
    viewerHasFavorited
  }
}
    `;
export const useRecordingIsFavoritedQuery = <
      TData = RecordingIsFavoritedQuery,
      TError = unknown
    >(
      variables: RecordingIsFavoritedQueryVariables,
      options?: UseQueryOptions<RecordingIsFavoritedQuery, TError, TData>
    ) =>
    useQuery<RecordingIsFavoritedQuery, TError, TData>(
      ['recordingIsFavorited', variables],
      graphqlFetcher<RecordingIsFavoritedQuery, RecordingIsFavoritedQueryVariables>(RecordingIsFavoritedDocument, variables),
      options
    );
export const useInfiniteRecordingIsFavoritedQuery = <
      TData = RecordingIsFavoritedQuery,
      TError = unknown
    >(
      pageParamKey: keyof RecordingIsFavoritedQueryVariables,
      variables: RecordingIsFavoritedQueryVariables,
      options?: UseInfiniteQueryOptions<RecordingIsFavoritedQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<RecordingIsFavoritedQuery, TError, TData>(
      ['recordingIsFavorited.infinite', variables],
      (metaData) => graphqlFetcher<RecordingIsFavoritedQuery, RecordingIsFavoritedQueryVariables>(RecordingIsFavoritedDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function recordingIsFavorited<T>(
	variables: ExactAlt<T, RecordingIsFavoritedQueryVariables>
): Promise<RecordingIsFavoritedQuery> {
	return fetchApi(RecordingIsFavoritedDocument, { variables });
}

import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';


export async function prefetchQueries<T>(
	vars: {
		recordingIsFavorited: ExactAlt<T, RecordingIsFavoritedQueryVariables>
	},
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['recordingIsFavorited', vars.recordingIsFavorited], () => recordingIsFavorited(vars.recordingIsFavorited), options),
		client.prefetchInfiniteQuery(['recordingIsFavorited.infinite', vars.recordingIsFavorited], () => recordingIsFavorited(vars.recordingIsFavorited), options),
	]);
	
	return client;
}
