import * as Types from '../../lib/generated/graphql';

import { CardFavoriteFragmentDoc } from '../../components/molecules/card/favorite.generated';
import { CardRecordingFragmentDoc } from '../../components/molecules/card/recording.generated';
import { CardRecordingSequenceHatFragmentDoc } from '../../components/molecules/card/recordingSequenceHat.generated';
import { PersonLockupFragmentDoc } from '../../components/molecules/personLockup.generated';
import { TeaseRecordingFragmentDoc } from '../../components/molecules/teaseRecording.generated';
import { AndMiniplayerFragmentDoc } from '../../components/templates/andMiniplayer.generated';
import { CardSequenceFragmentDoc } from '../../components/molecules/card/sequence.generated';
import { CardRecordingStackFragmentDoc } from '../../components/molecules/card/recordingStack.generated';
import { SponsorLockupFragmentDoc } from '../../components/molecules/sponsorLockup.generated';
import { CardCollectionFragmentDoc } from '../../components/molecules/card/collection.generated';
import { CardSponsorFragmentDoc } from '../../components/molecules/card/sponsor.generated';
import { CardPersonFragmentDoc } from '../../components/molecules/card/person.generated';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/fetchApi';
export type GetLibraryDataQueryVariables = Types.Exact<{
	language: Types.Language;
	first: Types.Scalars['Int'];
	offset: Types.Scalars['Int'];
	groupSequences: Types.Scalars['Boolean'];
	hasVideo: Types.InputMaybe<Types.Scalars['Boolean']>;
	recordingDuration: Types.InputMaybe<Types.IntegerRangeInput>;
	recordingContentType: Types.InputMaybe<Types.RecordingContentType>;
	types: Types.InputMaybe<
		| Array<Types.FavoritableCatalogEntityType>
		| Types.FavoritableCatalogEntityType
	>;
	viewerPlaybackStatus: Types.InputMaybe<Types.RecordingViewerPlaybackStatus>;
	sortField: Types.FavoritesSortableField;
	sortDirection: Types.OrderByDirection;
}>;

