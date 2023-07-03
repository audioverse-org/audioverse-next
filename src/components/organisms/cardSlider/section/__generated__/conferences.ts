import * as Types from '../../../../../__generated__/graphql';

import { CardCollectionFragmentDoc } from '../../../../molecules/card/__generated__/collection';
import { CardSequenceFragmentDoc } from '../../../../molecules/card/__generated__/sequence';
import { PersonLockupFragmentDoc } from '../../../../molecules/__generated__/personLockup';
import { CardRecordingFragmentDoc } from '../../../../molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../../../molecules/card/__generated__/recordingSequenceHat';
import { CardHatSponsorFragmentDoc } from '../../../../molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../../../molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../../templates/__generated__/andMiniplayer';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetDiscoverConferencesQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.Scalars['Int']['input'];
  after: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetDiscoverConferencesQuery = { __typename?: 'Query', conferences: { __typename?: 'CollectionConnection', nodes: Array<{ __typename: 'Collection', id: string | number, canonicalPath: string, title: string, startDate: string | null, endDate: string | null, duration: number, collectionContentType: Types.CollectionContentType, sequences: { __typename?: 'SequenceConnection', nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null }, recordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null }, image: { __typename?: 'Image', id: string | number, url: string } | null, allSequences: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, allRecordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } };


export const GetDiscoverConferencesDocument = `
    query getDiscoverConferences($language: Language!, $first: Int!, $after: String) {
  conferences(
    language: $language
    first: $first
    after: $after
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardCollection
      sequences(first: 2, orderBy: [{field: RECORDING_COUNT, direction: DESC}]) {
        nodes {
          ...cardSequence
        }
      }
      recordings(
        first: 2
        sequenceId: 0
        orderBy: [{field: PUBLISHED_AT, direction: DESC}]
      ) {
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
    ${CardCollectionFragmentDoc}
${CardSequenceFragmentDoc}
${PersonLockupFragmentDoc}
${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetDiscoverConferencesQuery = <
      TData = GetDiscoverConferencesQuery,
      TError = unknown
    >(
      variables: GetDiscoverConferencesQueryVariables,
      options?: UseQueryOptions<GetDiscoverConferencesQuery, TError, TData>
    ) =>
    useQuery<GetDiscoverConferencesQuery, TError, TData>(
      ['getDiscoverConferences', variables],
      graphqlFetcher<GetDiscoverConferencesQuery, GetDiscoverConferencesQueryVariables>(GetDiscoverConferencesDocument, variables),
      options
    );
export const useInfiniteGetDiscoverConferencesQuery = <
      TData = GetDiscoverConferencesQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetDiscoverConferencesQueryVariables,
      variables: GetDiscoverConferencesQueryVariables,
      options?: UseInfiniteQueryOptions<GetDiscoverConferencesQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetDiscoverConferencesQuery, TError, TData>(
      ['getDiscoverConferences.infinite', variables],
      (metaData) => graphqlFetcher<GetDiscoverConferencesQuery, GetDiscoverConferencesQueryVariables>(GetDiscoverConferencesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi';
import { ExactAlt } from '~src/types/types';

export async function getDiscoverConferences<T>(
	variables: ExactAlt<T, GetDiscoverConferencesQueryVariables>
): Promise<GetDiscoverConferencesQuery> {
	return fetchApi(GetDiscoverConferencesDocument, { variables });
}

import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';


export async function prefetchQueries<T>(
	vars: {
		getDiscoverConferences: ExactAlt<T, GetDiscoverConferencesQueryVariables>
	},
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getDiscoverConferences', vars.getDiscoverConferences], () => getDiscoverConferences(vars.getDiscoverConferences), options),
		client.prefetchInfiniteQuery(['getDiscoverConferences.infinite', vars.getDiscoverConferences], () => getDiscoverConferences(vars.getDiscoverConferences), options),
	]);
	
	return client;
}
