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
export type GetSeriesDetailPageDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetSeriesDetailPageDataQuery = { __typename?: 'Query', series: { __typename?: 'Sequence', canonicalUrl: string, language: Types.Language, id: string | number, title: string, contentType: Types.SequenceContentType, duration: number, description: string, startDate: string | null, endDate: string | null, shareUrl: string, collection: { __typename?: 'Collection', title: string, canonicalPath: string } | null, image: { __typename?: 'Image', url: string } | null, sponsor: { __typename?: 'Sponsor', title: string, canonicalPath: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null } } | null };

export type GetSeriesFeedDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetSeriesFeedDataQuery = { __typename?: 'Query', series: { __typename?: 'Sequence', title: string, canonicalUrl: string, language: Types.Language, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename?: 'Recording', id: string | number, title: string, contentType: Types.RecordingContentType, description: string | null, publishDate: string | null, audioFiles: Array<{ __typename?: 'AudioFile', id: string | number, url: string, filesize: string, duration: number, mimeType: string, bitrate: number }>, videoFiles: Array<{ __typename?: 'VideoFile', id: string | number, url: string, filesize: string, duration: number, mimeType: string, bitrate: number, container: string }>, persons: Array<{ __typename?: 'Person', name: string }>, sequence: { __typename?: 'Sequence', title: string } | null, sponsor: { __typename?: 'Sponsor', title: string } | null }> | null } } | null };

export type GetSeriesDetailPathsDataQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetSeriesDetailPathsDataQuery = { __typename?: 'Query', serieses: { __typename?: 'SequenceConnection', nodes: Array<{ __typename?: 'Sequence', canonicalPath: string }> | null } };


export const GetSeriesDetailPageDataDocument = `
    query getSeriesDetailPageData($id: ID!) {
  series(id: $id) {
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
export const useGetSeriesDetailPageDataQuery = <
      TData = GetSeriesDetailPageDataQuery,
      TError = unknown
    >(
      variables: GetSeriesDetailPageDataQueryVariables,
      options?: UseQueryOptions<GetSeriesDetailPageDataQuery, TError, TData>
    ) =>
    useQuery<GetSeriesDetailPageDataQuery, TError, TData>(
      ['getSeriesDetailPageData', variables],
      graphqlFetcher<GetSeriesDetailPageDataQuery, GetSeriesDetailPageDataQueryVariables>(GetSeriesDetailPageDataDocument, variables),
      options
    );
export const GetSeriesFeedDataDocument = `
    query getSeriesFeedData($id: ID!) {
  series(id: $id) {
    title
    canonicalUrl(useFuturePath: true)
    language
    recordings(first: 25) {
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
export const useGetSeriesFeedDataQuery = <
      TData = GetSeriesFeedDataQuery,
      TError = unknown
    >(
      variables: GetSeriesFeedDataQueryVariables,
      options?: UseQueryOptions<GetSeriesFeedDataQuery, TError, TData>
    ) =>
    useQuery<GetSeriesFeedDataQuery, TError, TData>(
      ['getSeriesFeedData', variables],
      graphqlFetcher<GetSeriesFeedDataQuery, GetSeriesFeedDataQueryVariables>(GetSeriesFeedDataDocument, variables),
      options
    );
export const GetSeriesDetailPathsDataDocument = `
    query getSeriesDetailPathsData($language: Language!, $first: Int) {
  serieses(language: $language, first: $first) {
    nodes {
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetSeriesDetailPathsDataQuery = <
      TData = GetSeriesDetailPathsDataQuery,
      TError = unknown
    >(
      variables: GetSeriesDetailPathsDataQueryVariables,
      options?: UseQueryOptions<GetSeriesDetailPathsDataQuery, TError, TData>
    ) =>
    useQuery<GetSeriesDetailPathsDataQuery, TError, TData>(
      ['getSeriesDetailPathsData', variables],
      graphqlFetcher<GetSeriesDetailPathsDataQuery, GetSeriesDetailPathsDataQueryVariables>(GetSeriesDetailPathsDataDocument, variables),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function getSeriesDetailPageData<T>(
	variables: ExactAlt<T, GetSeriesDetailPageDataQueryVariables>
): Promise<GetSeriesDetailPageDataQuery> {
	return fetchApi(GetSeriesDetailPageDataDocument, { variables });
}

export async function getSeriesFeedData<T>(
	variables: ExactAlt<T, GetSeriesFeedDataQueryVariables>
): Promise<GetSeriesFeedDataQuery> {
	return fetchApi(GetSeriesFeedDataDocument, { variables });
}

export async function getSeriesDetailPathsData<T>(
	variables: ExactAlt<T, GetSeriesDetailPathsDataQueryVariables>
): Promise<GetSeriesDetailPathsDataQuery> {
	return fetchApi(GetSeriesDetailPathsDataDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	props: {
		getSeriesDetailPageData: ExactAlt<T, GetSeriesDetailPageDataQueryVariables>,
		getSeriesFeedData: ExactAlt<T, GetSeriesFeedDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getSeriesDetailPageData', () => getSeriesDetailPageData(props.getSeriesDetailPageData)],
		['getSeriesFeedData', () => getSeriesFeedData(props.getSeriesFeedData)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}