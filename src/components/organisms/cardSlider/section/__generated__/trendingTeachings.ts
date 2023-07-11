import * as Types from '../../../../../__generated__/graphql';

import { CardRecordingFragmentDoc } from '../../../../molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../../../molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../../../molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../../../molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../../../molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../../templates/__generated__/andMiniplayer';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetDiscoverTrendingTeachingsQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.Scalars['Int']['input'];
  after: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetDiscoverTrendingTeachingsQuery = { __typename?: 'Query', trendingTeachings: { __typename?: 'PopularRecordingConnection', nodes: Array<{ __typename?: 'PopularRecording', recording: { __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };


export const GetDiscoverTrendingTeachingsDocument = `
    query getDiscoverTrendingTeachings($language: Language!, $first: Int!, $after: String) {
  trendingTeachings: popularRecordings(
    language: $language
    contentType: SERMON
    first: $first
    after: $after
  ) {
    nodes {
      recording {
        ...cardRecording
      }
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
export const useGetDiscoverTrendingTeachingsQuery = <
      TData = GetDiscoverTrendingTeachingsQuery,
      TError = unknown
    >(
      variables: GetDiscoverTrendingTeachingsQueryVariables,
      options?: UseQueryOptions<GetDiscoverTrendingTeachingsQuery, TError, TData>
    ) =>
    useQuery<GetDiscoverTrendingTeachingsQuery, TError, TData>(
      ['getDiscoverTrendingTeachings', variables],
      graphqlFetcher<GetDiscoverTrendingTeachingsQuery, GetDiscoverTrendingTeachingsQueryVariables>(GetDiscoverTrendingTeachingsDocument, variables),
      options
    );
export const useInfiniteGetDiscoverTrendingTeachingsQuery = <
      TData = GetDiscoverTrendingTeachingsQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetDiscoverTrendingTeachingsQueryVariables,
      variables: GetDiscoverTrendingTeachingsQueryVariables,
      options?: UseInfiniteQueryOptions<GetDiscoverTrendingTeachingsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetDiscoverTrendingTeachingsQuery, TError, TData>(
      ['getDiscoverTrendingTeachings.infinite', variables],
      (metaData) => graphqlFetcher<GetDiscoverTrendingTeachingsQuery, GetDiscoverTrendingTeachingsQueryVariables>(GetDiscoverTrendingTeachingsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getDiscoverTrendingTeachings<T>(
	variables: ExactAlt<T, GetDiscoverTrendingTeachingsQueryVariables>
): Promise<GetDiscoverTrendingTeachingsQuery> {
	return fetchApi(GetDiscoverTrendingTeachingsDocument, { variables });
}