export type GetLibraryDataQuery = {
	__typename?: 'Query';
	me:
		| {
				__typename?: 'AuthenticatedUser';
				user: {
					__typename?: 'User';
					favorites: {
						__typename?: 'UserFavoriteConnection';
						aggregate:
							| { __typename?: 'Aggregate'; count: number }
							| null
							| undefined;
						nodes:
							| Array<{
									__typename?: 'UserFavorite';
									createdAt: string;
									entity:
										| {
												__typename: 'Collection';
												id: string | number;
												canonicalPath: string;
												title: string;
												startDate: string | null | undefined;
												endDate: string | null | undefined;
												duration: number;
												collectionContentType: Types.CollectionContentType;
												image:
													| {
															__typename?: 'Image';
															id: string | number;
															url: string;
													  }
													| null
													| undefined;
												allSequences: {
													__typename?: 'SequenceConnection';
													aggregate:
														| { __typename?: 'Aggregate'; count: number }
														| null
														| undefined;
												};
												allRecordings: {
													__typename?: 'RecordingConnection';
													aggregate:
														| { __typename?: 'Aggregate'; count: number }
														| null
														| undefined;
												};
										  }
										| {
												__typename: 'Person';
												id: string | number;
												name: string;
												canonicalPath: string;
												image:
													| {
															__typename?: 'Image';
															id: string | number;
															url: string;
													  }
													| null
													| undefined;
												recordings: {
													__typename?: 'RecordingConnection';
													aggregate:
														| { __typename?: 'Aggregate'; count: number }
														| null
														| undefined;
												};
										  }
										| {
												__typename: 'Recording';
												canonicalPath: string;
												sequenceIndex: number | null | undefined;
												id: string | number;
												title: string;
												duration: number;
												recordingContentType: Types.RecordingContentType;
												sequence:
													| {
															__typename?: 'Sequence';
															id: string | number;
															canonicalPath: string;
															contentType: Types.SequenceContentType;
															title: string;
															image:
																| { __typename?: 'Image'; url: string }
																| null
																| undefined;
															recordings: {
																__typename?: 'RecordingConnection';
																aggregate:
																	| { __typename?: 'Aggregate'; count: number }
																	| null
																	| undefined;
															};
													  }
													| null
													| undefined;
												writers: Array<{
													__typename?: 'Person';
													name: string;
													canonicalPath: string;
													imageWithFallback: {
														__typename?: 'Image';
														url: string;
													};
												}>;
												persons: Array<{
													__typename?: 'Person';
													name: string;
													canonicalPath: string;
													imageWithFallback: {
														__typename?: 'Image';
														url: string;
													};
												}>;
												audioFiles: Array<{
													__typename?: 'AudioFile';
													url: string;
													filesize: string;
													mimeType: string;
													duration: number;
												}>;
												videoFiles: Array<{
													__typename?: 'VideoFile';
													url: string;
													filesize: string;
													mimeType: string;
													duration: number;
												}>;
												videoStreams: Array<{
													__typename?: 'VideoFile';
													url: string;
													filesize: string;
													mimeType: string;
													duration: number;
												}>;
										  }
										| {
												__typename: 'Sequence';
												viewerHasFavorited: boolean;
												id: string | number;
												title: string;
												canonicalPath: string;
												contentType: Types.SequenceContentType;
												duration: number;
												summary: string;
												speakers: {
													__typename?: 'PersonConnection';
													nodes:
														| Array<{
																__typename?: 'Person';
																name: string;
																canonicalPath: string;
																imageWithFallback: {
																	__typename?: 'Image';
																	url: string;
																};
														  }>
														| null
														| undefined;
												};
												sequenceWriters: {
													__typename?: 'PersonConnection';
													nodes:
														| Array<{
																__typename?: 'Person';
																name: string;
																canonicalPath: string;
																imageWithFallback: {
																	__typename?: 'Image';
																	url: string;
																};
														  }>
														| null
														| undefined;
												};
												allRecordings: {
													__typename?: 'RecordingConnection';
													aggregate:
														| { __typename?: 'Aggregate'; count: number }
														| null
														| undefined;
												};
												favoritedRecordings: {
													__typename?: 'RecordingConnection';
													nodes:
														| Array<{
																__typename?: 'Recording';
																canonicalPath: string;
																sequenceIndex: number | null | undefined;
																id: string | number;
																title: string;
																duration: number;
																recordingContentType: Types.RecordingContentType;
																sponsor:
																	| {
																			__typename?: 'Sponsor';
																			id: string | number;
																			title: string;
																			canonicalPath: string;
																			imageWithFallback: {
																				__typename?: 'Image';
																				url: string;
																			};
																	  }
																	| null
																	| undefined;
																persons: Array<{
																	__typename?: 'Person';
																	name: string;
																	canonicalPath: string;
																	imageWithFallback: {
																		__typename?: 'Image';
																		url: string;
																	};
																}>;
																sequence:
																	| {
																			__typename?: 'Sequence';
																			id: string | number;
																			canonicalPath: string;
																			contentType: Types.SequenceContentType;
																			title: string;
																			recordings: {
																				__typename?: 'RecordingConnection';
																				aggregate:
																					| {
																							__typename?: 'Aggregate';
																							count: number;
																					  }
																					| null
																					| undefined;
																			};
																			image:
																				| { __typename?: 'Image'; url: string }
																				| null
																				| undefined;
																	  }
																	| null
																	| undefined;
																writers: Array<{
																	__typename?: 'Person';
																	name: string;
																	canonicalPath: string;
																	imageWithFallback: {
																		__typename?: 'Image';
																		url: string;
																	};
																}>;
																audioFiles: Array<{
																	__typename?: 'AudioFile';
																	url: string;
																	filesize: string;
																	mimeType: string;
																	duration: number;
																}>;
																videoFiles: Array<{
																	__typename?: 'VideoFile';
																	url: string;
																	filesize: string;
																	mimeType: string;
																	duration: number;
																}>;
																videoStreams: Array<{
																	__typename?: 'VideoFile';
																	url: string;
																	filesize: string;
																	mimeType: string;
																	duration: number;
																}>;
														  }>
														| null
														| undefined;
												};
										  }
										| {
												__typename: 'Sponsor';
												id: string | number;
												title: string;
												canonicalPath: string;
												image:
													| { __typename?: 'Image'; url: string }
													| null
													| undefined;
												collections: {
													__typename?: 'CollectionConnection';
													aggregate:
														| { __typename?: 'Aggregate'; count: number }
														| null
														| undefined;
												};
												sequences: {
													__typename?: 'SequenceConnection';
													aggregate:
														| { __typename?: 'Aggregate'; count: number }
														| null
														| undefined;
												};
												recordings: {
													__typename?: 'RecordingConnection';
													aggregate:
														| { __typename?: 'Aggregate'; count: number }
														| null
														| undefined;
												};
										  };
							  }>
							| null
							| undefined;
					};
				};
		  }
		| null
		| undefined;
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
${CardRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}
${PersonLockupFragmentDoc}
${TeaseRecordingFragmentDoc}
${AndMiniplayerFragmentDoc}
${CardSequenceFragmentDoc}
${CardRecordingStackFragmentDoc}
${SponsorLockupFragmentDoc}
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

export const GetLibraryDataDocument = `query getLibraryData($language:Language!$first:Int!$offset:Int!$groupSequences:Boolean!$hasVideo:Boolean$recordingDuration:IntegerRangeInput$recordingContentType:RecordingContentType$types:[FavoritableCatalogEntityType!]$viewerPlaybackStatus:RecordingViewerPlaybackStatus$sortField:FavoritesSortableField!$sortDirection:OrderByDirection!){me{user{favorites(language:$language first:$first offset:$offset groupSequences:$groupSequences recordingDuration:$recordingDuration recordingContentType:$recordingContentType hasVideo:$hasVideo types:$types viewerPlaybackStatus:$viewerPlaybackStatus orderBy:[{field:$sortField direction:$sortDirection}]){aggregate{count}nodes{...cardFavorite}}}}}`;
export async function getLibraryData<T>(
	variables: ExactAlt<T, GetLibraryDataQueryVariables>
): Promise<GetLibraryDataQuery> {
	return fetchApi(GetLibraryDataDocument, { variables });
}
