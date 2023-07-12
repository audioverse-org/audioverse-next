import * as Types from '../../../../../__generated__/graphql';

import { CardRecordingFragmentDoc } from '../../../../molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../../../molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../../../molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../../../molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../../../molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../../templates/__generated__/andMiniplayer';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetSectionTrendingTeachingsQueryVariables = Types.Exact<{
  language: Types.Language;
  first?: Types.Scalars['Int']['input'];
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetSectionTrendingTeachingsQuery = { __typename?: 'Query', trendingTeachings: { __typename?: 'PopularRecordingConnection', nodes: Array<{ __typename?: 'PopularRecording', recording: { __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };


export const GetSectionTrendingTeachingsDocument = `
    query getSectionTrendingTeachings($language: Language!, $first: Int! = 6, $after: String = null) {
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
export const useGetSectionTrendingTeachingsQuery = <
      TData = GetSectionTrendingTeachingsQuery,
      TError = unknown
    >(
      variables: GetSectionTrendingTeachingsQueryVariables,
      options?: UseQueryOptions<GetSectionTrendingTeachingsQuery, TError, TData>
    ) =>
    useQuery<GetSectionTrendingTeachingsQuery, TError, TData>(
      ['getSectionTrendingTeachings', variables],
      graphqlFetcher<GetSectionTrendingTeachingsQuery, GetSectionTrendingTeachingsQueryVariables>(GetSectionTrendingTeachingsDocument, variables),
      options
    );
export const useInfiniteGetSectionTrendingTeachingsQuery = <
      TData = GetSectionTrendingTeachingsQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetSectionTrendingTeachingsQueryVariables,
      variables: GetSectionTrendingTeachingsQueryVariables,
      options?: UseInfiniteQueryOptions<GetSectionTrendingTeachingsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetSectionTrendingTeachingsQuery, TError, TData>(
      ['getSectionTrendingTeachings.infinite', variables],
      (metaData) => graphqlFetcher<GetSectionTrendingTeachingsQuery, GetSectionTrendingTeachingsQueryVariables>(GetSectionTrendingTeachingsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getSectionTrendingTeachings<T>(
	variables: ExactAlt<T, GetSectionTrendingTeachingsQueryVariables>
): Promise<GetSectionTrendingTeachingsQuery> {
	return fetchApi(GetSectionTrendingTeachingsDocument, { variables });
}