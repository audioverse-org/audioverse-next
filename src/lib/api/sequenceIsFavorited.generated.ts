import * as Types from '../generated/graphql';

import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type SequenceIsFavoritedQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
}>;

export type SequenceIsFavoritedQuery = {
	__typename?: 'Query';
	sequence:
		| {
				__typename?: 'Sequence';
				viewerHasFavorited: boolean;
				viewerPlaybackCompletedPercentage: number;
				recordings: {
					__typename?: 'RecordingConnection';
					aggregate:
						| { __typename?: 'Aggregate'; count: number }
						| null
						| undefined;
				};
		  }
		| null
		| undefined;
};

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
		graphqlFetcher<SequenceIsFavoritedQuery, SequenceIsFavoritedQueryVariables>(
			SequenceIsFavoritedDocument,
			variables
		),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export const SequenceIsFavoritedDocument = `query sequenceIsFavorited($id:ID!){sequence(id:$id){viewerHasFavorited viewerPlaybackCompletedPercentage recordings(viewerHasFavorited:true){aggregate{count}}}}`;
export async function sequenceIsFavorited<T>(
	variables: ExactAlt<T, SequenceIsFavoritedQueryVariables>
): Promise<SequenceIsFavoritedQuery> {
	return fetchApi(SequenceIsFavoritedDocument, { variables });
}
