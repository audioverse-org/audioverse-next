import * as Types from '../../__generated__/graphql';

import { CardRecordingFragmentDoc } from '../../components/molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../components/molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../components/molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../components/molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../components/molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../components/templates/__generated__/andMiniplayer';
import { CardSequenceFragmentDoc } from '../../components/molecules/card/__generated__/sequence';
import { CardCollectionFragmentDoc } from '../../components/molecules/card/__generated__/collection';
import { CardPostFragmentDoc } from '../../components/molecules/card/__generated__/post';
import { useQuery, UseQueryOptions } from 'react-query';
import { graphqlFetcher } from '@lib/api/graphqlFetcher';
export type GetDiscoverPageDataQueryVariables = Types.Exact<{
	language: Types.Language;
}>;

export type GetDiscoverPageDataQuery = {
	__typename?: 'Query';
	recentTeachings: {
		__typename?: 'RecordingConnection';
		nodes: Array<{
			__typename?: 'Recording';
			canonicalPath: string;
			sequenceIndex: number | null;
			id: string | number;
			title: string;
			duration: number;
			recordingContentType: Types.RecordingContentType;
			sequence: {
				__typename?: 'Sequence';
				id: string | number;
				canonicalPath: string;
				contentType: Types.SequenceContentType;
				title: string;
				image: { __typename?: 'Image'; url: string } | null;
				recordings: {
					__typename?: 'RecordingConnection';
					aggregate: { __typename?: 'Aggregate'; count: number } | null;
				};
				collection: { __typename?: 'Collection'; title: string } | null;
			} | null;
			writers: Array<{
				__typename?: 'Person';
				name: string;
				canonicalPath: string;
				imageWithFallback: { __typename?: 'Image'; url: string };
			}>;
			sponsor: {
				__typename?: 'Sponsor';
				id: string | number;
				title: string;
				canonicalPath: string;
				image: { __typename?: 'Image'; url: string } | null;
			} | null;
			persons: Array<{
				__typename?: 'Person';
				name: string;
				canonicalPath: string;
				imageWithFallback: { __typename?: 'Image'; url: string };
			}>;
			collection: { __typename?: 'Collection'; title: string } | null;
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
				logUrl: string | null;
				filesize: string;
				mimeType: string;
				duration: number;
			}>;
		}> | null;
	};
	trendingTeachings: {
		__typename?: 'PopularRecordingConnection';
		nodes: Array<{
			__typename?: 'PopularRecording';
			recording: {
				__typename?: 'Recording';
				canonicalPath: string;
				sequenceIndex: number | null;
				id: string | number;
				title: string;
				duration: number;
				recordingContentType: Types.RecordingContentType;
				sequence: {
					__typename?: 'Sequence';
					id: string | number;
					canonicalPath: string;
					contentType: Types.SequenceContentType;
					title: string;
					image: { __typename?: 'Image'; url: string } | null;
					recordings: {
						__typename?: 'RecordingConnection';
						aggregate: { __typename?: 'Aggregate'; count: number } | null;
					};
					collection: { __typename?: 'Collection'; title: string } | null;
				} | null;
				writers: Array<{
					__typename?: 'Person';
					name: string;
					canonicalPath: string;
					imageWithFallback: { __typename?: 'Image'; url: string };
				}>;
				sponsor: {
					__typename?: 'Sponsor';
					id: string | number;
					title: string;
					canonicalPath: string;
					image: { __typename?: 'Image'; url: string } | null;
				} | null;
				persons: Array<{
					__typename?: 'Person';
					name: string;
					canonicalPath: string;
					imageWithFallback: { __typename?: 'Image'; url: string };
				}>;
				collection: { __typename?: 'Collection'; title: string } | null;
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
					logUrl: string | null;
					filesize: string;
					mimeType: string;
					duration: number;
				}>;
			};
		}> | null;
	};
	featuredTeachings: {
		__typename?: 'RecordingConnection';
		nodes: Array<{
			__typename?: 'Recording';
			canonicalPath: string;
			sequenceIndex: number | null;
			id: string | number;
			title: string;
			duration: number;
			recordingContentType: Types.RecordingContentType;
			sequence: {
				__typename?: 'Sequence';
				id: string | number;
				canonicalPath: string;
				contentType: Types.SequenceContentType;
				title: string;
				image: { __typename?: 'Image'; url: string } | null;
				recordings: {
					__typename?: 'RecordingConnection';
					aggregate: { __typename?: 'Aggregate'; count: number } | null;
				};
				collection: { __typename?: 'Collection'; title: string } | null;
			} | null;
			writers: Array<{
				__typename?: 'Person';
				name: string;
				canonicalPath: string;
				imageWithFallback: { __typename?: 'Image'; url: string };
			}>;
			sponsor: {
				__typename?: 'Sponsor';
				id: string | number;
				title: string;
				canonicalPath: string;
				image: { __typename?: 'Image'; url: string } | null;
			} | null;
			persons: Array<{
				__typename?: 'Person';
				name: string;
				canonicalPath: string;
				imageWithFallback: { __typename?: 'Image'; url: string };
			}>;
			collection: { __typename?: 'Collection'; title: string } | null;
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
				logUrl: string | null;
				filesize: string;
				mimeType: string;
				duration: number;
			}>;
		}> | null;
	};
	storySeasons: {
		__typename?: 'SequenceConnection';
		nodes: Array<{
			__typename?: 'Sequence';
			id: string | number;
			title: string;
			canonicalPath: string;
			contentType: Types.SequenceContentType;
			duration: number;
			summary: string;
			recordings: {
				__typename?: 'RecordingConnection';
				nodes: Array<{
					__typename?: 'Recording';
					canonicalPath: string;
					sequenceIndex: number | null;
					id: string | number;
					title: string;
					duration: number;
					recordingContentType: Types.RecordingContentType;
					sequence: {
						__typename?: 'Sequence';
						id: string | number;
						canonicalPath: string;
						contentType: Types.SequenceContentType;
						title: string;
						image: { __typename?: 'Image'; url: string } | null;
						recordings: {
							__typename?: 'RecordingConnection';
							aggregate: { __typename?: 'Aggregate'; count: number } | null;
						};
						collection: { __typename?: 'Collection'; title: string } | null;
					} | null;
					writers: Array<{
						__typename?: 'Person';
						name: string;
						canonicalPath: string;
						imageWithFallback: { __typename?: 'Image'; url: string };
					}>;
					sponsor: {
						__typename?: 'Sponsor';
						id: string | number;
						title: string;
						canonicalPath: string;
						image: { __typename?: 'Image'; url: string } | null;
					} | null;
					persons: Array<{
						__typename?: 'Person';
						name: string;
						canonicalPath: string;
						imageWithFallback: { __typename?: 'Image'; url: string };
					}>;
					collection: { __typename?: 'Collection'; title: string } | null;
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
						logUrl: string | null;
						filesize: string;
						mimeType: string;
						duration: number;
					}>;
				}> | null;
			};
			speakers: {
				__typename?: 'PersonConnection';
				nodes: Array<{
					__typename?: 'Person';
					name: string;
					canonicalPath: string;
					imageWithFallback: { __typename?: 'Image'; url: string };
				}> | null;
			};
			sequenceWriters: {
				__typename?: 'PersonConnection';
				nodes: Array<{
					__typename?: 'Person';
					name: string;
					canonicalPath: string;
					imageWithFallback: { __typename?: 'Image'; url: string };
				}> | null;
			};
			allRecordings: {
				__typename?: 'RecordingConnection';
				nodes: Array<{
					__typename?: 'Recording';
					canonicalPath: string;
				}> | null;
				aggregate: { __typename?: 'Aggregate'; count: number } | null;
			};
			collection: { __typename?: 'Collection'; title: string } | null;
		}> | null;
	};
	conferences: {
		__typename?: 'CollectionConnection';
		nodes: Array<{
			__typename?: 'Collection';
			id: string | number;
			canonicalPath: string;
			title: string;
			startDate: string | null;
			endDate: string | null;
			duration: number;
			collectionContentType: Types.CollectionContentType;
			sequences: {
				__typename?: 'SequenceConnection';
				nodes: Array<{
					__typename?: 'Sequence';
					id: string | number;
					title: string;
					canonicalPath: string;
					contentType: Types.SequenceContentType;
					duration: number;
					summary: string;
					speakers: {
						__typename?: 'PersonConnection';
						nodes: Array<{
							__typename?: 'Person';
							name: string;
							canonicalPath: string;
							imageWithFallback: { __typename?: 'Image'; url: string };
						}> | null;
					};
					sequenceWriters: {
						__typename?: 'PersonConnection';
						nodes: Array<{
							__typename?: 'Person';
							name: string;
							canonicalPath: string;
							imageWithFallback: { __typename?: 'Image'; url: string };
						}> | null;
					};
					allRecordings: {
						__typename?: 'RecordingConnection';
						nodes: Array<{
							__typename?: 'Recording';
							canonicalPath: string;
						}> | null;
						aggregate: { __typename?: 'Aggregate'; count: number } | null;
					};
					collection: { __typename?: 'Collection'; title: string } | null;
				}> | null;
			};
			recordings: {
				__typename?: 'RecordingConnection';
				nodes: Array<{
					__typename?: 'Recording';
					canonicalPath: string;
					sequenceIndex: number | null;
					id: string | number;
					title: string;
					duration: number;
					recordingContentType: Types.RecordingContentType;
					sequence: {
						__typename?: 'Sequence';
						id: string | number;
						canonicalPath: string;
						contentType: Types.SequenceContentType;
						title: string;
						image: { __typename?: 'Image'; url: string } | null;
						recordings: {
							__typename?: 'RecordingConnection';
							aggregate: { __typename?: 'Aggregate'; count: number } | null;
						};
						collection: { __typename?: 'Collection'; title: string } | null;
					} | null;
					writers: Array<{
						__typename?: 'Person';
						name: string;
						canonicalPath: string;
						imageWithFallback: { __typename?: 'Image'; url: string };
					}>;
					sponsor: {
						__typename?: 'Sponsor';
						id: string | number;
						title: string;
						canonicalPath: string;
						image: { __typename?: 'Image'; url: string } | null;
					} | null;
					persons: Array<{
						__typename?: 'Person';
						name: string;
						canonicalPath: string;
						imageWithFallback: { __typename?: 'Image'; url: string };
					}>;
					collection: { __typename?: 'Collection'; title: string } | null;
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
						logUrl: string | null;
						filesize: string;
						mimeType: string;
						duration: number;
					}>;
				}> | null;
			};
			image: { __typename?: 'Image'; id: string | number; url: string } | null;
			allSequences: {
				__typename?: 'SequenceConnection';
				aggregate: { __typename?: 'Aggregate'; count: number } | null;
			};
			allRecordings: {
				__typename?: 'RecordingConnection';
				aggregate: { __typename?: 'Aggregate'; count: number } | null;
			};
		}> | null;
	};
	blogPosts: {
		__typename?: 'BlogPostConnection';
		nodes: Array<{
			__typename?: 'BlogPost';
			publishDate: string;
			title: string;
			teaser: string;
			canonicalPath: string;
			readingDuration: number | null;
			image: { __typename?: 'Image'; url: string } | null;
		}> | null;
	};
};

