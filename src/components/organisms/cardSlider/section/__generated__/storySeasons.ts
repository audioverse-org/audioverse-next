import * as Types from '../../../../../__generated__/graphql';

import { CardSequenceFragmentDoc } from '../../../../molecules/card/__generated__/sequence';
import { PersonLockupFragmentDoc } from '../../../../molecules/__generated__/personLockup';
import { CardRecordingFragmentDoc } from '../../../../molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../../../molecules/card/__generated__/recordingSequenceHat';
import { CardHatSponsorFragmentDoc } from '../../../../molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../../../molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../../templates/__generated__/andMiniplayer';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetSectionStorySeasonsQueryVariables = Types.Exact<{
  language: Types.Language;
  first?: Types.Scalars['Int']['input'];
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetSectionStorySeasonsQuery = { __typename?: 'Query', storySeasons: { __typename?: 'SequenceConnection', nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, recordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null }, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };


export const GetSectionStorySeasonsDocument = `
    query getSectionStorySeasons($language: Language!, $first: Int! = 3, $after: String = null) {
  storySeasons(
    language: $language
    first: $first
    after: $after
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardSequence
      recordings(first: 2) {
        nodes {
          ...cardRecording
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}
${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetSectionStorySeasonsQuery = <
      TData = GetSectionStorySeasonsQuery,
      TError = unknown
    >(
      variables: GetSectionStorySeasonsQueryVariables,
      options?: UseQueryOptions<GetSectionStorySeasonsQuery, TError, TData>
    ) =>
    useQuery<GetSectionStorySeasonsQuery, TError, TData>(
      ['getSectionStorySeasons', variables],
      graphqlFetcher<GetSectionStorySeasonsQuery, GetSectionStorySeasonsQueryVariables>(GetSectionStorySeasonsDocument, variables),
      options
    );
export const useInfiniteGetSectionStorySeasonsQuery = <
      TData = GetSectionStorySeasonsQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetSectionStorySeasonsQueryVariables,
      variables: GetSectionStorySeasonsQueryVariables,
      options?: UseInfiniteQueryOptions<GetSectionStorySeasonsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetSectionStorySeasonsQuery, TError, TData>(
      ['getSectionStorySeasons.infinite', variables],
      (metaData) => graphqlFetcher<GetSectionStorySeasonsQuery, GetSectionStorySeasonsQueryVariables>(GetSectionStorySeasonsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getSectionStorySeasons<T>(
	variables: ExactAlt<T, GetSectionStorySeasonsQueryVariables>
): Promise<GetSectionStorySeasonsQuery> {
	return fetchApi(GetSectionStorySeasonsDocument, { variables });
}