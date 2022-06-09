// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { CollectionPivotFragmentDoc } from './pivot.gql';
import { CardSequenceFragmentDoc } from '../../components/molecules/card/sequence.gql';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetCollectionSequencesPageDataQueryVariables = Types.Exact<{
	id: Types.Scalars['ID'];
	offset?: Types.InputMaybe<Types.Scalars['Int']>;
	first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetCollectionSequencesPageDataQuery = {
	__typename?: 'Query';
	collection?: {
		__typename?: 'Collection';
		id: string;
		title: string;
		canonicalPath: string;
		contentType: Types.CollectionContentType;
		sequences: {
			__typename?: 'SequenceConnection';
			nodes?: Array<{
				__typename?: 'Sequence';
				id: string;
				title: string;
				canonicalPath: string;
				contentType: Types.SequenceContentType;
				duration: number;
				summary: string;
				speakers: {
					__typename?: 'PersonConnection';
					nodes?: Array<{
						__typename?: 'Person';
						name: string;
						canonicalPath: string;
						imageWithFallback: { __typename?: 'Image'; url: any };
					}> | null;
				};
				sequenceWriters: {
					__typename?: 'PersonConnection';
					nodes?: Array<{
						__typename?: 'Person';
						name: string;
						canonicalPath: string;
						imageWithFallback: { __typename?: 'Image'; url: any };
					}> | null;
				};
				allRecordings: {
					__typename?: 'RecordingConnection';
					nodes?: Array<{
						__typename?: 'Recording';
						canonicalPath: string;
					}> | null;
					aggregate?: { __typename?: 'Aggregate'; count: number } | null;
				};
				collection?: { __typename?: 'Collection'; title: string } | null;
			}> | null;
			aggregate?: { __typename?: 'Aggregate'; count: number } | null;
		};
	} | null;
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

export async function getCollectionSequencesPageData<T>(
	variables: ExactAlt<T, GetCollectionSequencesPageDataQueryVariables>
): Promise<GetCollectionSequencesPageDataQuery> {
	return fetchApi(GetCollectionSequencesPageDataDocument, { variables });
}
