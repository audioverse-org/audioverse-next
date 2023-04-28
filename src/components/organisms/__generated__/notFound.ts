import * as Types from '../../../__generated__/graphql';

import { CardRecordingFragmentDoc } from '../../molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../templates/__generated__/andMiniplayer';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetNotFoundPageDataQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetNotFoundPageDataQuery = { __typename?: 'Query', websiteRecentRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null } };


export const GetNotFoundPageDataDocument = `
    query getNotFoundPageData {
  websiteRecentRecordings(language: ENGLISH, first: 3) {
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
export const useGetNotFoundPageDataQuery = <
      TData = GetNotFoundPageDataQuery,
      TError = unknown
    >(
      variables?: GetNotFoundPageDataQueryVariables,
      options?: UseQueryOptions<GetNotFoundPageDataQuery, TError, TData>
    ) =>
    useQuery<GetNotFoundPageDataQuery, TError, TData>(
      variables === undefined ? ['getNotFoundPageData'] : ['getNotFoundPageData', variables],
      graphqlFetcher<GetNotFoundPageDataQuery, GetNotFoundPageDataQueryVariables>(GetNotFoundPageDataDocument, variables),
      options
    );
import { fetchApi } from '~lib/api/fetchApi' 

export async function getNotFoundPageData<T>(
	variables: ExactAlt<T, GetNotFoundPageDataQueryVariables>
): Promise<GetNotFoundPageDataQuery> {
	return fetchApi(GetNotFoundPageDataDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getNotFoundPageData: ExactAlt<T, GetNotFoundPageDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getNotFoundPageData', () => getNotFoundPageData(vars.getNotFoundPageData)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}