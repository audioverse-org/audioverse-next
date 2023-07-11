import * as Types from '../../../../../__generated__/graphql';

import { CardRecordingFragmentDoc } from '../../../../molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../../../molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../../../molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../../../molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../../../molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../../templates/__generated__/andMiniplayer';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetDiscoverFeaturedTeachingsQueryVariables = Types.Exact<{
  language: Types.Language;
  first?: Types.Scalars['Int']['input'];
  after: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetDiscoverFeaturedTeachingsQuery = { __typename?: 'Query', featuredTeachings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };


export const GetDiscoverFeaturedTeachingsDocument = `
    query getDiscoverFeaturedTeachings($language: Language!, $first: Int! = 3, $after: String) {
  featuredTeachings: featuredRecordings(
    language: $language
    contentType: SERMON
    first: $first
    after: $after
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
export const useGetDiscoverFeaturedTeachingsQuery = <
      TData = GetDiscoverFeaturedTeachingsQuery,
      TError = unknown
    >(
      variables: GetDiscoverFeaturedTeachingsQueryVariables,
      options?: UseQueryOptions<GetDiscoverFeaturedTeachingsQuery, TError, TData>
    ) =>
    useQuery<GetDiscoverFeaturedTeachingsQuery, TError, TData>(
      ['getDiscoverFeaturedTeachings', variables],
      graphqlFetcher<GetDiscoverFeaturedTeachingsQuery, GetDiscoverFeaturedTeachingsQueryVariables>(GetDiscoverFeaturedTeachingsDocument, variables),
      options
    );
export const useInfiniteGetDiscoverFeaturedTeachingsQuery = <
      TData = GetDiscoverFeaturedTeachingsQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetDiscoverFeaturedTeachingsQueryVariables,
      variables: GetDiscoverFeaturedTeachingsQueryVariables,
      options?: UseInfiniteQueryOptions<GetDiscoverFeaturedTeachingsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetDiscoverFeaturedTeachingsQuery, TError, TData>(
      ['getDiscoverFeaturedTeachings.infinite', variables],
      (metaData) => graphqlFetcher<GetDiscoverFeaturedTeachingsQuery, GetDiscoverFeaturedTeachingsQueryVariables>(GetDiscoverFeaturedTeachingsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getDiscoverFeaturedTeachings<T>(
	variables: ExactAlt<T, GetDiscoverFeaturedTeachingsQueryVariables>
): Promise<GetDiscoverFeaturedTeachingsQuery> {
	return fetchApi(GetDiscoverFeaturedTeachingsDocument, { variables });
}