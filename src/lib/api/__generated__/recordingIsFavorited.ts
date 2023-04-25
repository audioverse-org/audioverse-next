import * as Types from '../../../__generated__/graphql';

import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type RecordingIsFavoritedQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
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
import { fetchApi } from '~lib/api/fetchApi' 

export async function recordingIsFavorited<T>(
	variables: ExactAlt<T, RecordingIsFavoritedQueryVariables>
): Promise<RecordingIsFavoritedQuery> {
	return fetchApi(RecordingIsFavoritedDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	props: {
		recordingIsFavorited: ExactAlt<T, RecordingIsFavoritedQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['recordingIsFavorited', () => recordingIsFavorited(props.recordingIsFavorited)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}