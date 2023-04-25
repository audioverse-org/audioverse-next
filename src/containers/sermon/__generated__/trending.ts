import * as Types from '../../../__generated__/graphql';

import { CardRecordingFragmentDoc } from '../../../components/molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../../components/molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../../components/molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../../components/molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../../components/molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../components/templates/__generated__/andMiniplayer';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetTrendingTeachingsPageDataQueryVariables = Types.Exact<{
  language: Types.Language;
  hasVideo: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type GetTrendingTeachingsPageDataQuery = { __typename?: 'Query', recordings: { __typename?: 'PopularRecordingConnection', nodes: Array<{ __typename?: 'PopularRecording', recording: { __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> } }> | null } };


export const GetTrendingTeachingsPageDataDocument = `
    query getTrendingTeachingsPageData($language: Language!, $hasVideo: Boolean) {
  recordings: popularRecordings(
    language: $language
    first: 24
    contentType: SERMON
    hasVideo: $hasVideo
  ) {
    nodes {
      recording {
        ...cardRecording
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
export const useGetTrendingTeachingsPageDataQuery = <
      TData = GetTrendingTeachingsPageDataQuery,
      TError = unknown
    >(
      variables: GetTrendingTeachingsPageDataQueryVariables,
      options?: UseQueryOptions<GetTrendingTeachingsPageDataQuery, TError, TData>
    ) =>
    useQuery<GetTrendingTeachingsPageDataQuery, TError, TData>(
      ['getTrendingTeachingsPageData', variables],
      graphqlFetcher<GetTrendingTeachingsPageDataQuery, GetTrendingTeachingsPageDataQueryVariables>(GetTrendingTeachingsPageDataDocument, variables),
      options
    );
export const useInfiniteGetTrendingTeachingsPageDataQuery = <
      TData = GetTrendingTeachingsPageDataQuery,
      TError = unknown
    >(
      variables: GetTrendingTeachingsPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetTrendingTeachingsPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetTrendingTeachingsPageDataQuery, TError, TData>(
      ['getTrendingTeachingsPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetTrendingTeachingsPageDataQuery, GetTrendingTeachingsPageDataQueryVariables>(GetTrendingTeachingsPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getTrendingTeachingsPageData<T>(
	variables: ExactAlt<T, GetTrendingTeachingsPageDataQueryVariables>
): Promise<GetTrendingTeachingsPageDataQuery> {
	return fetchApi(GetTrendingTeachingsPageDataDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getTrendingTeachingsPageData: ExactAlt<T, GetTrendingTeachingsPageDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getTrendingTeachingsPageData', () => getTrendingTeachingsPageData(vars.getTrendingTeachingsPageData)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}