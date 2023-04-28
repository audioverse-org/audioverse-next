import * as Types from '../../../__generated__/graphql';

import { SequenceFragmentDoc } from '../../../components/organisms/__generated__/sequence';
import { CardRecordingFragmentDoc } from '../../../components/molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../../components/molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../../components/molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../../components/molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../../components/molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../components/templates/__generated__/andMiniplayer';
import { GenerateFeedFragmentDoc } from '../../../lib/__generated__/generateFeed';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetAudiobookDetailPageDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetAudiobookDetailPageDataQuery = { __typename?: 'Query', audiobook: { __typename?: 'Sequence', canonicalUrl: string, language: Types.Language, id: string | number, title: string, contentType: Types.SequenceContentType, duration: number, description: string, startDate: string | null, endDate: string | null, shareUrl: string, collection: { __typename?: 'Collection', title: string, canonicalPath: string } | null, image: { __typename?: 'Image', url: string } | null, sponsor: { __typename?: 'Sponsor', title: string, canonicalPath: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null } } | null };

export type GetAudiobookFeedDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetAudiobookFeedDataQuery = { __typename?: 'Query', sequence: { __typename?: 'Sequence', id: string | number, title: string, contentType: Types.SequenceContentType, canonicalUrl: string, language: Types.Language, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', id: string | number, title: string, contentType: Types.RecordingContentType, description: string | null, publishDate: string | null, authors: Array<{ __typename?: 'Person', name: string }>, narrators: Array<{ __typename?: 'Person', name: string }>, audioFiles: Array<{ __typename?: 'AudioFile', id: string | number, url: string, filesize: string, duration: number, mimeType: string, bitrate: number }>, videoFiles: Array<{ __typename?: 'VideoFile', id: string | number, url: string, filesize: string, duration: number, mimeType: string, bitrate: number, container: string }>, persons: Array<{ __typename?: 'Person', name: string }>, sequence: { __typename?: 'Sequence', title: string } | null, sponsor: { __typename?: 'Sponsor', title: string } | null }> | null } } | null };

export type GetAudiobookDetailPathsDataQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetAudiobookDetailPathsDataQuery = { __typename?: 'Query', audiobooks: { __typename?: 'SequenceConnection', nodes: Array<{ __typename?: 'Sequence', canonicalPath: string }> | null } };


export const GetAudiobookDetailPageDataDocument = `
    query getAudiobookDetailPageData($id: ID!) {
  audiobook(id: $id) {
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
export const useGetAudiobookDetailPageDataQuery = <
      TData = GetAudiobookDetailPageDataQuery,
      TError = unknown
    >(
      variables: GetAudiobookDetailPageDataQueryVariables,
      options?: UseQueryOptions<GetAudiobookDetailPageDataQuery, TError, TData>
    ) =>
    useQuery<GetAudiobookDetailPageDataQuery, TError, TData>(
      ['getAudiobookDetailPageData', variables],
      graphqlFetcher<GetAudiobookDetailPageDataQuery, GetAudiobookDetailPageDataQueryVariables>(GetAudiobookDetailPageDataDocument, variables),
      options
    );
export const GetAudiobookFeedDataDocument = `
    query getAudiobookFeedData($id: ID!) {
  sequence(id: $id) {
    id
    title
    contentType
    image {
      url(size: 600)
    }
    canonicalUrl(useFuturePath: true)
    language
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
  }
}
    ${GenerateFeedFragmentDoc}`;
export const useGetAudiobookFeedDataQuery = <
      TData = GetAudiobookFeedDataQuery,
      TError = unknown
    >(
      variables: GetAudiobookFeedDataQueryVariables,
      options?: UseQueryOptions<GetAudiobookFeedDataQuery, TError, TData>
    ) =>
    useQuery<GetAudiobookFeedDataQuery, TError, TData>(
      ['getAudiobookFeedData', variables],
      graphqlFetcher<GetAudiobookFeedDataQuery, GetAudiobookFeedDataQueryVariables>(GetAudiobookFeedDataDocument, variables),
      options
    );
export const GetAudiobookDetailPathsDataDocument = `
    query getAudiobookDetailPathsData($language: Language!, $first: Int) {
  audiobooks(language: $language, first: $first) {
    nodes {
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetAudiobookDetailPathsDataQuery = <
      TData = GetAudiobookDetailPathsDataQuery,
      TError = unknown
    >(
      variables: GetAudiobookDetailPathsDataQueryVariables,
      options?: UseQueryOptions<GetAudiobookDetailPathsDataQuery, TError, TData>
    ) =>
    useQuery<GetAudiobookDetailPathsDataQuery, TError, TData>(
      ['getAudiobookDetailPathsData', variables],
      graphqlFetcher<GetAudiobookDetailPathsDataQuery, GetAudiobookDetailPathsDataQueryVariables>(GetAudiobookDetailPathsDataDocument, variables),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function getAudiobookDetailPageData<T>(
	variables: ExactAlt<T, GetAudiobookDetailPageDataQueryVariables>
): Promise<GetAudiobookDetailPageDataQuery> {
	return fetchApi(GetAudiobookDetailPageDataDocument, { variables });
}

export async function getAudiobookFeedData<T>(
	variables: ExactAlt<T, GetAudiobookFeedDataQueryVariables>
): Promise<GetAudiobookFeedDataQuery> {
	return fetchApi(GetAudiobookFeedDataDocument, { variables });
}

export async function getAudiobookDetailPathsData<T>(
	variables: ExactAlt<T, GetAudiobookDetailPathsDataQueryVariables>
): Promise<GetAudiobookDetailPathsDataQuery> {
	return fetchApi(GetAudiobookDetailPathsDataDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getAudiobookDetailPageData: ExactAlt<T, GetAudiobookDetailPageDataQueryVariables>,
		getAudiobookFeedData: ExactAlt<T, GetAudiobookFeedDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getAudiobookDetailPageData', () => getAudiobookDetailPageData(vars.getAudiobookDetailPageData)],
		['getAudiobookFeedData', () => getAudiobookFeedData(vars.getAudiobookFeedData)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}