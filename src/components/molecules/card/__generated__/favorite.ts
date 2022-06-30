import * as Types from '../../../../__generated__/graphql';

import { CardFavoriteEntityFragmentDoc } from './favoriteEntity';
import { CardRecordingFragmentDoc } from './recording';
import { CardRecordingSequenceHatFragmentDoc } from './recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../../templates/__generated__/andMiniplayer';
import { CardSequenceFragmentDoc } from './sequence';
import { CardRecordingStackFragmentDoc } from './recordingStack';
import { CardCollectionFragmentDoc } from './collection';
import { CardSponsorFragmentDoc } from './sponsor';
import { CardPersonFragmentDoc } from './person';
export type CardFavoriteFragment = {
	__typename?: 'UserFavorite';
	createdAt: string;
	entity:
		| {
				__typename: 'Collection';
				id: string | number;
				canonicalPath: string;
				title: string;
				startDate: string | null;
				endDate: string | null;
				duration: number;
				collectionContentType: Types.CollectionContentType;
				image: {
					__typename?: 'Image';
					id: string | number;
					url: string;
				} | null;
				allSequences: {
					__typename?: 'SequenceConnection';
					aggregate: { __typename?: 'Aggregate'; count: number } | null;
				};
				allRecordings: {
					__typename?: 'RecordingConnection';
					aggregate: { __typename?: 'Aggregate'; count: number } | null;
				};
		  }
		| {
				__typename: 'Person';
				id: string | number;
				name: string;
				canonicalPath: string;
				image: {
					__typename?: 'Image';
					id: string | number;
					url: string;
				} | null;
				recordings: {
					__typename?: 'RecordingConnection';
					aggregate: { __typename?: 'Aggregate'; count: number } | null;
				};
		  }
		| {
				__typename: 'Recording';
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
				favoritedRecordings: {
					__typename?: 'RecordingConnection';
					nodes: Array<{
						__typename?: 'Recording';
						canonicalPath: string;
						sequenceIndex: number | null;
						id: string | number;
						title: string;
						duration: number;
						recordingContentType: Types.RecordingContentType;
						persons: Array<{
							__typename?: 'Person';
							name: string;
							canonicalPath: string;
							imageWithFallback: { __typename?: 'Image'; url: string };
						}>;
						sequence: {
							__typename?: 'Sequence';
							id: string | number;
							canonicalPath: string;
							contentType: Types.SequenceContentType;
							title: string;
							recordings: {
								__typename?: 'RecordingConnection';
								aggregate: { __typename?: 'Aggregate'; count: number } | null;
							};
							image: { __typename?: 'Image'; url: string } | null;
							collection: { __typename?: 'Collection'; title: string } | null;
						} | null;
						writers: Array<{
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
		  }
		| {
				__typename: 'Sponsor';
				id: string | number;
				title: string;
				canonicalPath: string;
				image: { __typename?: 'Image'; url: string } | null;
				collections: {
					__typename?: 'CollectionConnection';
					aggregate: { __typename?: 'Aggregate'; count: number } | null;
				};
				sequences: {
					__typename?: 'SequenceConnection';
					aggregate: { __typename?: 'Aggregate'; count: number } | null;
				};
				recordings: {
					__typename?: 'RecordingConnection';
					aggregate: { __typename?: 'Aggregate'; count: number } | null;
				};
		  };
};

export const CardFavoriteFragmentDoc = `
    fragment cardFavorite on UserFavorite {
  createdAt
  entity {
    ...cardFavoriteEntity
  }
}
    `;
