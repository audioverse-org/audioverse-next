// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type RecordingIsFavoritedQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type RecordingIsFavoritedQuery = {
	__typename?: 'Query';
	recording?: { __typename?: 'Recording'; viewerHasFavorited: boolean } | null;
};

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
		graphqlFetcher<
			RecordingIsFavoritedQuery,
			RecordingIsFavoritedQueryVariables
		>(RecordingIsFavoritedDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function recordingIsFavorited<T>(
	variables: ExactAlt<T, RecordingIsFavoritedQueryVariables>
): Promise<RecordingIsFavoritedQuery> {
	return fetchApi(RecordingIsFavoritedDocument, { variables });
}
