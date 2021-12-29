import * as Types from '../../lib/generated/graphql';

import {
	useQuery,
	UseQueryOptions,
	useMutation,
	UseMutationOptions,
} from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type AndMiniplayerFragment = {
	__typename?: 'Recording';
	id: string | number;
	title: string;
	canonicalPath: string;
	duration: number;
	sequence:
		| {
				__typename?: 'Sequence';
				title: string;
				contentType: Types.SequenceContentType;
		  }
		| null
		| undefined;
	audioFiles: Array<{
		__typename?: 'AudioFile';
		url: string;
		filesize: string;
		mimeType: string;
		duration: number;
	}>;
	videoFiles: Array<{
		__typename?: 'VideoFile';
		url: string;
		filesize: string;
		mimeType: string;
		duration: number;
	}>;
	videoStreams: Array<{
		__typename?: 'VideoFile';
		url: string;
		filesize: string;
		mimeType: string;
		duration: number;
	}>;
};

export type GetRecordingPlaybackProgressQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type GetRecordingPlaybackProgressQuery = {
	__typename?: 'Query';
	recording:
		| {
				__typename?: 'Recording';
				viewerPlaybackSession:
					| {
							__typename?: 'RecordingPlaybackSession';
							positionPercentage: number;
					  }
					| null
					| undefined;
		  }
		| null
		| undefined;
};

export type RecordingPlaybackProgressSetMutationVariables = Types.Exact<{
	id: Types.Scalars['ID'];
	percentage: Types.Scalars['Float'];
}>;

export type RecordingPlaybackProgressSetMutation = {
	__typename?: 'Mutation';
	recordingPlaybackSessionAdvance: {
		__typename?: 'RecordingPayload';
		recording:
			| {
					__typename?: 'Recording';
					viewerPlaybackSession:
						| {
								__typename?: 'RecordingPlaybackSession';
								positionPercentage: number;
						  }
						| null
						| undefined;
			  }
			| null
			| undefined;
	};
};

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
  audioFiles {
    url
    filesize
    mimeType
    duration
  }
  videoFiles(allowedContainers: [M4A, M4V, MOV, MP4]) {
    url
    filesize
    mimeType
    duration
  }
  videoStreams: videoFiles(allowedContainers: [M3U8_WEB]) {
    url
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
		graphqlFetcher<
			GetRecordingPlaybackProgressQuery,
			GetRecordingPlaybackProgressQueryVariables
		>(GetRecordingPlaybackProgressDocument, variables),
		options
	);
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
>(
	options?: UseMutationOptions<
		RecordingPlaybackProgressSetMutation,
		TError,
		RecordingPlaybackProgressSetMutationVariables,
		TContext
	>
) =>
	useMutation<
		RecordingPlaybackProgressSetMutation,
		TError,
		RecordingPlaybackProgressSetMutationVariables,
		TContext
	>(
		(variables?: RecordingPlaybackProgressSetMutationVariables) =>
			graphqlFetcher<
				RecordingPlaybackProgressSetMutation,
				RecordingPlaybackProgressSetMutationVariables
			>(RecordingPlaybackProgressSetDocument, variables)(),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export const GetRecordingPlaybackProgressDocument = `query getRecordingPlaybackProgress($id:ID!){recording(id:$id){viewerPlaybackSession{positionPercentage}}}`;
export async function getRecordingPlaybackProgress<T>(
	variables: ExactAlt<T, GetRecordingPlaybackProgressQueryVariables>
): Promise<GetRecordingPlaybackProgressQuery> {
	return fetchApi(GetRecordingPlaybackProgressDocument, { variables });
}

export const RecordingPlaybackProgressSetDocument = `mutation recordingPlaybackProgressSet($id:ID!$percentage:Float!){recordingPlaybackSessionAdvance(recordingId:$id input:{positionPercentage:$percentage}){recording{viewerPlaybackSession{positionPercentage}}}}`;
export async function recordingPlaybackProgressSet<T>(
	variables: ExactAlt<T, RecordingPlaybackProgressSetMutationVariables>
): Promise<RecordingPlaybackProgressSetMutation> {
	return fetchApi(RecordingPlaybackProgressSetDocument, { variables });
}
