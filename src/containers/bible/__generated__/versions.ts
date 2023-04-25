import * as Types from '../../../__generated__/graphql';

import { CardCollectionFragmentDoc } from '../../../components/molecules/card/__generated__/collection';
import { CardSequenceFragmentDoc } from '../../../components/molecules/card/__generated__/sequence';
import { PersonLockupFragmentDoc } from '../../../components/molecules/__generated__/personLockup';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetAudiobibleVersionsDataQueryVariables = Types.Exact<{
  language: Types.Language;
}>;


export type GetAudiobibleVersionsDataQuery = { __typename?: 'Query', collections: { __typename?: 'CollectionConnection', nodes: Array<{ __typename: 'Collection', id: string | number, canonicalPath: string, title: string, startDate: string | null, endDate: string | null, duration: number, collectionContentType: Types.CollectionContentType, sequences: { __typename?: 'SequenceConnection', nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null }, image: { __typename?: 'Image', id: string | number, url: string } | null, allSequences: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, allRecordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } };


export const GetAudiobibleVersionsDataDocument = `
    query getAudiobibleVersionsData($language: Language!) {
  collections(
    language: $language
    contentType: BIBLE_VERSION
    first: 10
    orderBy: [{field: TITLE, direction: ASC}]
  ) {
    nodes {
      ...cardCollection
      sequences(first: 2, orderBy: [{field: ID, direction: ASC}]) {
        nodes {
          ...cardSequence
        }
      }
    }
    aggregate {
      count
    }
  }
}
    ${CardCollectionFragmentDoc}
${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}`;
export const useGetAudiobibleVersionsDataQuery = <
      TData = GetAudiobibleVersionsDataQuery,
      TError = unknown
    >(
      variables: GetAudiobibleVersionsDataQueryVariables,
      options?: UseQueryOptions<GetAudiobibleVersionsDataQuery, TError, TData>
    ) =>
    useQuery<GetAudiobibleVersionsDataQuery, TError, TData>(
      ['getAudiobibleVersionsData', variables],
      graphqlFetcher<GetAudiobibleVersionsDataQuery, GetAudiobibleVersionsDataQueryVariables>(GetAudiobibleVersionsDataDocument, variables),
      options
    );
export const useInfiniteGetAudiobibleVersionsDataQuery = <
      TData = GetAudiobibleVersionsDataQuery,
      TError = unknown
    >(
      variables: GetAudiobibleVersionsDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetAudiobibleVersionsDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetAudiobibleVersionsDataQuery, TError, TData>(
      ['getAudiobibleVersionsData.infinite', variables],
      (metaData) => graphqlFetcher<GetAudiobibleVersionsDataQuery, GetAudiobibleVersionsDataQueryVariables>(GetAudiobibleVersionsDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getAudiobibleVersionsData<T>(
	variables: ExactAlt<T, GetAudiobibleVersionsDataQueryVariables>
): Promise<GetAudiobibleVersionsDataQuery> {
	return fetchApi(GetAudiobibleVersionsDataDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getAudiobibleVersionsData: ExactAlt<T, GetAudiobibleVersionsDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getAudiobibleVersionsData', () => getAudiobibleVersionsData(vars.getAudiobibleVersionsData)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}