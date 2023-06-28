import * as Types from '../../../__generated__/graphql';

import { SponsorLockupFragmentDoc } from '../../../components/molecules/__generated__/sponsorLockup';
import { CardPersonFragmentDoc } from '../../../components/molecules/card/__generated__/person';
import { CardSequenceFragmentDoc } from '../../../components/molecules/card/__generated__/sequence';
import { PersonLockupFragmentDoc } from '../../../components/molecules/__generated__/personLockup';
import { CardRecordingFragmentDoc } from '../../../components/molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../../components/molecules/card/__generated__/recordingSequenceHat';
import { CardHatSponsorFragmentDoc } from '../../../components/molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../../components/molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../components/templates/__generated__/andMiniplayer';
import { GenerateFeedFragmentDoc } from '../../../lib/__generated__/generateFeed';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetCollectionDetailPageDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type GetCollectionDetailPageDataQuery = { __typename?: 'Query', collection: { __typename?: 'Collection', id: string | number, title: string, contentType: Types.CollectionContentType, startDate: string | null, endDate: string | null, duration: number, description: string, canonicalUrl: string, language: Types.Language, shareUrl: string, location: string | null, image: { __typename?: 'Image', url: string } | null, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: { __typename?: 'PersonConnection', nodes: Array<{ __typename: 'Person', id: string | number, name: string, canonicalPath: string, image: { __typename?: 'Image', id: string | number, url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean } }, sequences: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean } }, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean } } } | null };

export type GetCollectionFeedDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type GetCollectionFeedDataQuery = { __typename?: 'Query', collection: { __typename?: 'Collection', title: string, canonicalUrl: string, language: Types.Language, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename?: 'Recording', id: string | number, title: string, contentType: Types.RecordingContentType, description: string | null, publishDate: string | null, audioFiles: Array<{ __typename?: 'AudioFile', id: string | number, url: string, filesize: string, duration: number, mimeType: string, bitrate: number }>, videoFiles: Array<{ __typename?: 'VideoFile', id: string | number, url: string, filesize: string, duration: number, mimeType: string, bitrate: number, container: string }>, persons: Array<{ __typename?: 'Person', name: string }>, sequence: { __typename?: 'Sequence', title: string } | null, sponsor: { __typename?: 'Sponsor', title: string } | null }> | null } } | null };

export type GetCollectionDetailPathsDataQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetCollectionDetailPathsDataQuery = { __typename?: 'Query', collections: { __typename?: 'CollectionConnection', nodes: Array<{ __typename?: 'Collection', id: string | number, canonicalPath: string }> | null } };


