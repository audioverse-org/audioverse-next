import * as Types from '../../../__generated__/graphql';

import { CollectionPivotFragmentDoc } from './pivot';
import { CardSequenceFragmentDoc } from '../../../components/molecules/card/__generated__/sequence';
import { PersonLockupFragmentDoc } from '../../../components/molecules/__generated__/personLockup';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetCollectionSequencesPageDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  offset: Types.InputMaybe<Types.Scalars['Int']>;
  first: Types.InputMaybe<Types.Scalars['Int']>;
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
import { fetchApi } from '~lib/api/fetchApi' 

export async function getCollectionSequencesPageData<T>(
	variables: ExactAlt<T, GetCollectionSequencesPageDataQueryVariables>
): Promise<GetCollectionSequencesPageDataQuery> {
	return fetchApi(GetCollectionSequencesPageDataDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	props: {
		getCollectionSequencesPageData: ExactAlt<T, GetCollectionSequencesPageDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getCollectionSequencesPageData', () => getCollectionSequencesPageData(props.getCollectionSequencesPageData)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}