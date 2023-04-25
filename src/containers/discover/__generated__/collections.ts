import * as Types from '../../../__generated__/graphql';

import { CardFavoriteEntityFragmentDoc } from '../../../components/molecules/card/__generated__/favoriteEntity';
import { CardRecordingFragmentDoc } from '../../../components/molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../../components/molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../../components/molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../../components/molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../../components/molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../components/templates/__generated__/andMiniplayer';
import { CardSequenceFragmentDoc } from '../../../components/molecules/card/__generated__/sequence';
import { CardRecordingStackFragmentDoc } from '../../../components/molecules/card/__generated__/recordingStack';
import { CardCollectionFragmentDoc } from '../../../components/molecules/card/__generated__/collection';
import { CardSponsorFragmentDoc } from '../../../components/molecules/card/__generated__/sponsor';
import { CardPersonFragmentDoc } from '../../../components/molecules/card/__generated__/person';
import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions, QueryFunctionContext } from 'react-query';
import { graphqlFetcher } from '~lib/api/graphqlFetcher';
export type GetDiscoverCollectionsPageDataQueryVariables = Types.Exact<{
  language: Types.Language;
}>;


export type GetDiscoverCollectionsPageDataQuery = { __typename?: 'Query', websiteFeaturedCollection: { __typename: 'Collection', id: string | number, canonicalPath: string, title: string, startDate: string | null, endDate: string | null, duration: number, collectionContentType: Types.CollectionContentType, image: { __typename?: 'Image', id: string | number, url: string } | null, allSequences: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, allRecordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } } | { __typename: 'Person', id: string | number, name: string, canonicalPath: string, image: { __typename?: 'Image', id: string | number, url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } } | { __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> } | { __typename: 'Sequence', viewerHasFavorited: boolean, id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null, favoritedRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, image: { __typename?: 'Image', url: string } | null, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null } } | { __typename: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null, collections: { __typename?: 'CollectionConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, sequences: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } } | null, persons: { __typename?: 'PersonConnection', nodes: Array<{ __typename: 'Person', id: string | number, name: string, canonicalPath: string, image: { __typename?: 'Image', id: string | number, url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } }> | null }, serieses: { __typename?: 'SequenceConnection', nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null }, conferences: { __typename?: 'CollectionConnection', nodes: Array<{ __typename: 'Collection', id: string | number, canonicalPath: string, title: string, startDate: string | null, endDate: string | null, duration: number, collectionContentType: Types.CollectionContentType, image: { __typename?: 'Image', id: string | number, url: string } | null, allSequences: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, allRecordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } }> | null }, sponsors: { __typename?: 'SponsorConnection', nodes: Array<{ __typename: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null, collections: { __typename?: 'CollectionConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, sequences: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } }> | null }, audiobooks: { __typename?: 'SequenceConnection', nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null }, storySeasons: { __typename?: 'SequenceConnection', nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null }, musicAlbums: { __typename?: 'SequenceConnection', nodes: Array<{ __typename: 'Sequence', id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null }> | null } };


export const GetDiscoverCollectionsPageDataDocument = `
    query getDiscoverCollectionsPageData($language: Language!) {
  websiteFeaturedCollection {
    ...cardFavoriteEntity
  }
  persons(
    language: $language
    first: 3
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardPerson
    }
  }
  serieses(
    language: $language
    first: 3
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardSequence
    }
  }
  conferences(
    language: $language
    first: 3
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardCollection
    }
  }
  sponsors(
    language: $language
    first: 3
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardSponsor
    }
  }
  audiobooks(
    language: $language
    first: 3
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardSequence
    }
  }
  storySeasons(
    language: $language
    first: 3
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardSequence
    }
  }
  musicAlbums(
    language: $language
    first: 3
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardSequence
    }
  }
}
    ${CardFavoriteEntityFragmentDoc}
${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${CardHatSponsorFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}
${CardSequenceFragmentDoc}
${CardRecordingStackFragmentDoc}
${CardCollectionFragmentDoc}
${CardSponsorFragmentDoc}
${CardPersonFragmentDoc}`;
export const useGetDiscoverCollectionsPageDataQuery = <
      TData = GetDiscoverCollectionsPageDataQuery,
      TError = unknown
    >(
      variables: GetDiscoverCollectionsPageDataQueryVariables,
      options?: UseQueryOptions<GetDiscoverCollectionsPageDataQuery, TError, TData>
    ) =>
    useQuery<GetDiscoverCollectionsPageDataQuery, TError, TData>(
      ['getDiscoverCollectionsPageData', variables],
      graphqlFetcher<GetDiscoverCollectionsPageDataQuery, GetDiscoverCollectionsPageDataQueryVariables>(GetDiscoverCollectionsPageDataDocument, variables),
      options
    );
export const useInfiniteGetDiscoverCollectionsPageDataQuery = <
      TData = GetDiscoverCollectionsPageDataQuery,
      TError = unknown
    >(
      variables: GetDiscoverCollectionsPageDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetDiscoverCollectionsPageDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetDiscoverCollectionsPageDataQuery, TError, TData>(
      ['getDiscoverCollectionsPageData.infinite', variables],
      (metaData) => graphqlFetcher<GetDiscoverCollectionsPageDataQuery, GetDiscoverCollectionsPageDataQueryVariables>(GetDiscoverCollectionsPageDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getDiscoverCollectionsPageData<T>(
	variables: ExactAlt<T, GetDiscoverCollectionsPageDataQueryVariables>
): Promise<GetDiscoverCollectionsPageDataQuery> {
	return fetchApi(GetDiscoverCollectionsPageDataDocument, { variables });
}
import {QueryClient} from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getDiscoverCollectionsPageData: ExactAlt<T, GetDiscoverCollectionsPageDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const queryPairs: [string, () => unknown][] = [
		['getDiscoverCollectionsPageData', () => getDiscoverCollectionsPageData(vars.getDiscoverCollectionsPageData)],
	]

	await Promise.all(queryPairs.map((p) => client.prefetchQuery(...p)));
	
	return client;
}