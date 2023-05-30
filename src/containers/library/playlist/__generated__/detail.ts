import * as Types from '../../../../__generated__/graphql';

import { CardRecordingFragmentDoc } from '../../../../components/molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../../../components/molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../../../components/molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../../../components/molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../../../components/molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../../components/templates/__generated__/andMiniplayer';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetLibraryPlaylistPageDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetLibraryPlaylistPageDataQuery = { __typename?: 'Query', me: { __typename?: 'AuthenticatedUser', user: { __typename?: 'User', playlist: { __typename?: 'UserPlaylist', title: string, createdAt: string, summary: string, recordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } } | null } } | null };


export const GetLibraryPlaylistPageDataDocument = `
    query getLibraryPlaylistPageData($id: ID!) {
  me {
    user {
      playlist(id: $id) {
        title
        createdAt
        summary
        recordings(offset: 0, first: 1500) {
          nodes {
            ...cardRecording
          }
          aggregate {
            count
          }
        }
      }
    }
  }
}
    ${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetLibraryPlaylistPageDataQuery = <
      TData = GetLibraryPlaylistPageDataQuery,
      TError = unknown
    >(
      variables: GetLibraryPlaylistPageDataQueryVariables,
      options?: UseQueryOptions<GetLibraryPlaylistPageDataQuery, TError, TData>
    ) =>
    useQuery<GetLibraryPlaylistPageDataQuery, TError, TData>(
      ['getLibraryPlaylistPageData', variables],
      graphqlFetcher<GetLibraryPlaylistPageDataQuery, GetLibraryPlaylistPageDataQueryVariables>(GetLibraryPlaylistPageDataDocument, variables),
      options
    );
export const useInfiniteGetLibraryPlaylistPageDataQuery = <
      TData = GetLibraryPlaylistPageDataQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetLibraryPlaylistPageDataQueryVariables,
      variables: GetLibraryPlaylistPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetLibraryPlaylistPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetLibraryPlaylistPageDataQuery, TError, TData>(
      ['getLibraryPlaylistPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetLibraryPlaylistPageDataQuery, GetLibraryPlaylistPageDataQueryVariables>(GetLibraryPlaylistPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getLibraryPlaylistPageData<T>(
	variables: ExactAlt<T, GetLibraryPlaylistPageDataQueryVariables>
): Promise<GetLibraryPlaylistPageDataQuery> {
	return fetchApi(GetLibraryPlaylistPageDataDocument, { variables });
}

import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';


export async function prefetchQueries<T>(
	vars: {
		getLibraryPlaylistPageData: ExactAlt<T, GetLibraryPlaylistPageDataQueryVariables>
	},
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getLibraryPlaylistPageData', vars.getLibraryPlaylistPageData], () => getLibraryPlaylistPageData(vars.getLibraryPlaylistPageData), options),
		client.prefetchInfiniteQuery(['getLibraryPlaylistPageData.infinite', vars.getLibraryPlaylistPageData], () => getLibraryPlaylistPageData(vars.getLibraryPlaylistPageData), options),
	]);
	
	return client;
}