export const GetCollectionDetailPageDataDocument = `
    query getCollectionDetailPageData($id: ID!) {
  collection(id: $id) {
    id
    title
    contentType
    startDate
    endDate
    duration
    description
    canonicalUrl(useFuturePath: true)
    language
    shareUrl
    location
    image {
      url(size: 1000, cropMode: MAX_SIZE)
    }
    sponsor {
      id
      title
      canonicalPath(useFuturePath: true)
      ...sponsorLockup
    }
    persons(
      first: 3
      role: SPEAKER
      orderBy: [{field: RECORDING_COUNT, direction: DESC}, {field: RECORDING_DOWNLOADS_ALL_TIME, direction: DESC}]
    ) {
      nodes {
        ...cardPerson
      }
      pageInfo {
        hasNextPage
      }
    }
    sequences(first: 3, orderBy: [{field: RECORDING_COUNT, direction: DESC}]) {
      aggregate {
        count
      }
      nodes {
        ...cardSequence
      }
      pageInfo {
        hasNextPage
      }
    }
    recordings(
      first: 3
      sequenceId: 0
      orderBy: [{field: PUBLISHED_AT, direction: DESC}]
    ) {
      aggregate {
        count
      }
      nodes {
        ...cardRecording
      }
      pageInfo {
        hasNextPage
      }
    }
  }
}
    ${SponsorLockupFragmentDoc}
${CardPersonFragmentDoc}
${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}
${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetCollectionDetailPageDataQuery = <
      TData = GetCollectionDetailPageDataQuery,
      TError = unknown
    >(
      variables: GetCollectionDetailPageDataQueryVariables,
      options?: UseQueryOptions<GetCollectionDetailPageDataQuery, TError, TData>
    ) =>
    useQuery<GetCollectionDetailPageDataQuery, TError, TData>(
      ['getCollectionDetailPageData', variables],
      graphqlFetcher<GetCollectionDetailPageDataQuery, GetCollectionDetailPageDataQueryVariables>(GetCollectionDetailPageDataDocument, variables),
      options
    );
export const useInfiniteGetCollectionDetailPageDataQuery = <
      TData = GetCollectionDetailPageDataQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetCollectionDetailPageDataQueryVariables,
      variables: GetCollectionDetailPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetCollectionDetailPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetCollectionDetailPageDataQuery, TError, TData>(
      ['getCollectionDetailPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetCollectionDetailPageDataQuery, GetCollectionDetailPageDataQueryVariables>(GetCollectionDetailPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetCollectionFeedDataDocument = `
    query getCollectionFeedData($id: ID!) {
  collection(id: $id) {
    title
    canonicalUrl(useFuturePath: true)
    language
    image {
      url(size: 600)
    }
    recordings(first: 25, orderBy: [{field: RECORDED_AT, direction: ASC}]) {
      aggregate {
        count
      }
      nodes {
        ...generateFeed
      }
    }
  }
}
    ${GenerateFeedFragmentDoc}`;
export const useGetCollectionFeedDataQuery = <
      TData = GetCollectionFeedDataQuery,
      TError = unknown
    >(
      variables: GetCollectionFeedDataQueryVariables,
      options?: UseQueryOptions<GetCollectionFeedDataQuery, TError, TData>
    ) =>
    useQuery<GetCollectionFeedDataQuery, TError, TData>(
      ['getCollectionFeedData', variables],
      graphqlFetcher<GetCollectionFeedDataQuery, GetCollectionFeedDataQueryVariables>(GetCollectionFeedDataDocument, variables),
      options
    );
export const useInfiniteGetCollectionFeedDataQuery = <
      TData = GetCollectionFeedDataQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetCollectionFeedDataQueryVariables,
      variables: GetCollectionFeedDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetCollectionFeedDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetCollectionFeedDataQuery, TError, TData>(
      ['getCollectionFeedData.infinite', variables],
      (metaData) => graphqlFetcher<GetCollectionFeedDataQuery, GetCollectionFeedDataQueryVariables>(GetCollectionFeedDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetCollectionDetailPathsDataDocument = `
    query getCollectionDetailPathsData($language: Language!, $first: Int) {
  collections(language: $language, first: $first) {
    nodes {
      id
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetCollectionDetailPathsDataQuery = <
      TData = GetCollectionDetailPathsDataQuery,
      TError = unknown
    >(
      variables: GetCollectionDetailPathsDataQueryVariables,
      options?: UseQueryOptions<GetCollectionDetailPathsDataQuery, TError, TData>
    ) =>
    useQuery<GetCollectionDetailPathsDataQuery, TError, TData>(
      ['getCollectionDetailPathsData', variables],
      graphqlFetcher<GetCollectionDetailPathsDataQuery, GetCollectionDetailPathsDataQueryVariables>(GetCollectionDetailPathsDataDocument, variables),
      options
    );
export const useInfiniteGetCollectionDetailPathsDataQuery = <
      TData = GetCollectionDetailPathsDataQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetCollectionDetailPathsDataQueryVariables,
      variables: GetCollectionDetailPathsDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetCollectionDetailPathsDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetCollectionDetailPathsDataQuery, TError, TData>(
      ['getCollectionDetailPathsData.infinite', variables],
      (metaData) => graphqlFetcher<GetCollectionDetailPathsDataQuery, GetCollectionDetailPathsDataQueryVariables>(GetCollectionDetailPathsDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getCollectionDetailPageData<T>(
	variables: ExactAlt<T, GetCollectionDetailPageDataQueryVariables>
): Promise<GetCollectionDetailPageDataQuery> {
	return fetchApi(GetCollectionDetailPageDataDocument, { variables });
}

export async function getCollectionFeedData<T>(
	variables: ExactAlt<T, GetCollectionFeedDataQueryVariables>
): Promise<GetCollectionFeedDataQuery> {
	return fetchApi(GetCollectionFeedDataDocument, { variables });
}

export async function getCollectionDetailPathsData<T>(
	variables: ExactAlt<T, GetCollectionDetailPathsDataQueryVariables>
): Promise<GetCollectionDetailPathsDataQuery> {
	return fetchApi(GetCollectionDetailPathsDataDocument, { variables });
}

import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';


export async function prefetchQueries<T>(
	vars: {
		getCollectionDetailPageData: ExactAlt<T, GetCollectionDetailPageDataQueryVariables>,
		getCollectionFeedData: ExactAlt<T, GetCollectionFeedDataQueryVariables>
	},
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getCollectionDetailPageData', vars.getCollectionDetailPageData], () => getCollectionDetailPageData(vars.getCollectionDetailPageData), options),
		client.prefetchInfiniteQuery(['getCollectionDetailPageData.infinite', vars.getCollectionDetailPageData], () => getCollectionDetailPageData(vars.getCollectionDetailPageData), options),
		client.prefetchQuery(['getCollectionFeedData', vars.getCollectionFeedData], () => getCollectionFeedData(vars.getCollectionFeedData), options),
		client.prefetchInfiniteQuery(['getCollectionFeedData.infinite', vars.getCollectionFeedData], () => getCollectionFeedData(vars.getCollectionFeedData), options),
	]);
	
	return client;
}
