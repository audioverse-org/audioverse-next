import * as Types from '../../../../__generated__/graphql';

import { CardPlaylistFragmentDoc } from '../../../../components/molecules/card/__generated__/playlist';
import { TeaseRecordingFragmentDoc } from '../../../../components/molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../../components/templates/__generated__/andMiniplayer';
import { PersonLockupFragmentDoc } from '../../../../components/molecules/__generated__/personLockup';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetLibraryPlaylistsDataQueryVariables = Types.Exact<{
  language: Types.Language;
  offset: Types.InputMaybe<Types.Scalars['Int']>;
  first: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetLibraryPlaylistsDataQuery = { __typename?: 'Query', me: { __typename?: 'AuthenticatedUser', user: { __typename?: 'User', playlists: { __typename?: 'UserPlaylistConnection', nodes: Array<{ __typename?: 'UserPlaylist', id: string | number, title: string, recordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sequence: { __typename?: 'Sequence', id: string | number, title: string, contentType: Types.SequenceContentType, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } } | null, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } } } | null };


export const GetLibraryPlaylistsDataDocument = `
    query getLibraryPlaylistsData($language: Language!, $offset: Int, $first: Int) {
  me {
    user {
      playlists(
        language: $language
        offset: $offset
        first: $first
        orderBy: [{field: CREATED_AT, direction: DESC}]
      ) {
        nodes {
          ...cardPlaylist
        }
        aggregate {
          count
        }
      }
    }
  }
}
    ${CardPlaylistFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}
${PersonLockupFragmentDoc}`;
export const useGetLibraryPlaylistsDataQuery = <
      TData = GetLibraryPlaylistsDataQuery,
      TError = unknown
    >(
      variables: GetLibraryPlaylistsDataQueryVariables,
      options?: UseQueryOptions<GetLibraryPlaylistsDataQuery, TError, TData>
    ) =>
    useQuery<GetLibraryPlaylistsDataQuery, TError, TData>(
      ['getLibraryPlaylistsData', variables],
      graphqlFetcher<GetLibraryPlaylistsDataQuery, GetLibraryPlaylistsDataQueryVariables>(GetLibraryPlaylistsDataDocument, variables),
      options
    );
export const useInfiniteGetLibraryPlaylistsDataQuery = <
      TData = GetLibraryPlaylistsDataQuery,
      TError = unknown
    >(
      variables: GetLibraryPlaylistsDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetLibraryPlaylistsDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetLibraryPlaylistsDataQuery, TError, TData>(
      ['getLibraryPlaylistsData.infinite', variables],
      (metaData) => graphqlFetcher<GetLibraryPlaylistsDataQuery, GetLibraryPlaylistsDataQueryVariables>(GetLibraryPlaylistsDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getLibraryPlaylistsData<T>(
	variables: ExactAlt<T, GetLibraryPlaylistsDataQueryVariables>
): Promise<GetLibraryPlaylistsDataQuery> {
	return fetchApi(GetLibraryPlaylistsDataDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getLibraryPlaylistsData: ExactAlt<T, GetLibraryPlaylistsDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getLibraryPlaylistsData', () => getLibraryPlaylistsData(vars.getLibraryPlaylistsData)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}