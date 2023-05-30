import * as Types from '../../../__generated__/graphql';

import { useQuery, useInfiniteQuery, useMutation, UseQueryOptions, UseInfiniteQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type AndMiniplayerFragment = { __typename?: 'Recording', id: string | number, title: string, canonicalPath: string, duration: number, sequence: { __typename?: 'Sequence', title: string, contentType: Types.SequenceContentType } | null, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> };

export type GetRecordingPlaybackProgressQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetRecordingPlaybackProgressQuery = { __typename?: 'Query', recording: { __typename?: 'Recording', viewerPlaybackSession: { __typename?: 'RecordingPlaybackSession', positionPercentage: number } | null } | null };

export type RecordingPlaybackProgressSetMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  percentage: Types.Scalars['Float'];
}>;


export type RecordingPlaybackProgressSetMutation = { __typename?: 'Mutation', recordingPlaybackSessionAdvance: { __typename?: 'RecordingPayload', recording: { __typename?: 'Recording', viewerPlaybackSession: { __typename?: 'RecordingPlaybackSession', positionPercentage: number } | null } | null } };

export const AndMiniplayerFragmentDoc = `
    fragment andMiniplayer on Recording {
  id
  title
  canonicalPath(useFuturePath: true)
  duration
  sequence {
    title
    contentType
  }
  collection {
    title
  }
  audioFiles {
    url(requestType: STREAM)
    filesize
    mimeType
    duration
  }
  videoFiles(allowedContainers: [M4A, M4V, MOV, MP4]) {
    url(requestType: STREAM)
    filesize
    mimeType
    duration
  }
  videoStreams: videoFiles(allowedContainers: [M3U8_WEB]) {
    url(requestType: STREAM)
    logUrl
    filesize
    mimeType
    duration
  }
}
    `;
export const GetRecordingPlaybackProgressDocument = `
    query getRecordingPlaybackProgress($id: ID!) {
  recording(id: $id) {
    viewerPlaybackSession {
      positionPercentage
    }
  }
}
    `;
export const useGetRecordingPlaybackProgressQuery = <
      TData = GetRecordingPlaybackProgressQuery,
      TError = unknown
    >(
      variables: GetRecordingPlaybackProgressQueryVariables,
      options?: UseQueryOptions<GetRecordingPlaybackProgressQuery, TError, TData>
    ) =>
    useQuery<GetRecordingPlaybackProgressQuery, TError, TData>(
      ['getRecordingPlaybackProgress', variables],
      graphqlFetcher<GetRecordingPlaybackProgressQuery, GetRecordingPlaybackProgressQueryVariables>(GetRecordingPlaybackProgressDocument, variables),
      options
    );
export const useInfiniteGetRecordingPlaybackProgressQuery = <
      TData = GetRecordingPlaybackProgressQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetRecordingPlaybackProgressQueryVariables,
      variables: GetRecordingPlaybackProgressQueryVariables,
      options?: UseInfiniteQueryOptions<GetRecordingPlaybackProgressQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetRecordingPlaybackProgressQuery, TError, TData>(
      ['getRecordingPlaybackProgress.infinite', variables],
      (metaData) => graphqlFetcher<GetRecordingPlaybackProgressQuery, GetRecordingPlaybackProgressQueryVariables>(GetRecordingPlaybackProgressDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const RecordingPlaybackProgressSetDocument = `
    mutation recordingPlaybackProgressSet($id: ID!, $percentage: Float!) {
  recordingPlaybackSessionAdvance(
    recordingId: $id
    input: {positionPercentage: $percentage}
  ) {
    recording {
      viewerPlaybackSession {
        positionPercentage
      }
    }
  }
}
    `;
export const useRecordingPlaybackProgressSetMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RecordingPlaybackProgressSetMutation, TError, RecordingPlaybackProgressSetMutationVariables, TContext>) =>
    useMutation<RecordingPlaybackProgressSetMutation, TError, RecordingPlaybackProgressSetMutationVariables, TContext>(
      ['recordingPlaybackProgressSet'],
      (variables?: RecordingPlaybackProgressSetMutationVariables) => graphqlFetcher<RecordingPlaybackProgressSetMutation, RecordingPlaybackProgressSetMutationVariables>(RecordingPlaybackProgressSetDocument, variables)(),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function getRecordingPlaybackProgress<T>(
	variables: ExactAlt<T, GetRecordingPlaybackProgressQueryVariables>
): Promise<GetRecordingPlaybackProgressQuery> {
	return fetchApi(GetRecordingPlaybackProgressDocument, { variables });
}

export async function recordingPlaybackProgressSet<T>(
	variables: ExactAlt<T, RecordingPlaybackProgressSetMutationVariables>
): Promise<RecordingPlaybackProgressSetMutation> {
	return fetchApi(RecordingPlaybackProgressSetDocument, { variables });
}

import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';


export async function prefetchQueries<T>(
	vars: {
		getRecordingPlaybackProgress: ExactAlt<T, GetRecordingPlaybackProgressQueryVariables>
	},
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getRecordingPlaybackProgress', vars.getRecordingPlaybackProgress], () => getRecordingPlaybackProgress(vars.getRecordingPlaybackProgress), options),
		client.prefetchInfiniteQuery(['getRecordingPlaybackProgress.infinite', vars.getRecordingPlaybackProgress], () => getRecordingPlaybackProgress(vars.getRecordingPlaybackProgress), options),
	]);
	
	return client;
}
