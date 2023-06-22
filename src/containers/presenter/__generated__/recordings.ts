import * as Types from '../../../__generated__/graphql';

import { PresenterPivotFragmentDoc } from './pivot';
import { CardRecordingFragmentDoc } from '../../../components/molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../../components/molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../../components/molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../../components/molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../../components/molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../components/templates/__generated__/andMiniplayer';
import { GenerateFeedFragmentDoc } from '../../../lib/__generated__/generateFeed';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetPresenterRecordingsPageDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  offset: Types.InputMaybe<Types.Scalars['Int']>;
  first: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetPresenterRecordingsPageDataQuery = { __typename?: 'Query', person: { __typename?: 'Person', id: string | number, name: string, canonicalPath: string, recordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, imageWithFallback: { __typename?: 'Image', url: string } } | null };

export type GetPresenterRecordingsFeedDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetPresenterRecordingsFeedDataQuery = { __typename?: 'Query', person: { __typename?: 'Person', id: string | number, name: string, canonicalUrl: string, language: Types.Language, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', id: string | number, title: string, contentType: Types.RecordingContentType, description: string | null, publishDate: string | null, audioFiles: Array<{ __typename?: 'AudioFile', id: string | number, url: string, filesize: string, duration: number, mimeType: string, bitrate: number }>, videoFiles: Array<{ __typename?: 'VideoFile', id: string | number, url: string, filesize: string, duration: number, mimeType: string, bitrate: number, container: string }>, persons: Array<{ __typename?: 'Person', name: string }>, sequence: { __typename?: 'Sequence', title: string } | null, sponsor: { __typename?: 'Sponsor', title: string } | null }> | null } } | null };


export const GetPresenterRecordingsPageDataDocument = `
    query getPresenterRecordingsPageData($id: ID!, $offset: Int, $first: Int) {
  person(id: $id) {
    id
    ...presenterPivot
    recordings(
      offset: $offset
      first: $first
      orderBy: [{field: PUBLISHED_AT, direction: DESC}]
    ) {
      nodes {
        ...cardRecording
      }
      aggregate {
        count
      }
    }
  }
}
    ${PresenterPivotFragmentDoc}
${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetPresenterRecordingsPageDataQuery = <
      TData = GetPresenterRecordingsPageDataQuery,
      TError = unknown
    >(
      variables: GetPresenterRecordingsPageDataQueryVariables,
      options?: UseQueryOptions<GetPresenterRecordingsPageDataQuery, TError, TData>
    ) =>
    useQuery<GetPresenterRecordingsPageDataQuery, TError, TData>(
      ['getPresenterRecordingsPageData', variables],
      graphqlFetcher<GetPresenterRecordingsPageDataQuery, GetPresenterRecordingsPageDataQueryVariables>(GetPresenterRecordingsPageDataDocument, variables),
      options
    );
export const useInfiniteGetPresenterRecordingsPageDataQuery = <
      TData = GetPresenterRecordingsPageDataQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetPresenterRecordingsPageDataQueryVariables,
      variables: GetPresenterRecordingsPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetPresenterRecordingsPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetPresenterRecordingsPageDataQuery, TError, TData>(
      ['getPresenterRecordingsPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetPresenterRecordingsPageDataQuery, GetPresenterRecordingsPageDataQueryVariables>(GetPresenterRecordingsPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetPresenterRecordingsFeedDataDocument = `
    query getPresenterRecordingsFeedData($id: ID!) {
  person(id: $id) {
    id
    name
    image {
      url(size: 600)
    }
    canonicalUrl(useFuturePath: true)
    language
    recordings(first: 25, orderBy: [{field: PUBLISHED_AT, direction: DESC}]) {
      nodes {
        ...generateFeed
      }
    }
  }
}
    ${GenerateFeedFragmentDoc}`;
export const useGetPresenterRecordingsFeedDataQuery = <
      TData = GetPresenterRecordingsFeedDataQuery,
      TError = unknown
    >(
      variables: GetPresenterRecordingsFeedDataQueryVariables,
      options?: UseQueryOptions<GetPresenterRecordingsFeedDataQuery, TError, TData>
    ) =>
    useQuery<GetPresenterRecordingsFeedDataQuery, TError, TData>(
      ['getPresenterRecordingsFeedData', variables],
      graphqlFetcher<GetPresenterRecordingsFeedDataQuery, GetPresenterRecordingsFeedDataQueryVariables>(GetPresenterRecordingsFeedDataDocument, variables),
      options
    );
export const useInfiniteGetPresenterRecordingsFeedDataQuery = <
      TData = GetPresenterRecordingsFeedDataQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetPresenterRecordingsFeedDataQueryVariables,
      variables: GetPresenterRecordingsFeedDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetPresenterRecordingsFeedDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetPresenterRecordingsFeedDataQuery, TError, TData>(
      ['getPresenterRecordingsFeedData.infinite', variables],
      (metaData) => graphqlFetcher<GetPresenterRecordingsFeedDataQuery, GetPresenterRecordingsFeedDataQueryVariables>(GetPresenterRecordingsFeedDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getPresenterRecordingsPageData<T>(
	variables: ExactAlt<T, GetPresenterRecordingsPageDataQueryVariables>
): Promise<GetPresenterRecordingsPageDataQuery> {
	return fetchApi(GetPresenterRecordingsPageDataDocument, { variables });
}

export async function getPresenterRecordingsFeedData<T>(
	variables: ExactAlt<T, GetPresenterRecordingsFeedDataQueryVariables>
): Promise<GetPresenterRecordingsFeedDataQuery> {
	return fetchApi(GetPresenterRecordingsFeedDataDocument, { variables });
}

import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';


export async function prefetchQueries<T>(
	vars: {
		getPresenterRecordingsPageData: ExactAlt<T, GetPresenterRecordingsPageDataQueryVariables>,
		getPresenterRecordingsFeedData: ExactAlt<T, GetPresenterRecordingsFeedDataQueryVariables>
	},
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getPresenterRecordingsPageData', vars.getPresenterRecordingsPageData], () => getPresenterRecordingsPageData(vars.getPresenterRecordingsPageData), options),
		client.prefetchInfiniteQuery(['getPresenterRecordingsPageData.infinite', vars.getPresenterRecordingsPageData], () => getPresenterRecordingsPageData(vars.getPresenterRecordingsPageData), options),
		client.prefetchQuery(['getPresenterRecordingsFeedData', vars.getPresenterRecordingsFeedData], () => getPresenterRecordingsFeedData(vars.getPresenterRecordingsFeedData), options),
		client.prefetchInfiniteQuery(['getPresenterRecordingsFeedData.infinite', vars.getPresenterRecordingsFeedData], () => getPresenterRecordingsFeedData(vars.getPresenterRecordingsFeedData), options),
	]);
	
	return client;
}
