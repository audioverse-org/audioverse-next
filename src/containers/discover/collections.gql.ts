// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

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
export type GetDiscoverCollectionsPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
}>;

export type GetDiscoverCollectionsPageDataQuery = {
	__typename?: 'Query';
	websiteFeaturedCollection?:
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
					aggregate?: { __typename?: 'Aggregate'; count: number } | null;
				};
				allRecordings: {
					__typename?: 'RecordingConnection';
					aggregate?: { __typename?: 'Aggregate'; count: number } | null;
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
					aggregate?: { __typename?: 'Aggregate'; count: number } | null;
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
						aggregate?: { __typename?: 'Aggregate'; count: number } | null;
					};
					collection?: { __typename?: 'Collection'; title: string } | null;
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
				collection?: { __typename?: 'Collection'; title: string } | null;
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
					aggregate?: { __typename?: 'Aggregate'; count: number } | null;
				};
				collection?: { __typename?: 'Collection'; title: string } | null;
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
								aggregate?: { __typename?: 'Aggregate'; count: number } | null;
							};
							image?: { __typename?: 'Image'; url: any } | null;
							collection?: { __typename?: 'Collection'; title: string } | null;
						} | null;
						writers: Array<{
							__typename?: 'Person';
							name: string;
							canonicalPath: string;
							imageWithFallback: { __typename?: 'Image'; url: any };
						}>;
						collection?: { __typename?: 'Collection'; title: string } | null;
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
					aggregate?: { __typename?: 'Aggregate'; count: number } | null;
				};
				sequences: {
					__typename?: 'SequenceConnection';
					aggregate?: { __typename?: 'Aggregate'; count: number } | null;
				};
				recordings: {
					__typename?: 'RecordingConnection';
					aggregate?: { __typename?: 'Aggregate'; count: number } | null;
				};
		  }
		| null;
	persons: {
		__typename?: 'PersonConnection';
		nodes?: Array<{
			__typename?: 'Person';
			id: string;
			name: string;
			canonicalPath: string;
			image?: { __typename?: 'Image'; id: string; url: any } | null;
			recordings: {
				__typename?: 'RecordingConnection';
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
		}> | null;
	};
	serieses: {
		__typename?: 'SequenceConnection';
		nodes?: Array<{
			__typename?: 'Sequence';
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
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
			collection?: { __typename?: 'Collection'; title: string } | null;
		}> | null;
	};
	conferences: {
		__typename?: 'CollectionConnection';
		nodes?: Array<{
			__typename?: 'Collection';
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
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
			allRecordings: {
				__typename?: 'RecordingConnection';
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
		}> | null;
	};
	sponsors: {
		__typename?: 'SponsorConnection';
		nodes?: Array<{
			__typename?: 'Sponsor';
			id: string;
			title: string;
			canonicalPath: string;
			image?: { __typename?: 'Image'; url: any } | null;
			collections: {
				__typename?: 'CollectionConnection';
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
			sequences: {
				__typename?: 'SequenceConnection';
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
			recordings: {
				__typename?: 'RecordingConnection';
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
		}> | null;
	};
	audiobooks: {
		__typename?: 'SequenceConnection';
		nodes?: Array<{
			__typename?: 'Sequence';
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
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
			collection?: { __typename?: 'Collection'; title: string } | null;
		}> | null;
	};
	storySeasons: {
		__typename?: 'SequenceConnection';
		nodes?: Array<{
			__typename?: 'Sequence';
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
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
			collection?: { __typename?: 'Collection'; title: string } | null;
		}> | null;
	};
	musicAlbums: {
		__typename?: 'SequenceConnection';
		nodes?: Array<{
			__typename?: 'Sequence';
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
				aggregate?: { __typename?: 'Aggregate'; count: number } | null;
			};
			collection?: { __typename?: 'Collection'; title: string } | null;
		}> | null;
	};
};

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
		graphqlFetcher<
			GetDiscoverCollectionsPageDataQuery,
			GetDiscoverCollectionsPageDataQueryVariables
		>(GetDiscoverCollectionsPageDataDocument, variables),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getDiscoverCollectionsPageData<T>(
	variables: ExactAlt<T, GetDiscoverCollectionsPageDataQueryVariables>
): Promise<GetDiscoverCollectionsPageDataQuery> {
	return fetchApi(GetDiscoverCollectionsPageDataDocument, { variables });
}
