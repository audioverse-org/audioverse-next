import * as Types from '../../../../__generated__/graphql';

import { SequenceFragmentDoc } from '../../../../components/organisms/__generated__/sequence';
import { CardRecordingFragmentDoc } from '../../../../components/molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../../../components/molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../../../components/molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../../../components/molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../../../components/molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../../components/templates/__generated__/andMiniplayer';
import { GenerateFeedFragmentDoc } from '../../../../lib/__generated__/generateFeed';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetStoryAlbumDetailPageDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetStoryAlbumDetailPageDataQuery = { __typename?: 'Query', storySeason: { __typename?: 'Sequence', canonicalUrl: string, language: Types.Language, id: string | number, title: string, contentType: Types.SequenceContentType, duration: number, description: string, startDate: string | null, endDate: string | null, shareUrl: string, collection: { __typename?: 'Collection', title: string, canonicalPath: string } | null, image: { __typename?: 'Image', url: string } | null, sponsor: { __typename?: 'Sponsor', title: string, canonicalPath: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null } } | null };

export type GetStoryAlbumFeedDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetStoryAlbumFeedDataQuery = { __typename?: 'Query', storySeason: { __typename?: 'Sequence', id: string | number, title: string, canonicalUrl: string, language: Types.Language, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', id: string | number, title: string, contentType: Types.RecordingContentType, description: string | null, publishDate: string | null, authors: Array<{ __typename?: 'Person', name: string }>, narrators: Array<{ __typename?: 'Person', name: string }>, audioFiles: Array<{ __typename?: 'AudioFile', id: string | number, url: string, filesize: string, duration: number, mimeType: string, bitrate: number }>, videoFiles: Array<{ __typename?: 'VideoFile', id: string | number, url: string, filesize: string, duration: number, mimeType: string, bitrate: number, container: string }>, persons: Array<{ __typename?: 'Person', name: string }>, sequence: { __typename?: 'Sequence', title: string } | null, sponsor: { __typename?: 'Sponsor', title: string } | null }> | null } } | null };

export type GetStoryAlbumDetailPathsDataQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetStoryAlbumDetailPathsDataQuery = { __typename?: 'Query', storySeasons: { __typename?: 'SequenceConnection', nodes: Array<{ __typename?: 'Sequence', canonicalPath: string }> | null } };


export const GetStoryAlbumDetailPageDataDocument = `
    query getStoryAlbumDetailPageData($id: ID!) {
  storySeason(id: $id) {
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
export const useGetStoryAlbumDetailPageDataQuery = <
      TData = GetStoryAlbumDetailPageDataQuery,
      TError = unknown
    >(
      variables: GetStoryAlbumDetailPageDataQueryVariables,
      options?: UseQueryOptions<GetStoryAlbumDetailPageDataQuery, TError, TData>
    ) =>
    useQuery<GetStoryAlbumDetailPageDataQuery, TError, TData>(
      ['getStoryAlbumDetailPageData', variables],
      graphqlFetcher<GetStoryAlbumDetailPageDataQuery, GetStoryAlbumDetailPageDataQueryVariables>(GetStoryAlbumDetailPageDataDocument, variables),
      options
    );
export const useInfiniteGetStoryAlbumDetailPageDataQuery = <
      TData = GetStoryAlbumDetailPageDataQuery,
      TError = unknown
    >(
      variables: GetStoryAlbumDetailPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetStoryAlbumDetailPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetStoryAlbumDetailPageDataQuery, TError, TData>(
      ['getStoryAlbumDetailPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetStoryAlbumDetailPageDataQuery, GetStoryAlbumDetailPageDataQueryVariables>(GetStoryAlbumDetailPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetStoryAlbumFeedDataDocument = `
    query getStoryAlbumFeedData($id: ID!) {
  storySeason(id: $id) {
    id
    title
    image {
      url(size: 600)
    }
    canonicalUrl(useFuturePath: true)
    recordings(first: 25) {
      nodes {
        ...generateFeed
        authors: persons(role: WRITER) {
          name
        }
        narrators: persons(role: SPEAKER) {
          name
        }
      }
    }
    language
  }
}
    ${GenerateFeedFragmentDoc}`;
export const useGetStoryAlbumFeedDataQuery = <
      TData = GetStoryAlbumFeedDataQuery,
      TError = unknown
    >(
      variables: GetStoryAlbumFeedDataQueryVariables,
      options?: UseQueryOptions<GetStoryAlbumFeedDataQuery, TError, TData>
    ) =>
    useQuery<GetStoryAlbumFeedDataQuery, TError, TData>(
      ['getStoryAlbumFeedData', variables],
      graphqlFetcher<GetStoryAlbumFeedDataQuery, GetStoryAlbumFeedDataQueryVariables>(GetStoryAlbumFeedDataDocument, variables),
      options
    );
export const useInfiniteGetStoryAlbumFeedDataQuery = <
      TData = GetStoryAlbumFeedDataQuery,
      TError = unknown
    >(
      variables: GetStoryAlbumFeedDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetStoryAlbumFeedDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetStoryAlbumFeedDataQuery, TError, TData>(
      ['getStoryAlbumFeedData.infinite', variables],
      (metaData) => graphqlFetcher<GetStoryAlbumFeedDataQuery, GetStoryAlbumFeedDataQueryVariables>(GetStoryAlbumFeedDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetStoryAlbumDetailPathsDataDocument = `
    query getStoryAlbumDetailPathsData($language: Language!, $first: Int) {
  storySeasons(language: $language, first: $first) {
    nodes {
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetStoryAlbumDetailPathsDataQuery = <
      TData = GetStoryAlbumDetailPathsDataQuery,
      TError = unknown
    >(
      variables: GetStoryAlbumDetailPathsDataQueryVariables,
      options?: UseQueryOptions<GetStoryAlbumDetailPathsDataQuery, TError, TData>
    ) =>
    useQuery<GetStoryAlbumDetailPathsDataQuery, TError, TData>(
      ['getStoryAlbumDetailPathsData', variables],
      graphqlFetcher<GetStoryAlbumDetailPathsDataQuery, GetStoryAlbumDetailPathsDataQueryVariables>(GetStoryAlbumDetailPathsDataDocument, variables),
      options
    );
export const useInfiniteGetStoryAlbumDetailPathsDataQuery = <
      TData = GetStoryAlbumDetailPathsDataQuery,
      TError = unknown
    >(
      variables: GetStoryAlbumDetailPathsDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetStoryAlbumDetailPathsDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetStoryAlbumDetailPathsDataQuery, TError, TData>(
      ['getStoryAlbumDetailPathsData.infinite', variables],
      (metaData) => graphqlFetcher<GetStoryAlbumDetailPathsDataQuery, GetStoryAlbumDetailPathsDataQueryVariables>(GetStoryAlbumDetailPathsDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getStoryAlbumDetailPageData<T>(
	variables: ExactAlt<T, GetStoryAlbumDetailPageDataQueryVariables>
): Promise<GetStoryAlbumDetailPageDataQuery> {
	return fetchApi(GetStoryAlbumDetailPageDataDocument, { variables });
}

export async function getStoryAlbumFeedData<T>(
	variables: ExactAlt<T, GetStoryAlbumFeedDataQueryVariables>
): Promise<GetStoryAlbumFeedDataQuery> {
	return fetchApi(GetStoryAlbumFeedDataDocument, { variables });
}

export async function getStoryAlbumDetailPathsData<T>(
	variables: ExactAlt<T, GetStoryAlbumDetailPathsDataQueryVariables>
): Promise<GetStoryAlbumDetailPathsDataQuery> {
	return fetchApi(GetStoryAlbumDetailPathsDataDocument, { variables });
}
import { QueryClient } from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getStoryAlbumDetailPageData: ExactAlt<T, GetStoryAlbumDetailPageDataQueryVariables>,
		getStoryAlbumFeedData: ExactAlt<T, GetStoryAlbumFeedDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getStoryAlbumDetailPageData', vars.getStoryAlbumDetailPageData], () => getStoryAlbumDetailPageData(vars.getStoryAlbumDetailPageData), options),
		client.prefetchInfiniteQuery(['getStoryAlbumDetailPageData.infinite', vars.getStoryAlbumDetailPageData], () => getStoryAlbumDetailPageData(vars.getStoryAlbumDetailPageData), options),
		client.prefetchQuery(['getStoryAlbumFeedData', vars.getStoryAlbumFeedData], () => getStoryAlbumFeedData(vars.getStoryAlbumFeedData), options),
		client.prefetchInfiniteQuery(['getStoryAlbumFeedData.infinite', vars.getStoryAlbumFeedData], () => getStoryAlbumFeedData(vars.getStoryAlbumFeedData), options),
	]);
	
	return client;
}