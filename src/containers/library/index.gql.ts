// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { CardFavoriteFragmentDoc } from '../../components/molecules/card/favorite.gql';
import { CardFavoriteEntityFragmentDoc } from '../../components/molecules/card/favoriteEntity.gql';
import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.gql';
import { CardRecordingSequenceHatFragmentDoc } from '../../components/molecules/card/recordingSequenceHat.gql';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.gql';
import { CardHatSponsorFragmentDoc } from '../../components/molecules/card/hat/sponsor.gql';
import { TeaseRecordingFragmentDoc } from '../../components/molecules/teaseRecording.gql';
import { AndMiniplayerFragmentDoc } from '../../components/templates/andMiniplayer.gql';
import { CardSequenceFragmentDoc } from '../../components/molecules/card/sequence.gql';
import { CardRecordingStackFragmentDoc } from '../../components/molecules/card/recordingStack.gql';
import { CardCollectionFragmentDoc } from '../../components/molecules/card/collection.gql';
import { CardSponsorFragmentDoc } from '../../components/molecules/card/sponsor.gql';
import { CardPersonFragmentDoc } from '../../components/molecules/card/person.gql';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetLibraryDataQueryVariables = Types.Exact<{
	language: Types.Language;
	first: Types.Scalars['Int'];
	offset: Types.Scalars['Int'];
	groupSequences: Types.Scalars['Boolean'];
	hasVideo?: Types.InputMaybe<Types.Scalars['Boolean']>;
	recordingDuration?: Types.InputMaybe<Types.IntegerRangeInput>;
	recordingContentType?: Types.InputMaybe<Types.RecordingContentType>;
	types?: Types.InputMaybe<
		| Array<Types.FavoritableCatalogEntityType>
		| Types.FavoritableCatalogEntityType
	>;
	viewerPlaybackStatus?: Types.InputMaybe<Types.RecordingViewerPlaybackStatus>;
	sortField: Types.FavoritesSortableField;
	sortDirection: Types.OrderByDirection;
}>;

