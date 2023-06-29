import * as Types from '../../../__generated__/graphql';

import { CardRecordingFragmentDoc } from '../../../components/molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../../components/molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../../components/molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../../components/molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../../components/molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../components/templates/__generated__/andMiniplayer';
import { CardSequenceFragmentDoc } from '../../../components/molecules/card/__generated__/sequence';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetTopicDetailDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type GetTopicDetailDataQuery = { __typename?: 'Query', topic: { __typename?: 'Topic', title: string, summary: string, duration: number, description: string, canonicalPath: string, parentTopic: { __typename?: 'Topic', id: string | number, title: string, canonicalPath: string } | null, items: { __typename?: 'TopicItemConnection', nodes: Array<{ __typename?: 'TopicItem', entity: { __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> } | { __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null } } | null };

export type GetTopicDetailStaticPathsQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetTopicDetailStaticPathsQuery = { __typename?: 'Query', topics: { __typename?: 'TopicConnection', nodes: Array<{ __typename?: 'Topic', id: string | number, title: string, canonicalPath: string }> | null } };


export const GetTopicDetailDataDocument = `
    query getTopicDetailData($id: ID!) {
  topic(id: $id) {
    title
    summary
    duration
    description
    canonicalPath: title
    parentTopic {
      id
      title
      canonicalPath: title
    }
    items {
      nodes {
        entity {
          __typename
          ... on Recording {
            ...cardRecording
          }
          ... on Sequence {
            ...cardSequence
          }
        }
      }
      aggregate {
        count
      }
    }
  }
}
    ${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}
${CardSequenceFragmentDoc}`;
export const useGetTopicDetailDataQuery = <
      TData = GetTopicDetailDataQuery,
      TError = unknown
    >(
      variables: GetTopicDetailDataQueryVariables,
      options?: UseQueryOptions<GetTopicDetailDataQuery, TError, TData>
    ) =>
    useQuery<GetTopicDetailDataQuery, TError, TData>(
      ['getTopicDetailData', variables],
      graphqlFetcher<GetTopicDetailDataQuery, GetTopicDetailDataQueryVariables>(GetTopicDetailDataDocument, variables),
      options
    );
export const useInfiniteGetTopicDetailDataQuery = <
      TData = GetTopicDetailDataQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetTopicDetailDataQueryVariables,
      variables: GetTopicDetailDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetTopicDetailDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetTopicDetailDataQuery, TError, TData>(
      ['getTopicDetailData.infinite', variables],
      (metaData) => graphqlFetcher<GetTopicDetailDataQuery, GetTopicDetailDataQueryVariables>(GetTopicDetailDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetTopicDetailStaticPathsDocument = `
    query getTopicDetailStaticPaths($language: Language!, $first: Int) {
  topics(language: $language, first: $first) {
    nodes {
      id
      title
      canonicalPath: title
    }
  }
}
    `;
export const useGetTopicDetailStaticPathsQuery = <
      TData = GetTopicDetailStaticPathsQuery,
      TError = unknown
    >(
      variables: GetTopicDetailStaticPathsQueryVariables,
      options?: UseQueryOptions<GetTopicDetailStaticPathsQuery, TError, TData>
    ) =>
    useQuery<GetTopicDetailStaticPathsQuery, TError, TData>(
      ['getTopicDetailStaticPaths', variables],
      graphqlFetcher<GetTopicDetailStaticPathsQuery, GetTopicDetailStaticPathsQueryVariables>(GetTopicDetailStaticPathsDocument, variables),
      options
    );
export const useInfiniteGetTopicDetailStaticPathsQuery = <
      TData = GetTopicDetailStaticPathsQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetTopicDetailStaticPathsQueryVariables,
      variables: GetTopicDetailStaticPathsQueryVariables,
      options?: UseInfiniteQueryOptions<GetTopicDetailStaticPathsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetTopicDetailStaticPathsQuery, TError, TData>(
      ['getTopicDetailStaticPaths.infinite', variables],
      (metaData) => graphqlFetcher<GetTopicDetailStaticPathsQuery, GetTopicDetailStaticPathsQueryVariables>(GetTopicDetailStaticPathsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getTopicDetailData<T>(
	variables: ExactAlt<T, GetTopicDetailDataQueryVariables>
): Promise<GetTopicDetailDataQuery> {
	return fetchApi(GetTopicDetailDataDocument, { variables });
}

export async function getTopicDetailStaticPaths<T>(
	variables: ExactAlt<T, GetTopicDetailStaticPathsQueryVariables>
): Promise<GetTopicDetailStaticPathsQuery> {
	return fetchApi(GetTopicDetailStaticPathsDocument, { variables });
}

import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';


export async function prefetchQueries<T>(
	vars: {
		getTopicDetailData: ExactAlt<T, GetTopicDetailDataQueryVariables>
	},
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getTopicDetailData', vars.getTopicDetailData], () => getTopicDetailData(vars.getTopicDetailData), options),
		client.prefetchInfiniteQuery(['getTopicDetailData.infinite', vars.getTopicDetailData], () => getTopicDetailData(vars.getTopicDetailData), options),
	]);
	
	return client;
}
