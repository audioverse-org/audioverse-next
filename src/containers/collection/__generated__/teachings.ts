import * as Types from '../../../__generated__/graphql';

import { CollectionPivotFragmentDoc } from './pivot';
import { CardRecordingFragmentDoc } from '../../../components/molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../../components/molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../../components/molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../../components/molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../../components/molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../components/templates/__generated__/andMiniplayer';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetCollectionTeachingsPageDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  offset: Types.InputMaybe<Types.Scalars['Int']>;
  first: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetCollectionTeachingsPageDataQuery = { __typename?: 'Query', collection: { __typename?: 'Collection', id: string | number, title: string, canonicalPath: string, contentType: Types.CollectionContentType, recordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } } | null };


export const GetCollectionTeachingsPageDataDocument = `
    query getCollectionTeachingsPageData($id: ID!, $offset: Int, $first: Int) {
  collection(id: $id) {
    id
    ...collectionPivot
    recordings(
      offset: $offset
      first: $first
      sequenceId: 0
      orderBy: [{field: TITLE, direction: ASC}]
    ) {
      nodes {
        ...cardRecording
      }
      aggregate {
        count
      }
    }
  }
}
    ${CollectionPivotFragmentDoc}
${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetCollectionTeachingsPageDataQuery = <
      TData = GetCollectionTeachingsPageDataQuery,
      TError = unknown
    >(
      variables: GetCollectionTeachingsPageDataQueryVariables,
      options?: UseQueryOptions<GetCollectionTeachingsPageDataQuery, TError, TData>
    ) =>
    useQuery<GetCollectionTeachingsPageDataQuery, TError, TData>(
      ['getCollectionTeachingsPageData', variables],
      graphqlFetcher<GetCollectionTeachingsPageDataQuery, GetCollectionTeachingsPageDataQueryVariables>(GetCollectionTeachingsPageDataDocument, variables),
      options
    );
export const useInfiniteGetCollectionTeachingsPageDataQuery = <
      TData = GetCollectionTeachingsPageDataQuery,
      TError = unknown
    >(
      variables: GetCollectionTeachingsPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetCollectionTeachingsPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetCollectionTeachingsPageDataQuery, TError, TData>(
      ['getCollectionTeachingsPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetCollectionTeachingsPageDataQuery, GetCollectionTeachingsPageDataQueryVariables>(GetCollectionTeachingsPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getCollectionTeachingsPageData<T>(
	variables: ExactAlt<T, GetCollectionTeachingsPageDataQueryVariables>
): Promise<GetCollectionTeachingsPageDataQuery> {
	return fetchApi(GetCollectionTeachingsPageDataDocument, { variables });
}
import { QueryClient } from '@tanstack/react-query';

export async function prefetchQueries<T>(
	vars: {
		getCollectionTeachingsPageData: ExactAlt<T, GetCollectionTeachingsPageDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getCollectionTeachingsPageData', vars.getCollectionTeachingsPageData], () => getCollectionTeachingsPageData(vars.getCollectionTeachingsPageData), options),
		client.prefetchInfiniteQuery(['getCollectionTeachingsPageData.infinite', vars.getCollectionTeachingsPageData], () => getCollectionTeachingsPageData(vars.getCollectionTeachingsPageData), options),
	]);
	
	return client;
}