export const GetDiscoverPageDataDocument = `
    query getDiscoverPageData($language: Language!) {
  recentTeachings: sermons(
    language: $language
    first: 6
    orderBy: {field: PUBLISHED_AT, direction: DESC}
  ) {
    nodes {
      ...cardRecording
    }
  }
  trendingTeachings: popularRecordings(
    language: $language
    contentType: SERMON
    first: 6
  ) {
    nodes {
      recording {
        ...cardRecording
      }
    }
  }
  featuredTeachings: featuredRecordings(
    language: $language
    contentType: SERMON
    first: 3
  ) {
    nodes {
      ...cardRecording
    }
  }
  storySeasons(
    language: $language
    first: 3
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardSequence
      recordings(first: 2) {
        nodes {
          ...cardRecording
        }
      }
    }
  }
  conferences(
    language: $language
    first: 3
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    nodes {
      ...cardCollection
      sequences(first: 2, orderBy: [{field: RECORDING_COUNT, direction: DESC}]) {
        nodes {
          ...cardSequence
        }
      }
      recordings(
        first: 2
        sequenceId: 0
        orderBy: [{field: PUBLISHED_AT, direction: DESC}]
      ) {
        nodes {
          ...cardRecording
        }
      }
    }
  }
  blogPosts(
    language: $language
    first: 3
    orderBy: {field: PUBLISHED_AT, direction: DESC}
  ) {
    nodes {
      ...cardPost
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
${CardCollectionFragmentDoc}
${CardPostFragmentDoc}`;
export const useGetDiscoverPageDataQuery = <
	TData = GetDiscoverPageDataQuery,
	TError = unknown
>(
	variables: GetDiscoverPageDataQueryVariables,
	options?: UseQueryOptions<GetDiscoverPageDataQuery, TError, TData>
) =>
	useQuery<GetDiscoverPageDataQuery, TError, TData>(
		['getDiscoverPageData', variables],
		graphqlFetcher<GetDiscoverPageDataQuery, GetDiscoverPageDataQueryVariables>(
			GetDiscoverPageDataDocument,
			variables
		),
		options
	);
import { fetchApi } from '@lib/api/fetchApi';

export async function getDiscoverPageData<T>(
	variables: ExactAlt<T, GetDiscoverPageDataQueryVariables>
): Promise<GetDiscoverPageDataQuery> {
	return fetchApi(GetDiscoverPageDataDocument, { variables });
}
