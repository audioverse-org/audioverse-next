import * as Types from '../../../__generated__/graphql';

import { PresenterPivotFragmentDoc } from './pivot';
import { CardRecordingFragmentDoc } from '../../../components/molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../../components/molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../../components/molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../../components/molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../../components/molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../components/templates/__generated__/andMiniplayer';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetPresenterTopPageDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  offset: Types.InputMaybe<Types.Scalars['Int']>;
  first: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetPresenterTopPageDataQuery = { __typename?: 'Query', person: { __typename?: 'Person', id: string | number, language: Types.Language, name: string, canonicalPath: string, recordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, imageWithFallback: { __typename?: 'Image', url: string } } | null };


export const GetPresenterTopPageDataDocument = `
    query getPresenterTopPageData($id: ID!, $offset: Int, $first: Int) {
  person(id: $id) {
    id
    language
    ...presenterPivot
    recordings(
      offset: $offset
      first: $first
      orderBy: [{field: DOWNLOADS_ALL_TIME, direction: DESC}]
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
    ${PresenterPivotFragmentDoc}
${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetPresenterTopPageDataQuery = <
      TData = GetPresenterTopPageDataQuery,
      TError = unknown
    >(
      variables: GetPresenterTopPageDataQueryVariables,
      options?: UseQueryOptions<GetPresenterTopPageDataQuery, TError, TData>
    ) =>
    useQuery<GetPresenterTopPageDataQuery, TError, TData>(
      ['getPresenterTopPageData', variables],
      graphqlFetcher<GetPresenterTopPageDataQuery, GetPresenterTopPageDataQueryVariables>(GetPresenterTopPageDataDocument, variables),
      options
    );
export const useInfiniteGetPresenterTopPageDataQuery = <
      TData = GetPresenterTopPageDataQuery,
      TError = unknown
    >(
      variables: GetPresenterTopPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetPresenterTopPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetPresenterTopPageDataQuery, TError, TData>(
      ['getPresenterTopPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetPresenterTopPageDataQuery, GetPresenterTopPageDataQueryVariables>(GetPresenterTopPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getPresenterTopPageData<T>(
	variables: ExactAlt<T, GetPresenterTopPageDataQueryVariables>
): Promise<GetPresenterTopPageDataQuery> {
	return fetchApi(GetPresenterTopPageDataDocument, { variables });
}
import { QueryClient } from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getPresenterTopPageData: ExactAlt<T, GetPresenterTopPageDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getPresenterTopPageData', vars.getPresenterTopPageData], () => getPresenterTopPageData(vars.getPresenterTopPageData), options),
		client.prefetchInfiniteQuery(['getPresenterTopPageData.infinite', vars.getPresenterTopPageData], () => getPresenterTopPageData(vars.getPresenterTopPageData), options),
	]);
	
	return client;
}