import * as Types from '../../../__generated__/graphql';

import { RecordingFragmentDoc } from '../../../components/organisms/__generated__/recording';
import { PersonLockupFragmentDoc } from '../../../components/molecules/__generated__/personLockup';
import { TeaseRecordingFragmentDoc } from '../../../components/molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../components/templates/__generated__/andMiniplayer';
import { SequenceNavFragmentDoc } from '../../../components/molecules/__generated__/sequenceNav';
import { CopyrightInfoFragmentDoc } from '../../../components/molecules/__generated__/copyrightInfo';
import { PlayerFragmentDoc } from '../../../components/molecules/__generated__/player';
import { ButtonDownloadFragmentDoc } from '../../../components/molecules/__generated__/buttonDownload';
import { ButtonShareRecordingFragmentDoc } from '../../../components/molecules/__generated__/buttonShareRecording';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetSongDetailDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetSongDetailDataQuery = { __typename?: 'Query', musicTrack: { __typename?: 'Recording', language: Types.Language, id: string | number, title: string, contentType: Types.RecordingContentType, description: string | null, recordingDate: string | null, sequenceIndex: number | null, canonicalUrl: string, shareUrl: string, copyrightYear: number | null, canonicalPath: string, duration: number, isDownloadAllowed: boolean, speakers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, attachments: Array<{ __typename?: 'Attachment', filename: string, url: string }>, imageWithFallback: { __typename?: 'Image', url: string }, recordingTags: { __typename?: 'RecordingTagConnection', nodes: Array<{ __typename?: 'RecordingTag', tag: { __typename?: 'Tag', id: string | number, name: string } }> | null }, sponsor: { __typename?: 'Sponsor', title: string, canonicalPath: string } | null, sequence: { __typename?: 'Sequence', id: string | number, title: string, contentType: Types.SequenceContentType, canonicalPath: string, recordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sequence: { __typename?: 'Sequence', id: string | number, title: string, contentType: Types.SequenceContentType, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } } | null, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } } | null, collection: { __typename?: 'Collection', title: string, canonicalPath: string } | null, transcript: { __typename?: 'Transcript', text: string } | null, sequencePreviousRecording: { __typename?: 'Recording', canonicalPath: string } | null, sequenceNextRecording: { __typename?: 'Recording', canonicalPath: string } | null, distributionAgreement: { __typename?: 'DistributionAgreement', sponsor: { __typename?: 'Sponsor', title: string } | null, license: { __typename?: 'License', summary: string } | null } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }>, videoDownloads: Array<{ __typename?: 'VideoFile', url: string, filesize: string, height: number, width: number }>, audioDownloads: Array<{ __typename?: 'AudioFile', url: string, filesize: string, bitrate: number }> } | null };

export type GetSongDetailStaticPathsQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetSongDetailStaticPathsQuery = { __typename?: 'Query', musicTracks: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null } };


export const GetSongDetailDataDocument = `
    query getSongDetailData($id: ID!) {
  musicTrack(id: $id) {
    ...recording
    language
  }
}
    ${RecordingFragmentDoc}
${PersonLockupFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}
${SequenceNavFragmentDoc}
${CopyrightInfoFragmentDoc}
${PlayerFragmentDoc}
${ButtonDownloadFragmentDoc}
${ButtonShareRecordingFragmentDoc}`;
export const useGetSongDetailDataQuery = <
      TData = GetSongDetailDataQuery,
      TError = unknown
    >(
      variables: GetSongDetailDataQueryVariables,
      options?: UseQueryOptions<GetSongDetailDataQuery, TError, TData>
    ) =>
    useQuery<GetSongDetailDataQuery, TError, TData>(
      ['getSongDetailData', variables],
      graphqlFetcher<GetSongDetailDataQuery, GetSongDetailDataQueryVariables>(GetSongDetailDataDocument, variables),
      options
    );
export const useInfiniteGetSongDetailDataQuery = <
      TData = GetSongDetailDataQuery,
      TError = unknown
    >(
      variables: GetSongDetailDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetSongDetailDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetSongDetailDataQuery, TError, TData>(
      ['getSongDetailData.infinite', variables],
      (metaData) => graphqlFetcher<GetSongDetailDataQuery, GetSongDetailDataQueryVariables>(GetSongDetailDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetSongDetailStaticPathsDocument = `
    query getSongDetailStaticPaths($language: Language!, $first: Int) {
  musicTracks(language: $language, first: $first) {
    nodes {
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetSongDetailStaticPathsQuery = <
      TData = GetSongDetailStaticPathsQuery,
      TError = unknown
    >(
      variables: GetSongDetailStaticPathsQueryVariables,
      options?: UseQueryOptions<GetSongDetailStaticPathsQuery, TError, TData>
    ) =>
    useQuery<GetSongDetailStaticPathsQuery, TError, TData>(
      ['getSongDetailStaticPaths', variables],
      graphqlFetcher<GetSongDetailStaticPathsQuery, GetSongDetailStaticPathsQueryVariables>(GetSongDetailStaticPathsDocument, variables),
      options
    );
export const useInfiniteGetSongDetailStaticPathsQuery = <
      TData = GetSongDetailStaticPathsQuery,
      TError = unknown
    >(
      variables: GetSongDetailStaticPathsQueryVariables,
      options?: UseInfiniteQueryOptions<GetSongDetailStaticPathsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetSongDetailStaticPathsQuery, TError, TData>(
      ['getSongDetailStaticPaths.infinite', variables],
      (metaData) => graphqlFetcher<GetSongDetailStaticPathsQuery, GetSongDetailStaticPathsQueryVariables>(GetSongDetailStaticPathsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getSongDetailData<T>(
	variables: ExactAlt<T, GetSongDetailDataQueryVariables>
): Promise<GetSongDetailDataQuery> {
	return fetchApi(GetSongDetailDataDocument, { variables });
}

export async function getSongDetailStaticPaths<T>(
	variables: ExactAlt<T, GetSongDetailStaticPathsQueryVariables>
): Promise<GetSongDetailStaticPathsQuery> {
	return fetchApi(GetSongDetailStaticPathsDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getSongDetailData: ExactAlt<T, GetSongDetailDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getSongDetailData', () => getSongDetailData(vars.getSongDetailData)],
		['getSongDetailData.infinite', () => getSongDetailData(vars.getSongDetailData)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}