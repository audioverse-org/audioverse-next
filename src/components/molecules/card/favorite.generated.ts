import * as Types from '../../../lib/generated/graphql';

import { CardRecordingFragmentDoc } from './recording.generated';
import { CardRecordingSequenceHatFragmentDoc } from './recordingSequenceHat.generated';
import { PersonLockupFragmentDoc } from '../personLockup.generated';
import { TeaseRecordingFragmentDoc } from '../teaseRecording.generated';
import { AndMiniplayerFragmentDoc } from '../../templates/andMiniplayer.generated';
import { CardSequenceFragmentDoc } from './sequence.generated';
import { CardRecordingStackFragmentDoc } from './recordingStack.generated';
import { SponsorLockupFragmentDoc } from '../sponsorLockup.generated';
import { CardCollectionFragmentDoc } from './collection.generated';
import { CardSponsorFragmentDoc } from './sponsor.generated';
import { CardPersonFragmentDoc } from './person.generated';
export type CardFavoriteFragment = {
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
					| { __typename?: 'Image'; id: string | number; url: string }
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
					| { __typename?: 'Image'; id: string | number; url: string }
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
							image: { __typename?: 'Image'; url: string } | null | undefined;
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
					imageWithFallback: { __typename?: 'Image'; url: string };
				}>;
				persons: Array<{
					__typename?: 'Person';
					name: string;
					canonicalPath: string;
					imageWithFallback: { __typename?: 'Image'; url: string };
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
								imageWithFallback: { __typename?: 'Image'; url: string };
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
								imageWithFallback: { __typename?: 'Image'; url: string };
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
											imageWithFallback: { __typename?: 'Image'; url: string };
									  }
									| null
									| undefined;
								persons: Array<{
									__typename?: 'Person';
									name: string;
									canonicalPath: string;
									imageWithFallback: { __typename?: 'Image'; url: string };
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
													| { __typename?: 'Aggregate'; count: number }
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
									imageWithFallback: { __typename?: 'Image'; url: string };
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
				image: { __typename?: 'Image'; url: string } | null | undefined;
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
};

export const CardFavoriteFragmentDoc = `
    fragment cardFavorite on UserFavorite {
  createdAt
  entity {
    __typename
    ... on Recording {
      ...cardRecording
    }
    ... on Sequence {
      viewerHasFavorited
      ...cardSequence
      ...cardRecordingStack
    }
    ... on Collection {
      ...cardCollection
    }
    ... on Sponsor {
      ...cardSponsor
    }
    ... on Person {
      ...cardPerson
    }
  }
}
    ${CardRecordingFragmentDoc}
${CardSequenceFragmentDoc}
${CardRecordingStackFragmentDoc}
${CardCollectionFragmentDoc}
${CardSponsorFragmentDoc}
${CardPersonFragmentDoc}`;
