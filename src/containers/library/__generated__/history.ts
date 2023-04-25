import * as Types from '../../../__generated__/graphql';

import { CardRecordingFragmentDoc } from '../../../components/molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../../components/molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../../components/molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../../components/molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../../components/molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../components/templates/__generated__/andMiniplayer';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetLibraryHistoryPageDataQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
}>;


export type GetLibraryHistoryPageDataQuery = { __typename?: 'Query', me: { __typename?: 'AuthenticatedUser', user: { __typename?: 'User', downloadHistory: { __typename?: 'UserDownloadHistoryConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename?: 'UserDownloadHistory', recording: { __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean } } } } | null };


export const GetLibraryHistoryPageDataDocument = `
    query getLibraryHistoryPageData($language: Language!, $first: Int!, $offset: Int!) {
  me {
    user {
      downloadHistory(
        language: $language
        first: $first
        offset: $offset
        orderBy: [{field: CREATED_AT, direction: DESC}]
      ) {
        aggregate {
          count
        }
        nodes {
          recording {
            ...cardRecording
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
}
    ${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}`;
export const useGetLibraryHistoryPageDataQuery = <
      TData = GetLibraryHistoryPageDataQuery,
      TError = unknown
    >(
      variables: GetLibraryHistoryPageDataQueryVariables,
      options?: UseQueryOptions<GetLibraryHistoryPageDataQuery, TError, TData>
    ) =>
    useQuery<GetLibraryHistoryPageDataQuery, TError, TData>(
      ['getLibraryHistoryPageData', variables],
      graphqlFetcher<GetLibraryHistoryPageDataQuery, GetLibraryHistoryPageDataQueryVariables>(GetLibraryHistoryPageDataDocument, variables),
      options
    );
export const useInfiniteGetLibraryHistoryPageDataQuery = <
      TData = GetLibraryHistoryPageDataQuery,
      TError = unknown
    >(
      variables: GetLibraryHistoryPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetLibraryHistoryPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetLibraryHistoryPageDataQuery, TError, TData>(
      ['getLibraryHistoryPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetLibraryHistoryPageDataQuery, GetLibraryHistoryPageDataQueryVariables>(GetLibraryHistoryPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getLibraryHistoryPageData<T>(
	variables: ExactAlt<T, GetLibraryHistoryPageDataQueryVariables>
): Promise<GetLibraryHistoryPageDataQuery> {
	return fetchApi(GetLibraryHistoryPageDataDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getLibraryHistoryPageData: ExactAlt<T, GetLibraryHistoryPageDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getLibraryHistoryPageData', () => getLibraryHistoryPageData(vars.getLibraryHistoryPageData)],
		['getLibraryHistoryPageData.infinite', () => getLibraryHistoryPageData(vars.getLibraryHistoryPageData)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}