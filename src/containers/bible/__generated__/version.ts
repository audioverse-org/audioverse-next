import * as Types from '../../../__generated__/graphql';

import { CardSequenceFragmentDoc } from '../../../components/molecules/card/__generated__/sequence';
import { PersonLockupFragmentDoc } from '../../../components/molecules/__generated__/personLockup';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetAudiobibleVersionDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetAudiobibleVersionDataQuery = { __typename?: 'Query', collection: { __typename?: 'Collection', id: string | number, title: string, description: string, contentType: Types.CollectionContentType, canonicalPath: string, sponsor: { __typename?: 'Sponsor', canonicalPath: string, title: string, website: string | null } | null, sequences: { __typename?: 'SequenceConnection', nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null } } | null };


export const GetAudiobibleVersionDataDocument = `
    query getAudiobibleVersionData($id: ID!) {
  collection(id: $id) {
    id
    title
    description
    contentType
    canonicalPath(useFuturePath: true)
    sponsor {
      canonicalPath(useFuturePath: true)
      title
      website
    }
    sequences(first: 66, orderBy: [{field: ID, direction: ASC}]) {
      nodes {
        ...cardSequence
      }
    }
  }
}
    ${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}`;
export const useGetAudiobibleVersionDataQuery = <
      TData = GetAudiobibleVersionDataQuery,
      TError = unknown
    >(
      variables: GetAudiobibleVersionDataQueryVariables,
      options?: UseQueryOptions<GetAudiobibleVersionDataQuery, TError, TData>
    ) =>
    useQuery<GetAudiobibleVersionDataQuery, TError, TData>(
      ['getAudiobibleVersionData', variables],
      graphqlFetcher<GetAudiobibleVersionDataQuery, GetAudiobibleVersionDataQueryVariables>(GetAudiobibleVersionDataDocument, variables),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function getAudiobibleVersionData<T>(
	variables: ExactAlt<T, GetAudiobibleVersionDataQueryVariables>
): Promise<GetAudiobibleVersionDataQuery> {
	return fetchApi(GetAudiobibleVersionDataDocument, { variables });
}