import * as Types from '../../lib/generated/graphql';

import { CollectionPivotFragmentDoc } from './pivot.generated';
import { CardSequenceFragmentDoc } from '../../components/molecules/card/sequence.generated';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetCollectionSequencesPageDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
	offset: Types.InputMaybe<Types.Scalars['Int']>;
	first: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetCollectionSequencesPageDataQuery = {
	__typename?: 'Query';
	collection:
		| {
				__typename?: 'Collection';
				id: string | number;
				title: string;
				canonicalPath: string;
				contentType: Types.CollectionContentType;
				sequences: {
					__typename?: 'SequenceConnection';
					nodes:
						| Array<{
								__typename?: 'Sequence';
								id: string | number;
								title: string;
								canonicalPath: string;
								contentType: Types.SequenceContentType;
								duration: number;
								summary: string;
								speakers: {
									__typename?: 'PersonConnection';
									nodes:
										| Array<{
												__typename?: 'Person';
												name: string;
												canonicalPath: string;
												imageWithFallback: {
													__typename?: 'Image';
													url: string;
												};
										  }>
										| null
										| undefined;
								};
								sequenceWriters: {
									__typename?: 'PersonConnection';
									nodes:
										| Array<{
												__typename?: 'Person';
												name: string;
												canonicalPath: string;
												imageWithFallback: {
													__typename?: 'Image';
													url: string;
												};
										  }>
										| null
										| undefined;
								};
								allRecordings: {
									__typename?: 'RecordingConnection';
									aggregate:
										| { __typename?: 'Aggregate'; count: number }
										| null
										| undefined;
								};
						  }>
						| null
						| undefined;
					aggregate:
						| { __typename?: 'Aggregate'; count: number }
						| null
						| undefined;
				};
		  }
		| null
		| undefined;
};

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
		graphqlFetcher<
			GetCollectionSequencesPageDataQuery,
			GetCollectionSequencesPageDataQueryVariables
		>(GetCollectionSequencesPageDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export const GetCollectionSequencesPageDataDocument = `query getCollectionSequencesPageData($id:ID!$offset:Int$first:Int){collection(id:$id){id ...collectionPivot sequences(offset:$offset first:$first orderBy:[{field:TITLE direction:ASC}]){nodes{...cardSequence}aggregate{count}}}}`;
export async function getCollectionSequencesPageData<T>(
	variables: ExactAlt<T, GetCollectionSequencesPageDataQueryVariables>
): Promise<GetCollectionSequencesPageDataQuery> {
	return fetchApi(GetCollectionSequencesPageDataDocument, { variables });
}
