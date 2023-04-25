import * as Types from '../../../__generated__/graphql';

import { CardRecordingFragmentDoc } from '../../../components/molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../../components/molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../../components/molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../../components/molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../../components/molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../components/templates/__generated__/andMiniplayer';
import { CardSequenceFragmentDoc } from '../../../components/molecules/card/__generated__/sequence';
import { CardCollectionFragmentDoc } from '../../../components/molecules/card/__generated__/collection';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetPresenterDetailPageDataQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  language: Types.Language;
}>;


export type GetPresenterDetailPageDataQuery = { __typename?: 'Query', person: { __typename?: 'Person', id: string | number, name: string, description: string, canonicalUrl: string, language: Types.Language, shareUrl: string, website: string | null, imageWithFallback: { __typename?: 'Image', url: string }, sermons: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, audiobookTracks: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, musicTracks: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, stories: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, essentialRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null }, recentRecordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean } }, topRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean } } } | null, sequences: { __typename?: 'SequenceConnection', nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean } }, collections: { __typename?: 'CollectionConnection', nodes: Array<{ __typename: 'Collection', id: string | number, canonicalPath: string, title: string, startDate: string | null, endDate: string | null, duration: number, collectionContentType: Types.CollectionContentType, sequences: { __typename?: 'SequenceConnection', nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null }, image: { __typename?: 'Image', id: string | number, url: string } | null, allSequences: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, allRecordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } }> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean } } };

export type GetPresenterDetailPathsDataQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetPresenterDetailPathsDataQuery = { __typename?: 'Query', persons: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', id: string | number, canonicalPath: string }> | null } };


export const GetPresenterDetailPageDataDocument = `
    query getPresenterDetailPageData($id: ID!, $language: Language!) {
  person(id: $id) {
    id
    name
    description
    canonicalUrl(useFuturePath: true)
    language
    shareUrl
    imageWithFallback {
      url(size: 128)
    }
    website
    sermons: recordings(contentType: SERMON) {
      aggregate {
        count
      }
    }
    audiobookTracks: recordings(contentType: AUDIOBOOK_TRACK) {
      aggregate {
        count
      }
    }
    musicTracks: recordings(contentType: MUSIC_TRACK) {
      aggregate {
        count
      }
    }
    stories: recordings(contentType: STORY) {
      aggregate {
        count
      }
    }
    essentialRecordings: recordings(
      first: 3
      isFeatured: true
      orderBy: [{field: DOWNLOADS_ALL_TIME, direction: DESC}]
    ) {
      nodes {
        ...cardRecording
      }
    }
    recentRecordings: recordings(
      first: 3
      orderBy: [{field: PUBLISHED_AT, direction: DESC}]
    ) {
      aggregate {
        count
      }
      nodes {
        ...cardRecording
      }
      pageInfo {
        hasNextPage
      }
    }
    topRecordings: recordings(
      first: 3
      orderBy: [{field: DOWNLOADS_ALL_TIME, direction: DESC}]
    ) {
      nodes {
        ...cardRecording
      }
      pageInfo {
        hasNextPage
      }
    }
  }
  sequences(
    language: $language
    persons: [{personId: $id}]
    first: 3
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardSequence
    }
    pageInfo {
      hasNextPage
    }
  }
  collections(
    language: $language
    persons: [{personId: $id}]
    first: 3
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardCollection
      sequences(persons: [{personId: $id}], orderBy: [{field: TITLE, direction: ASC}]) {
        nodes {
          ...cardSequence
        }
      }
    }
    pageInfo {
      hasNextPage
    }
  }
}
    ${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}
${CardSequenceFragmentDoc}
${CardCollectionFragmentDoc}`;
export const useGetPresenterDetailPageDataQuery = <
      TData = GetPresenterDetailPageDataQuery,
      TError = unknown
    >(
      variables: GetPresenterDetailPageDataQueryVariables,
      options?: UseQueryOptions<GetPresenterDetailPageDataQuery, TError, TData>
    ) =>
    useQuery<GetPresenterDetailPageDataQuery, TError, TData>(
      ['getPresenterDetailPageData', variables],
      graphqlFetcher<GetPresenterDetailPageDataQuery, GetPresenterDetailPageDataQueryVariables>(GetPresenterDetailPageDataDocument, variables),
      options
    );
export const useInfiniteGetPresenterDetailPageDataQuery = <
      TData = GetPresenterDetailPageDataQuery,
      TError = unknown
    >(
      variables: GetPresenterDetailPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetPresenterDetailPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetPresenterDetailPageDataQuery, TError, TData>(
      ['getPresenterDetailPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetPresenterDetailPageDataQuery, GetPresenterDetailPageDataQueryVariables>(GetPresenterDetailPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const GetPresenterDetailPathsDataDocument = `
    query getPresenterDetailPathsData($language: Language!, $first: Int) {
  persons(language: $language, first: $first) {
    nodes {
      id
      canonicalPath(useFuturePath: true)
    }
  }
}
    `;
export const useGetPresenterDetailPathsDataQuery = <
      TData = GetPresenterDetailPathsDataQuery,
      TError = unknown
    >(
      variables: GetPresenterDetailPathsDataQueryVariables,
      options?: UseQueryOptions<GetPresenterDetailPathsDataQuery, TError, TData>
    ) =>
    useQuery<GetPresenterDetailPathsDataQuery, TError, TData>(
      ['getPresenterDetailPathsData', variables],
      graphqlFetcher<GetPresenterDetailPathsDataQuery, GetPresenterDetailPathsDataQueryVariables>(GetPresenterDetailPathsDataDocument, variables),
      options
    );
export const useInfiniteGetPresenterDetailPathsDataQuery = <
      TData = GetPresenterDetailPathsDataQuery,
      TError = unknown
    >(
      variables: GetPresenterDetailPathsDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetPresenterDetailPathsDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetPresenterDetailPathsDataQuery, TError, TData>(
      ['getPresenterDetailPathsData.infinite', variables],
      (metaData) => graphqlFetcher<GetPresenterDetailPathsDataQuery, GetPresenterDetailPathsDataQueryVariables>(GetPresenterDetailPathsDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getPresenterDetailPageData<T>(
	variables: ExactAlt<T, GetPresenterDetailPageDataQueryVariables>
): Promise<GetPresenterDetailPageDataQuery> {
	return fetchApi(GetPresenterDetailPageDataDocument, { variables });
}

export async function getPresenterDetailPathsData<T>(
	variables: ExactAlt<T, GetPresenterDetailPathsDataQueryVariables>
): Promise<GetPresenterDetailPathsDataQuery> {
	return fetchApi(GetPresenterDetailPathsDataDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getPresenterDetailPageData: ExactAlt<T, GetPresenterDetailPageDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getPresenterDetailPageData', () => getPresenterDetailPageData(vars.getPresenterDetailPageData)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}