import * as Types from '../../../__generated__/graphql';

import { CardRecordingFragmentDoc } from '../../../components/molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../../components/molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../../components/molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../../components/molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../../components/molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../components/templates/__generated__/andMiniplayer';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetSearchResultsRecordingsQueryVariables = Types.Exact<{
  language: Types.Language;
  term: Types.Scalars['String'];
  first: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
}>;


export type GetSearchResultsRecordingsQuery = { __typename?: 'Query', recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null } };


export const GetSearchResultsRecordingsDocument = `
    query getSearchResultsRecordings($language: Language!, $term: String!, $first: Int!, $offset: Int!) {
  recordings(language: $language, search: $term, first: $first, offset: $offset) {
    aggregate {
      count
    }
    nodes {
      ...cardRecording
    }
  }
}
    ${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetSearchResultsRecordingsQuery = <
      TData = GetSearchResultsRecordingsQuery,
      TError = unknown
    >(
      variables: GetSearchResultsRecordingsQueryVariables,
      options?: UseQueryOptions<GetSearchResultsRecordingsQuery, TError, TData>
    ) =>
    useQuery<GetSearchResultsRecordingsQuery, TError, TData>(
      ['getSearchResultsRecordings', variables],
      graphqlFetcher<GetSearchResultsRecordingsQuery, GetSearchResultsRecordingsQueryVariables>(GetSearchResultsRecordingsDocument, variables),
      options
    );
export const useInfiniteGetSearchResultsRecordingsQuery = <
      TData = GetSearchResultsRecordingsQuery,
      TError = unknown
    >(
      pageParamKey: keyof GetSearchResultsRecordingsQueryVariables,
      variables: GetSearchResultsRecordingsQueryVariables,
      options?: UseInfiniteQueryOptions<GetSearchResultsRecordingsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetSearchResultsRecordingsQuery, TError, TData>(
      ['getSearchResultsRecordings.infinite', variables],
      (metaData) => graphqlFetcher<GetSearchResultsRecordingsQuery, GetSearchResultsRecordingsQueryVariables>(GetSearchResultsRecordingsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getSearchResultsRecordings<T>(
	variables: ExactAlt<T, GetSearchResultsRecordingsQueryVariables>
): Promise<GetSearchResultsRecordingsQuery> {
	return fetchApi(GetSearchResultsRecordingsDocument, { variables });
}

import { QueryClient } from '@tanstack/react-query';
import makeQueryClient from '~lib/makeQueryClient';


export async function prefetchQueries<T>(
	vars: {
		getSearchResultsRecordings: ExactAlt<T, GetSearchResultsRecordingsQueryVariables>
	},
	client: QueryClient = makeQueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	await Promise.all([
		client.prefetchQuery(['getSearchResultsRecordings', vars.getSearchResultsRecordings], () => getSearchResultsRecordings(vars.getSearchResultsRecordings), options),
		client.prefetchInfiniteQuery(['getSearchResultsRecordings.infinite', vars.getSearchResultsRecordings], () => getSearchResultsRecordings(vars.getSearchResultsRecordings), options),
	]);
	
	return client;
}
