import * as Types from '../../../../../__generated__/graphql';

import { CardRecordingFragmentDoc } from '../../../../molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../../../molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../../../molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../../../molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../../../molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../../templates/__generated__/andMiniplayer';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetDiscoverRecentTeachingsQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.Scalars['Int']['input'];
  after: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetDiscoverRecentTeachingsQuery = { __typename?: 'Query', recentTeachings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };


export const GetDiscoverRecentTeachingsDocument = `
    query getDiscoverRecentTeachings($language: Language!, $first: Int!, $after: String) {
  recentTeachings: sermons(
    language: $language
    first: $first
    after: $after
    orderBy: {field: PUBLISHED_AT, direction: DESC}
  ) {
    nodes {
      ...cardRecording
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetDiscoverRecentTeachingsQuery = <
      TData = GetDiscoverRecentTeachingsQuery,
      TError = unknown
    >(
      variables: GetDiscoverRecentTeachingsQueryVariables,
      options?: UseQueryOptions<GetDiscoverRecentTeachingsQuery, TError, TData>
    ) =>
    useQuery<GetDiscoverRecentTeachingsQuery, TError, TData>(
      ['getDiscoverRecentTeachings', variables],
      graphqlFetcher<GetDiscoverRecentTeachingsQuery, GetDiscoverRecentTeachingsQueryVariables>(GetDiscoverRecentTeachingsDocument, variables),
      options
    );
export const useInfiniteGetDiscoverRecentTeachingsQuery = <
      TData = GetDiscoverRecentTeachingsQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetDiscoverRecentTeachingsQueryVariables,
      variables: GetDiscoverRecentTeachingsQueryVariables,
      options?: UseInfiniteQueryOptions<GetDiscoverRecentTeachingsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetDiscoverRecentTeachingsQuery, TError, TData>(
      ['getDiscoverRecentTeachings.infinite', variables],
      (metaData) => graphqlFetcher<GetDiscoverRecentTeachingsQuery, GetDiscoverRecentTeachingsQueryVariables>(GetDiscoverRecentTeachingsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getDiscoverRecentTeachings<T>(
	variables: ExactAlt<T, GetDiscoverRecentTeachingsQueryVariables>
): Promise<GetDiscoverRecentTeachingsQuery> {
	return fetchApi(GetDiscoverRecentTeachingsDocument, { variables });
}

import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';


export async function prefetchQueries<T>(
	vars: {
		getDiscoverRecentTeachings: ExactAlt<T, GetDiscoverRecentTeachingsQueryVariables>
	},
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getDiscoverRecentTeachings', vars.getDiscoverRecentTeachings], () => getDiscoverRecentTeachings(vars.getDiscoverRecentTeachings), options),
		client.prefetchInfiniteQuery(['getDiscoverRecentTeachings.infinite', vars.getDiscoverRecentTeachings], () => getDiscoverRecentTeachings(vars.getDiscoverRecentTeachings), options),
	]);
	
	return client;
}
