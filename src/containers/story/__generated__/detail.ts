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
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetStoryDetailDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type GetStoryDetailDataQuery = { __typename?: 'Query', story: { __typename?: 'Recording', language: Types.Language, id: string | number, title: string, contentType: Types.RecordingContentType, description: string | null, recordingDate: string | null, sequenceIndex: number | null, canonicalUrl: string, shareUrl: string, copyrightYear: number | null, canonicalPath: string, duration: number, isDownloadAllowed: boolean, speakers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, attachments: Array<{ __typename?: 'Attachment', filename: string, url: string }>, imageWithFallback: { __typename?: 'Image', url: string }, recordingTags: { __typename?: 'RecordingTagConnection', nodes: Array<{ __typename?: 'RecordingTag', tag: { __typename?: 'Tag', id: string | number, name: string } }> | null }, sponsor: { __typename?: 'Sponsor', title: string, canonicalPath: string } | null, sequence: { __typename?: 'Sequence', id: string | number, title: string, contentType: Types.SequenceContentType, canonicalPath: string, recordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sequence: { __typename?: 'Sequence', id: string | number, title: string, contentType: Types.SequenceContentType, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } } | null, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } } | null, collection: { __typename?: 'Collection', title: string, canonicalPath: string } | null, transcript: { __typename?: 'Transcript', text: string } | null, sequencePreviousRecording: { __typename?: 'Recording', canonicalPath: string } | null, sequenceNextRecording: { __typename?: 'Recording', canonicalPath: string } | null, distributionAgreement: { __typename?: 'DistributionAgreement', sponsor: { __typename?: 'Sponsor', title: string } | null, license: { __typename?: 'License', summary: string } | null } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }>, videoDownloads: Array<{ __typename?: 'VideoFile', url: string, filesize: string, height: number, width: number }>, audioDownloads: Array<{ __typename?: 'AudioFile', url: string, filesize: string, bitrate: number }> } | null };

export type GetStoryDetailStaticPathsQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetStoryDetailStaticPathsQuery = { __typename?: 'Query', stories: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null } };


export const GetStoryDetailDataDocument = `
    query getStoryDetailData($id: ID!) {
  story(id: $id) {
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
export const useGetStoryDetailDataQuery = <
      TData = GetStoryDetailDataQuery,
      TError = unknown
    >(
      variables: GetStoryDetailDataQueryVariables,
      options?: UseQueryOptions<GetStoryDetailDataQuery, TError, TData>
    ) =>
    useQuery<GetStoryDetailDataQuery, TError, TData>(
      ['getStoryDetailData', variables],
      graphqlFetcher<GetStoryDetailDataQuery, GetStoryDetailDataQueryVariables>(GetStoryDetailDataDocument, variables),
      options
    );
export const useInfiniteGetStoryDetailDataQuery = <
      TData = GetStoryDetailDataQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetStoryDetailDataQueryVariables,
      variables: GetStoryDetailDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetStoryDetailDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetStoryDetailDataQuery, TError, TData>(
      ['getStoryDetailData.infinite', variables],
      (metaData) => graphqlFetcher<GetStoryDetailDataQuery, GetStoryDetailDataQueryVariables>(GetStoryDetailDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetStoryDetailStaticPathsDocument = `
    query getStoryDetailStaticPaths($language: Language!, $first: Int) {
  stories(language: $language, first: $first) {
    nodes {
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetStoryDetailStaticPathsQuery = <
      TData = GetStoryDetailStaticPathsQuery,
      TError = unknown
    >(
      variables: GetStoryDetailStaticPathsQueryVariables,
      options?: UseQueryOptions<GetStoryDetailStaticPathsQuery, TError, TData>
    ) =>
    useQuery<GetStoryDetailStaticPathsQuery, TError, TData>(
      ['getStoryDetailStaticPaths', variables],
      graphqlFetcher<GetStoryDetailStaticPathsQuery, GetStoryDetailStaticPathsQueryVariables>(GetStoryDetailStaticPathsDocument, variables),
      options
    );
export const useInfiniteGetStoryDetailStaticPathsQuery = <
      TData = GetStoryDetailStaticPathsQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetStoryDetailStaticPathsQueryVariables,
      variables: GetStoryDetailStaticPathsQueryVariables,
      options?: UseInfiniteQueryOptions<GetStoryDetailStaticPathsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetStoryDetailStaticPathsQuery, TError, TData>(
      ['getStoryDetailStaticPaths.infinite', variables],
      (metaData) => graphqlFetcher<GetStoryDetailStaticPathsQuery, GetStoryDetailStaticPathsQueryVariables>(GetStoryDetailStaticPathsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getStoryDetailData<T>(
	variables: ExactAlt<T, GetStoryDetailDataQueryVariables>
): Promise<GetStoryDetailDataQuery> {
	return fetchApi(GetStoryDetailDataDocument, { variables });
}

export async function getStoryDetailStaticPaths<T>(
	variables: ExactAlt<T, GetStoryDetailStaticPathsQueryVariables>
): Promise<GetStoryDetailStaticPathsQuery> {
	return fetchApi(GetStoryDetailStaticPathsDocument, { variables });
}

import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';


export async function prefetchQueries<T>(
	vars: {
		getStoryDetailData: ExactAlt<T, GetStoryDetailDataQueryVariables>
	},
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getStoryDetailData', vars.getStoryDetailData], () => getStoryDetailData(vars.getStoryDetailData), options),
		client.prefetchInfiniteQuery(['getStoryDetailData.infinite', vars.getStoryDetailData], () => getStoryDetailData(vars.getStoryDetailData), options),
	]);
	
	return client;
}
