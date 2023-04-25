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
export type GetAudiobibleBookDetailDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetAudiobibleBookDetailDataQuery = { __typename?: 'Query', recording: { __typename?: 'Recording', id: string | number, title: string, contentType: Types.RecordingContentType, description: string | null, recordingDate: string | null, sequenceIndex: number | null, canonicalUrl: string, shareUrl: string, copyrightYear: number | null, canonicalPath: string, duration: number, isDownloadAllowed: boolean, speakers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, attachments: Array<{ __typename?: 'Attachment', filename: string, url: string }>, imageWithFallback: { __typename?: 'Image', url: string }, recordingTags: { __typename?: 'RecordingTagConnection', nodes: Array<{ __typename?: 'RecordingTag', tag: { __typename?: 'Tag', id: string | number, name: string } }> | null }, sponsor: { __typename?: 'Sponsor', title: string, canonicalPath: string } | null, sequence: { __typename?: 'Sequence', id: string | number, title: string, contentType: Types.SequenceContentType, canonicalPath: string, recordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sequence: { __typename?: 'Sequence', id: string | number, title: string, contentType: Types.SequenceContentType, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } } | null, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } } | null, collection: { __typename?: 'Collection', title: string, canonicalPath: string } | null, transcript: { __typename?: 'Transcript', text: string } | null, sequencePreviousRecording: { __typename?: 'Recording', canonicalPath: string } | null, sequenceNextRecording: { __typename?: 'Recording', canonicalPath: string } | null, distributionAgreement: { __typename?: 'DistributionAgreement', sponsor: { __typename?: 'Sponsor', title: string } | null, license: { __typename?: 'License', summary: string } | null } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }>, videoDownloads: Array<{ __typename?: 'VideoFile', url: string, filesize: string, height: number, width: number }>, audioDownloads: Array<{ __typename?: 'AudioFile', url: string, filesize: string, bitrate: number }> } | null };

export type GetAudiobibleBookPathsDataQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetAudiobibleBookPathsDataQuery = { __typename?: 'Query', recordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null } };


export const GetAudiobibleBookDetailDataDocument = `
    query getAudiobibleBookDetailData($id: ID!) {
  recording(id: $id) {
    ...recording
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
export const useGetAudiobibleBookDetailDataQuery = <
      TData = GetAudiobibleBookDetailDataQuery,
      TError = unknown
    >(
      variables: GetAudiobibleBookDetailDataQueryVariables,
      options?: UseQueryOptions<GetAudiobibleBookDetailDataQuery, TError, TData>
    ) =>
    useQuery<GetAudiobibleBookDetailDataQuery, TError, TData>(
      ['getAudiobibleBookDetailData', variables],
      graphqlFetcher<GetAudiobibleBookDetailDataQuery, GetAudiobibleBookDetailDataQueryVariables>(GetAudiobibleBookDetailDataDocument, variables),
      options
    );
export const useInfiniteGetAudiobibleBookDetailDataQuery = <
      TData = GetAudiobibleBookDetailDataQuery,
      TError = unknown
    >(
      variables: GetAudiobibleBookDetailDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetAudiobibleBookDetailDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetAudiobibleBookDetailDataQuery, TError, TData>(
      ['getAudiobibleBookDetailData.infinite', variables],
      (metaData) => graphqlFetcher<GetAudiobibleBookDetailDataQuery, GetAudiobibleBookDetailDataQueryVariables>(GetAudiobibleBookDetailDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetAudiobibleBookPathsDataDocument = `
    query getAudiobibleBookPathsData($language: Language!, $first: Int) {
  recordings(language: $language, first: $first, contentType: BIBLE_CHAPTER) {
    nodes {
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetAudiobibleBookPathsDataQuery = <
      TData = GetAudiobibleBookPathsDataQuery,
      TError = unknown
    >(
      variables: GetAudiobibleBookPathsDataQueryVariables,
      options?: UseQueryOptions<GetAudiobibleBookPathsDataQuery, TError, TData>
    ) =>
    useQuery<GetAudiobibleBookPathsDataQuery, TError, TData>(
      ['getAudiobibleBookPathsData', variables],
      graphqlFetcher<GetAudiobibleBookPathsDataQuery, GetAudiobibleBookPathsDataQueryVariables>(GetAudiobibleBookPathsDataDocument, variables),
      options
    );
export const useInfiniteGetAudiobibleBookPathsDataQuery = <
      TData = GetAudiobibleBookPathsDataQuery,
      TError = unknown
    >(
      variables: GetAudiobibleBookPathsDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetAudiobibleBookPathsDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetAudiobibleBookPathsDataQuery, TError, TData>(
      ['getAudiobibleBookPathsData.infinite', variables],
      (metaData) => graphqlFetcher<GetAudiobibleBookPathsDataQuery, GetAudiobibleBookPathsDataQueryVariables>(GetAudiobibleBookPathsDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getAudiobibleBookDetailData<T>(
	variables: ExactAlt<T, GetAudiobibleBookDetailDataQueryVariables>
): Promise<GetAudiobibleBookDetailDataQuery> {
	return fetchApi(GetAudiobibleBookDetailDataDocument, { variables });
}

export async function getAudiobibleBookPathsData<T>(
	variables: ExactAlt<T, GetAudiobibleBookPathsDataQueryVariables>
): Promise<GetAudiobibleBookPathsDataQuery> {
	return fetchApi(GetAudiobibleBookPathsDataDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getAudiobibleBookDetailData: ExactAlt<T, GetAudiobibleBookDetailDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getAudiobibleBookDetailData', () => getAudiobibleBookDetailData(vars.getAudiobibleBookDetailData)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}