import * as Types from '../../../../__generated__/graphql';

import { CardRecordingFragmentDoc } from '../../../../components/molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../../../components/molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../../../components/molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../../../components/molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../../../components/molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../../components/templates/__generated__/andMiniplayer';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetSongBooksDetailPageDataQueryVariables = Types.Exact<{
  language: Types.Language;
  book: Types.Scalars['String']['input'];
}>;


export type GetSongBooksDetailPageDataQuery = { __typename?: 'Query', musicTracks: { __typename?: 'RecordingConnection', nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null } };


export const GetSongBooksDetailPageDataDocument = `
    query getSongBooksDetailPageData($language: Language!, $book: String!) {
  musicTracks(
    language: $language
    tagName: $book
    first: 1000
    orderBy: [{field: PUBLISHED_AT, direction: ASC}]
  ) {
    nodes {
      ...cardRecording
    }
  }
}
    ${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetSongBooksDetailPageDataQuery = <
      TData = GetSongBooksDetailPageDataQuery,
      TError = unknown
    >(
      variables: GetSongBooksDetailPageDataQueryVariables,
      options?: UseQueryOptions<GetSongBooksDetailPageDataQuery, TError, TData>
    ) =>
    useQuery<GetSongBooksDetailPageDataQuery, TError, TData>(
      ['getSongBooksDetailPageData', variables],
      graphqlFetcher<GetSongBooksDetailPageDataQuery, GetSongBooksDetailPageDataQueryVariables>(GetSongBooksDetailPageDataDocument, variables),
      options
    );
export const useInfiniteGetSongBooksDetailPageDataQuery = <
      TData = GetSongBooksDetailPageDataQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetSongBooksDetailPageDataQueryVariables,
      variables: GetSongBooksDetailPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetSongBooksDetailPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetSongBooksDetailPageDataQuery, TError, TData>(
      ['getSongBooksDetailPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetSongBooksDetailPageDataQuery, GetSongBooksDetailPageDataQueryVariables>(GetSongBooksDetailPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getSongBooksDetailPageData<T>(
	variables: ExactAlt<T, GetSongBooksDetailPageDataQueryVariables>
): Promise<GetSongBooksDetailPageDataQuery> {
	return fetchApi(GetSongBooksDetailPageDataDocument, { variables });
}

import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';


export async function prefetchQueries<T>(
	vars: {
		getSongBooksDetailPageData: ExactAlt<T, GetSongBooksDetailPageDataQueryVariables>
	},
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getSongBooksDetailPageData', vars.getSongBooksDetailPageData], () => getSongBooksDetailPageData(vars.getSongBooksDetailPageData), options),
		client.prefetchInfiniteQuery(['getSongBooksDetailPageData.infinite', vars.getSongBooksDetailPageData], () => getSongBooksDetailPageData(vars.getSongBooksDetailPageData), options),
	]);
	
	return client;
}