export type GetLibraryDataQuery = {
	__typename?: 'Query';
	me?: {
		__typename?: 'AuthenticatedUser';
		user: {
			__typename?: 'User';
			favorites: {
				__typename?: 'UserFavoriteConnection';
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
				nodes?: Array<{
					__typename?: 'UserFavorite';
					createdAt: any;
					entity:
						| {
								__typename: 'Collection';
								id: string;
								canonicalPath: string;
								title: string;
								startDate?: any | null;
								endDate?: any | null;
								duration: number;
								collectionContentType: Types.CollectionContentType;
								image?: { __typename?: 'Image'; id: string; url: any } | null;
								allSequences: {
									__typename?: 'SequenceConnection';
									aggregate?: {
										__typename?: 'Aggregate';
										count: number;
									} | null;
								};
								allRecordings: {
									__typename?: 'RecordingConnection';
									aggregate?: {
										__typename?: 'Aggregate';
										count: number;
									} | null;
								};
						  }
						| {
								__typename: 'Person';
								id: string;
								name: string;
								canonicalPath: string;
								image?: { __typename?: 'Image'; id: string; url: any } | null;
								recordings: {
									__typename?: 'RecordingConnection';
									aggregate?: {
										__typename?: 'Aggregate';
										count: number;
									} | null;
								};
						  }
						| {
								__typename: 'Recording';
								canonicalPath: string;
								sequenceIndex?: number | null;
								id: string;
								title: string;
								duration: number;
								recordingContentType: Types.RecordingContentType;
								sequence?: {
									__typename?: 'Sequence';
									id: string;
									canonicalPath: string;
									contentType: Types.SequenceContentType;
									title: string;
									image?: { __typename?: 'Image'; url: any } | null;
									recordings: {
										__typename?: 'RecordingConnection';
										aggregate?: {
											__typename?: 'Aggregate';
											count: number;
										} | null;
									};
									collection?: {
										__typename?: 'Collection';
										title: string;
									} | null;
								} | null;
								writers: Array<{
									__typename?: 'Person';
									name: string;
									canonicalPath: string;
									imageWithFallback: { __typename?: 'Image'; url: any };
								}>;
								sponsor?: {
									__typename?: 'Sponsor';
									id: string;
									title: string;
									canonicalPath: string;
									image?: { __typename?: 'Image'; url: any } | null;
								} | null;
								persons: Array<{
									__typename?: 'Person';
									name: string;
									canonicalPath: string;
									imageWithFallback: { __typename?: 'Image'; url: any };
								}>;
								collection?: {
									__typename?: 'Collection';
									title: string;
								} | null;
								audioFiles: Array<{
									__typename?: 'AudioFile';
									url: any;
									filesize: string;
									mimeType: string;
									duration: number;
								}>;
								videoFiles: Array<{
									__typename?: 'VideoFile';
									url: any;
									filesize: string;
									mimeType: string;
									duration: number;
								}>;
								videoStreams: Array<{
									__typename?: 'VideoFile';
									url: any;
									logUrl?: any | null;
									filesize: string;
									mimeType: string;
									duration: number;
								}>;
						  }
						| {
								__typename: 'Sequence';
								viewerHasFavorited: boolean;
								id: string;
								title: string;
								canonicalPath: string;
								contentType: Types.SequenceContentType;
								duration: number;
								summary: string;
								speakers: {
									__typename?: 'PersonConnection';
									nodes?: Array<{
										__typename?: 'Person';
										name: string;
										canonicalPath: string;
										imageWithFallback: { __typename?: 'Image'; url: any };
									}> | null;
								};
								sequenceWriters: {
									__typename?: 'PersonConnection';
									nodes?: Array<{
										__typename?: 'Person';
										name: string;
										canonicalPath: string;
										imageWithFallback: { __typename?: 'Image'; url: any };
									}> | null;
								};
								allRecordings: {
									__typename?: 'RecordingConnection';
									nodes?: Array<{
										__typename?: 'Recording';
										canonicalPath: string;
									}> | null;
									aggregate?: {
										__typename?: 'Aggregate';
										count: number;
									} | null;
								};
								collection?: {
									__typename?: 'Collection';
									title: string;
								} | null;
								favoritedRecordings: {
									__typename?: 'RecordingConnection';
									nodes?: Array<{
										__typename?: 'Recording';
										canonicalPath: string;
										sequenceIndex?: number | null;
										id: string;
										title: string;
										duration: number;
										recordingContentType: Types.RecordingContentType;
										persons: Array<{
											__typename?: 'Person';
											name: string;
											canonicalPath: string;
											imageWithFallback: { __typename?: 'Image'; url: any };
										}>;
										sequence?: {
											__typename?: 'Sequence';
											id: string;
											canonicalPath: string;
											contentType: Types.SequenceContentType;
											title: string;
											recordings: {
												__typename?: 'RecordingConnection';
												aggregate?: {
													__typename?: 'Aggregate';
													count: number;
												} | null;
											};
											image?: { __typename?: 'Image'; url: any } | null;
											collection?: {
												__typename?: 'Collection';
												title: string;
											} | null;
										} | null;
										writers: Array<{
											__typename?: 'Person';
											name: string;
											canonicalPath: string;
											imageWithFallback: { __typename?: 'Image'; url: any };
										}>;
										collection?: {
											__typename?: 'Collection';
											title: string;
										} | null;
										audioFiles: Array<{
											__typename?: 'AudioFile';
											url: any;
											filesize: string;
											mimeType: string;
											duration: number;
										}>;
										videoFiles: Array<{
											__typename?: 'VideoFile';
											url: any;
											filesize: string;
											mimeType: string;
											duration: number;
										}>;
										videoStreams: Array<{
											__typename?: 'VideoFile';
											url: any;
											logUrl?: any | null;
											filesize: string;
											mimeType: string;
											duration: number;
										}>;
									}> | null;
								};
						  }
						| {
								__typename: 'Sponsor';
								id: string;
								title: string;
								canonicalPath: string;
								image?: { __typename?: 'Image'; url: any } | null;
								collections: {
									__typename?: 'CollectionConnection';
									aggregate?: {
										__typename?: 'Aggregate';
										count: number;
									} | null;
								};
								sequences: {
									__typename?: 'SequenceConnection';
									aggregate?: {
										__typename?: 'Aggregate';
										count: number;
									} | null;
								};
								recordings: {
									__typename?: 'RecordingConnection';
									aggregate?: {
										__typename?: 'Aggregate';
										count: number;
									} | null;
								};
						  };
				}> | null;
			};
		};
	} | null;
};

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
		graphqlFetcher<GetLibraryDataQuery, GetLibraryDataQueryVariables>(
			GetLibraryDataDocument,
			variables
		),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getLibraryData<T>(
	variables: ExactAlt<T, GetLibraryDataQueryVariables>
): Promise<GetLibraryDataQuery> {
	return fetchApi(GetLibraryDataDocument, { variables });
}
