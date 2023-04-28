import * as Types from '../../../__generated__/graphql';

import { CardFavoriteFragmentDoc } from '../../../components/molecules/card/__generated__/favorite';
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
export type GetLibraryDataQueryVariables = Types.Exact<{
  language: Types.Language;
  first: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
  groupSequences: Types.Scalars['Boolean'];
  hasVideo: Types.InputMaybe<Types.Scalars['Boolean']>;
  recordingDuration: Types.InputMaybe<Types.IntegerRangeInput>;
  recordingContentType: Types.InputMaybe<Types.RecordingContentType>;
  types: Types.InputMaybe<Array<Types.FavoritableCatalogEntityType> | Types.FavoritableCatalogEntityType>;
  viewerPlaybackStatus: Types.InputMaybe<Types.RecordingViewerPlaybackStatus>;
  sortField: Types.FavoritesSortableField;
  sortDirection: Types.OrderByDirection;
}>;


export type GetLibraryDataQuery = { __typename?: 'Query', me: { __typename?: 'AuthenticatedUser', user: { __typename?: 'User', favorites: { __typename?: 'UserFavoriteConnection', aggregate: { __typename?: 'Aggregate', count: number } | null, nodes: Array<{ __typename?: 'UserFavorite', createdAt: string, entity: { __typename: 'Collection', id: string | number, canonicalPath: string, title: string, startDate: string | null, endDate: string | null, duration: number, collectionContentType: Types.CollectionContentType, image: { __typename?: 'Image', id: string | number, url: string } | null, allSequences: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, allRecordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } } | { __typename: 'Person', id: string | number, name: string, canonicalPath: string, image: { __typename?: 'Image', id: string | number, url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } } | { __typename: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, image: { __typename?: 'Image', url: string } | null, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sponsor: { __typename?: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null } | null, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> } | { __typename: 'Sequence', viewerHasFavorited: boolean, id: string | number, title: string, canonicalPath: string, contentType: Types.SequenceContentType, duration: number, summary: string, speakers: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, sequenceWriters: { __typename?: 'PersonConnection', nodes: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }> | null }, allRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string }> | null, aggregate: { __typename?: 'Aggregate', count: number } | null }, collection: { __typename?: 'Collection', title: string } | null, favoritedRecordings: { __typename?: 'RecordingConnection', nodes: Array<{ __typename?: 'Recording', canonicalPath: string, sequenceIndex: number | null, id: string | number, title: string, duration: number, recordingContentType: Types.RecordingContentType, persons: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, sequence: { __typename?: 'Sequence', id: string | number, canonicalPath: string, contentType: Types.SequenceContentType, title: string, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, image: { __typename?: 'Image', url: string } | null, collection: { __typename?: 'Collection', title: string } | null } | null, writers: Array<{ __typename?: 'Person', name: string, canonicalPath: string, imageWithFallback: { __typename?: 'Image', url: string } }>, collection: { __typename?: 'Collection', title: string } | null, audioFiles: Array<{ __typename?: 'AudioFile', url: string, filesize: string, mimeType: string, duration: number }>, videoFiles: Array<{ __typename?: 'VideoFile', url: string, filesize: string, mimeType: string, duration: number }>, videoStreams: Array<{ __typename?: 'VideoFile', url: string, logUrl: string | null, filesize: string, mimeType: string, duration: number }> }> | null } } | { __typename: 'Sponsor', id: string | number, title: string, canonicalPath: string, image: { __typename?: 'Image', url: string } | null, collections: { __typename?: 'CollectionConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, sequences: { __typename?: 'SequenceConnection', aggregate: { __typename?: 'Aggregate', count: number } | null }, recordings: { __typename?: 'RecordingConnection', aggregate: { __typename?: 'Aggregate', count: number } | null } } }> | null } } } | null };


export const GetLibraryDataDocument = `
    query getLibraryData($language: Language!, $first: Int!, $offset: Int!, $groupSequences: Boolean!, $hasVideo: Boolean, $recordingDuration: IntegerRangeInput, $recordingContentType: RecordingContentType, $types: [FavoritableCatalogEntityType!], $viewerPlaybackStatus: RecordingViewerPlaybackStatus, $sortField: FavoritesSortableField!, $sortDirection: OrderByDirection!) {
  me {
    user {
      favorites(
        language: $language
        first: $first
        offset: $offset
        groupSequences: $groupSequences
        recordingDuration: $recordingDuration
        recordingContentType: $recordingContentType
        hasVideo: $hasVideo
        types: $types
        viewerPlaybackStatus: $viewerPlaybackStatus
        orderBy: [{field: $sortField, direction: $sortDirection}]
      ) {
        aggregate {
          count
        }
        nodes {
          ...cardFavorite
        }
      }
    }
  }
}
    ${CardFavoriteFragmentDoc}
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
export const useGetLibraryDataQuery = <
      TData = GetLibraryDataQuery,
      TError = unknown
    >(
      variables: GetLibraryDataQueryVariables,
      options?: UseQueryOptions<GetLibraryDataQuery, TError, TData>
    ) =>
    useQuery<GetLibraryDataQuery, TError, TData>(
      ['getLibraryData', variables],
      graphqlFetcher<GetLibraryDataQuery, GetLibraryDataQueryVariables>(GetLibraryDataDocument, variables),
      options
    );
export const useInfiniteGetLibraryDataQuery = <
      TData = GetLibraryDataQuery,
      TError = unknown
    >(
      variables: GetLibraryDataQueryVariables,
      options?: UseInfiniteQueryOptions<GetLibraryDataQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<GetLibraryDataQuery, TError, TData>(
      ['getLibraryData.infinite', variables],
      (metaData) => graphqlFetcher<GetLibraryDataQuery, GetLibraryDataQueryVariables>(GetLibraryDataDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

import { fetchApi } from '~lib/api/fetchApi' 

export async function getLibraryData<T>(
	variables: ExactAlt<T, GetLibraryDataQueryVariables>
): Promise<GetLibraryDataQuery> {
	return fetchApi(GetLibraryDataDocument, { variables });
}
import { QueryClient, QueryKey } from 'react-query';

export async function prefetchQueries<T>(
	vars: {
		getLibraryData: ExactAlt<T, GetLibraryDataQueryVariables>
	},
	client: QueryClient = new QueryClient(),
): Promise<QueryClient> {
	const options = { cacheTime: 24 * 60 * 60 * 1000 };

	const promises = [
		client.prefetchQuery(['getLibraryData', vars.getLibraryData], () => getLibraryData(vars.getLibraryData), options),
		client.prefetchInfiniteQuery(['getLibraryData.infinite', vars.getLibraryData], () => getLibraryData(vars.getLibraryData), options),
	]

	await Promise.all(promises);
	
	return client;
}