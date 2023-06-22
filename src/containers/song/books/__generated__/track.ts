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
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetBookSongDetailDataQueryVariables = Types.Exact<{
  language: Types.Language;
  id: Types.Scalars['ID'];
  book: Types.Scalars['String'];
}>;


export type GetBookSongDetailDataQuery = { __typename?: 'Query', musicTrack: { __typename?: 'Recording', language: Types.Language, id: string | number, title: string, contentType: Types.RecordingContentType, description: string | null, recordingDate: string | null, sequenceIndex: number | null, canonicalUrl: string, shareUrl: string, copyrightYear: number | null, canonicalPath: string, duration: number, isDownloadAllowed: boolean, speakers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, attachments: Array<{ __typename?: 'Attachment', filename: string, url: string }>, imageWithFallback: { __typename?: 'Image', url: string }, recordingTags: { __typename?: 'RecordingTagConnection', nodes: Array<{ __typename?: 'RecordingTag', tag: { __typename?: 'Tag', id: string | number, name: string } }> | null }, sponsor: { __typename?: 'Sponsor', title: string, canonicalPath: string } | null, sequence: { __typename?: 'Sequence', id: string | number, title: string, contentType: Types.SequenceContentType, canonicalPath: string, recordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sequence: { __typename?: 'Sequence', id: string | number, title: string, contentType: Types.SequenceContentType, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } } | null, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } } | null, collection: { __typename?: 'Collection', title: string, canonicalPath: string } | null, transcript: { __typename?: 'Transcript', text: string } | null, sequencePreviousRecording: { __typename?: 'Recording', canonicalPath: string } | null, sequenceNextRecording: { __typename?: 'Recording', canonicalPath: string } | null, distributionAgreement: { __typename?: 'DistributionAgreement', sponsor: { __typename?: 'Sponsor', title: string } | null, license: { __typename?: 'License', summary: string } | null } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }>, videoDownloads: Array<{ __typename?: 'VideoFile', url: string, filesize: string, height: number, width: number }>, audioDownloads: Array<{ __typename?: 'AudioFile', url: string, filesize: string, bitrate: number }> } | null, recordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sequence: { __typename?: 'Sequence', id: string | number, title: string, contentType: Types.SequenceContentType, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } } | null, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null } };


export const GetBookSongDetailDataDocument = `
    query getBookSongDetailData($language: Language!, $id: ID!, $book: String!) {
  musicTrack(id: $id) {
    ...recording
    language
  }
  recordings(
    language: $language
    tagName: $book
    first: 1000
    orderBy: [{field: TITLE, direction: ASC}]
  ) {
    nodes {
      ...teaseRecording
    }
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
export const useGetBookSongDetailDataQuery = <
      TData = GetBookSongDetailDataQuery,
      TError = unknown
    >(
      variables: GetBookSongDetailDataQueryVariables,
      options?: UseQueryOptions<GetBookSongDetailDataQuery, TError, TData>
    ) =>
    useQuery<GetBookSongDetailDataQuery, TError, TData>(
      ['getBookSongDetailData', variables],
      graphqlFetcher<GetBookSongDetailDataQuery, GetBookSongDetailDataQueryVariables>(GetBookSongDetailDataDocument, variables),
      options
    );
export const useInfiniteGetBookSongDetailDataQuery = <
      TData = GetBookSongDetailDataQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetBookSongDetailDataQueryVariables,
      variables: GetBookSongDetailDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetBookSongDetailDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetBookSongDetailDataQuery, TError, TData>(
      ['getBookSongDetailData.infinite', variables],
      (metaData) => graphqlFetcher<GetBookSongDetailDataQuery, GetBookSongDetailDataQueryVariables>(GetBookSongDetailDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getBookSongDetailData<T>(
	variables: ExactAlt<T, GetBookSongDetailDataQueryVariables>
): Promise<GetBookSongDetailDataQuery> {
	return fetchApi(GetBookSongDetailDataDocument, { variables });
}

import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';


export async function prefetchQueries<T>(
	vars: {
		getBookSongDetailData: ExactAlt<T, GetBookSongDetailDataQueryVariables>
	},
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getBookSongDetailData', vars.getBookSongDetailData], () => getBookSongDetailData(vars.getBookSongDetailData), options),
		client.prefetchInfiniteQuery(['getBookSongDetailData.infinite', vars.getBookSongDetailData], () => getBookSongDetailData(vars.getBookSongDetailData), options),
	]);
	
	return client;
}
