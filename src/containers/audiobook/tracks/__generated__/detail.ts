import * as Types from '../../../../__generated__/graphql';

import { RecordingFragmentDoc } from '../../../../components/organisms/__generated__/recording';
import { PersonLockupFragmentDoc } from '../../../../components/molecules/__generated__/personLockup';
import { TeaseRecordingFragmentDoc } from '../../../../components/molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../../components/templates/__generated__/andMiniplayer';
import { SequenceNavFragmentDoc } from '../../../../components/molecules/__generated__/sequenceNav';
import { CopyrightInfoFragmentDoc } from '../../../../components/molecules/__generated__/copyrightInfo';
import { PlayerFragmentDoc } from '../../../../components/molecules/__generated__/player';
import { ButtonDownloadFragmentDoc } from '../../../../components/molecules/__generated__/buttonDownload';
import { ButtonShareRecordingFragmentDoc } from '../../../../components/molecules/__generated__/buttonShareRecording';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetAudiobookTrackDetailDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetAudiobookTrackDetailDataQuery = { __typename?: 'Query', audiobookTrack: { __typename?: 'Recording', language: Types.Language, id: string | number, title: string, contentType: Types.RecordingContentType, description: string | null, recordingDate: string | null, sequenceIndex: number | null, canonicalUrl: string, shareUrl: string, copyrightYear: number | null, canonicalPath: string, duration: number, isDownloadAllowed: boolean, speakers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, attachments: Array<{ __typename?: 'Attachment', filename: string, url: string }>, imageWithFallback: { __typename?: 'Image', url: string }, recordingTags: { __typename?: 'RecordingTagConnection', nodes: Array<{ __typename?: 'RecordingTag', tag: { __typename?: 'Tag', id: string | number, name: string } }> | null }, sponsor: { __typename?: 'Sponsor', title: string, canonicalPath: string } | null, sequence: { __typename?: 'Sequence', id: string | number, title: string, contentType: Types.SequenceContentType, canonicalPath: string, recordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sequence: { __typename?: 'Sequence', id: string | number, title: string, contentType: Types.SequenceContentType, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } } | null, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } } | null, collection: { __typename?: 'Collection', title: string, canonicalPath: string } | null, transcript: { __typename?: 'Transcript', text: string } | null, sequencePreviousRecording: { __typename?: 'Recording', canonicalPath: string } | null, sequenceNextRecording: { __typename?: 'Recording', canonicalPath: string } | null, distributionAgreement: { __typename?: 'DistributionAgreement', sponsor: { __typename?: 'Sponsor', title: string } | null, license: { __typename?: 'License', summary: string } | null } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }>, videoDownloads: Array<{ __typename?: 'VideoFile', url: string, filesize: string, height: number, width: number }>, audioDownloads: Array<{ __typename?: 'AudioFile', url: string, filesize: string, bitrate: number }> } | null };

export type GetAudiobookTrackDetailStaticPathsQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetAudiobookTrackDetailStaticPathsQuery = { __typename?: 'Query', audiobookTracks: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null } };


export const GetAudiobookTrackDetailDataDocument = `
    query getAudiobookTrackDetailData($id: ID!) {
  audiobookTrack(id: $id) {
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
export const useGetAudiobookTrackDetailDataQuery = <
      TData = GetAudiobookTrackDetailDataQuery,
      TError = unknown
    >(
      variables: GetAudiobookTrackDetailDataQueryVariables,
      options?: UseQueryOptions<GetAudiobookTrackDetailDataQuery, TError, TData>
    ) =>
    useQuery<GetAudiobookTrackDetailDataQuery, TError, TData>(
      ['getAudiobookTrackDetailData', variables],
      graphqlFetcher<GetAudiobookTrackDetailDataQuery, GetAudiobookTrackDetailDataQueryVariables>(GetAudiobookTrackDetailDataDocument, variables),
      options
    );
export const useInfiniteGetAudiobookTrackDetailDataQuery = <
      TData = GetAudiobookTrackDetailDataQuery,
      TError = unknown
    >(
      variables: GetAudiobookTrackDetailDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetAudiobookTrackDetailDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetAudiobookTrackDetailDataQuery, TError, TData>(
      ['getAudiobookTrackDetailData.infinite', variables],
      (metaData) => graphqlFetcher<GetAudiobookTrackDetailDataQuery, GetAudiobookTrackDetailDataQueryVariables>(GetAudiobookTrackDetailDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetAudiobookTrackDetailStaticPathsDocument = `
    query getAudiobookTrackDetailStaticPaths($language: Language!, $first: Int) {
  audiobookTracks(language: $language, first: $first) {
    nodes {
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetAudiobookTrackDetailStaticPathsQuery = <
      TData = GetAudiobookTrackDetailStaticPathsQuery,
      TError = unknown
    >(
      variables: GetAudiobookTrackDetailStaticPathsQueryVariables,
      options?: UseQueryOptions<GetAudiobookTrackDetailStaticPathsQuery, TError, TData>
    ) =>
    useQuery<GetAudiobookTrackDetailStaticPathsQuery, TError, TData>(
      ['getAudiobookTrackDetailStaticPaths', variables],
      graphqlFetcher<GetAudiobookTrackDetailStaticPathsQuery, GetAudiobookTrackDetailStaticPathsQueryVariables>(GetAudiobookTrackDetailStaticPathsDocument, variables),
      options
    );
export const useInfiniteGetAudiobookTrackDetailStaticPathsQuery = <
      TData = GetAudiobookTrackDetailStaticPathsQuery,
      TError = unknown
    >(
      variables: GetAudiobookTrackDetailStaticPathsQueryVariables,
      options?: UseInfiniteQueryOptions<GetAudiobookTrackDetailStaticPathsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetAudiobookTrackDetailStaticPathsQuery, TError, TData>(
      ['getAudiobookTrackDetailStaticPaths.infinite', variables],
      (metaData) => graphqlFetcher<GetAudiobookTrackDetailStaticPathsQuery, GetAudiobookTrackDetailStaticPathsQueryVariables>(GetAudiobookTrackDetailStaticPathsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getAudiobookTrackDetailData<T>(
	variables: ExactAlt<T, GetAudiobookTrackDetailDataQueryVariables>
): Promise<GetAudiobookTrackDetailDataQuery> {
	return fetchApi(GetAudiobookTrackDetailDataDocument, { variables });
}

export async function getAudiobookTrackDetailStaticPaths<T>(
	variables: ExactAlt<T, GetAudiobookTrackDetailStaticPathsQueryVariables>
): Promise<GetAudiobookTrackDetailStaticPathsQuery> {
	return fetchApi(GetAudiobookTrackDetailStaticPathsDocument, { variables });
}
import { QueryClient } from '@tanstack/react-query';

export async function prefetchQueries<T>(
	vars: {
		getAudiobookTrackDetailData: ExactAlt<T, GetAudiobookTrackDetailDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getAudiobookTrackDetailData', vars.getAudiobookTrackDetailData], () => getAudiobookTrackDetailData(vars.getAudiobookTrackDetailData), options),
		client.prefetchInfiniteQuery(['getAudiobookTrackDetailData.infinite', vars.getAudiobookTrackDetailData], () => getAudiobookTrackDetailData(vars.getAudiobookTrackDetailData), options),
	]);
	
	return client;
}