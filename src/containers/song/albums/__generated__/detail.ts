import * as Types from '../../../../__generated__/graphql';

import { SequenceFragmentDoc } from '../../../../components/organisms/__generated__/sequence';
import { CardRecordingFragmentDoc } from '../../../../components/molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../../../components/molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../../../components/molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../../../components/molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../../../components/molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../../components/templates/__generated__/andMiniplayer';
import { GenerateFeedFragmentDoc } from '../../../../lib/__generated__/generateFeed';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetSongAlbumsDetailPageDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetSongAlbumsDetailPageDataQuery = { __typename?: 'Query', musicAlbum: { __typename?: 'Sequence', canonicalUrl: string, language: Types.Language, id: string | number, title: string, contentType: Types.SequenceContentType, duration: number, description: string, startDate: string | null, endDate: string | null, shareUrl: string, collection: { __typename?: 'Collection', title: string, canonicalPath: string } | null, image: { __typename?: 'Image', url: string } | null, sponsor: { __typename?: 'Sponsor', title: string, canonicalPath: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null } } | null };

export type GetSongAlbumFeedDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetSongAlbumFeedDataQuery = { __typename?: 'Query', musicAlbum: { __typename?: 'Sequence', title: string, canonicalUrl: string, language: Types.Language, recordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', id: string | number, title: string, contentType: Types.RecordingContentType, description: string | null, publishDate: string | null, audioFiles: Array<{ __typename?: 'AudioFile', id: string | number, url: string, filesize: string, duration: number, mimeType: string, bitrate: number }>, videoFiles: Array<{ __typename?: 'VideoFile', id: string | number, url: string, filesize: string, duration: number, mimeType: string, bitrate: number, container: string }>, persons: Array<{ __typename?: 'Person', name: string }>, sequence: { __typename?: 'Sequence', title: string } | null, sponsor: { __typename?: 'Sponsor', title: string } | null }> | null } } | null };

export type GetSongAlbumsDetailPathsDataQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetSongAlbumsDetailPathsDataQuery = { __typename?: 'Query', musicAlbums: { __typename?: 'SequenceConnection', nodes: Array<{ __typename?: 'Sequence', canonicalPath: string }> | null } };


export const GetSongAlbumsDetailPageDataDocument = `
    query getSongAlbumsDetailPageData($id: ID!) {
  musicAlbum(id: $id) {
    ...sequence
    canonicalUrl(useFuturePath: true)
    language
  }
}
    ${SequenceFragmentDoc}
${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetSongAlbumsDetailPageDataQuery = <
      TData = GetSongAlbumsDetailPageDataQuery,
      TError = unknown
    >(
      variables: GetSongAlbumsDetailPageDataQueryVariables,
      options?: UseQueryOptions<GetSongAlbumsDetailPageDataQuery, TError, TData>
    ) =>
    useQuery<GetSongAlbumsDetailPageDataQuery, TError, TData>(
      ['getSongAlbumsDetailPageData', variables],
      graphqlFetcher<GetSongAlbumsDetailPageDataQuery, GetSongAlbumsDetailPageDataQueryVariables>(GetSongAlbumsDetailPageDataDocument, variables),
      options
    );
export const GetSongAlbumFeedDataDocument = `
    query getSongAlbumFeedData($id: ID!) {
  musicAlbum(id: $id) {
    title
    canonicalUrl(useFuturePath: true)
    language
    recordings(first: 25) {
      nodes {
        ...generateFeed
      }
    }
  }
}
    ${GenerateFeedFragmentDoc}`;
export const useGetSongAlbumFeedDataQuery = <
      TData = GetSongAlbumFeedDataQuery,
      TError = unknown
    >(
      variables: GetSongAlbumFeedDataQueryVariables,
      options?: UseQueryOptions<GetSongAlbumFeedDataQuery, TError, TData>
    ) =>
    useQuery<GetSongAlbumFeedDataQuery, TError, TData>(
      ['getSongAlbumFeedData', variables],
      graphqlFetcher<GetSongAlbumFeedDataQuery, GetSongAlbumFeedDataQueryVariables>(GetSongAlbumFeedDataDocument, variables),
      options
    );
export const GetSongAlbumsDetailPathsDataDocument = `
    query getSongAlbumsDetailPathsData($language: Language!, $first: Int) {
  musicAlbums(language: $language, first: $first) {
    nodes {
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetSongAlbumsDetailPathsDataQuery = <
      TData = GetSongAlbumsDetailPathsDataQuery,
      TError = unknown
    >(
      variables: GetSongAlbumsDetailPathsDataQueryVariables,
      options?: UseQueryOptions<GetSongAlbumsDetailPathsDataQuery, TError, TData>
    ) =>
    useQuery<GetSongAlbumsDetailPathsDataQuery, TError, TData>(
      ['getSongAlbumsDetailPathsData', variables],
      graphqlFetcher<GetSongAlbumsDetailPathsDataQuery, GetSongAlbumsDetailPathsDataQueryVariables>(GetSongAlbumsDetailPathsDataDocument, variables),
      options
    );
import { fetchApi } from '@lib/api/fetchApi' 

export async function getSongAlbumsDetailPageData<T>(
	variables: ExactAlt<T, GetSongAlbumsDetailPageDataQueryVariables>
): Promise<GetSongAlbumsDetailPageDataQuery> {
	return fetchApi(GetSongAlbumsDetailPageDataDocument, { variables });
}

export async function getSongAlbumFeedData<T>(
	variables: ExactAlt<T, GetSongAlbumFeedDataQueryVariables>
): Promise<GetSongAlbumFeedDataQuery> {
	return fetchApi(GetSongAlbumFeedDataDocument, { variables });
}

export async function getSongAlbumsDetailPathsData<T>(
	variables: ExactAlt<T, GetSongAlbumsDetailPathsDataQueryVariables>
): Promise<GetSongAlbumsDetailPathsDataQuery> {
	return fetchApi(GetSongAlbumsDetailPathsDataDocument, { variables });
}