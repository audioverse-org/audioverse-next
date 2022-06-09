// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../../types/generated';

import { CardRecordingFragmentDoc } from './recording.gql';
import { CardRecordingSequenceHatFragmentDoc } from './recordingSequenceHat.gql';
import { PersonLockupFragmentDoc } from '../personLockup.gql';
import { CardHatSponsorFragmentDoc } from './hat/sponsor.gql';
import { TeaseRecordingFragmentDoc } from '../teaseRecording.gql';
import { AndMiniplayerFragmentDoc } from '../../templates/andMiniplayer.gql';
import { CardSequenceFragmentDoc } from './sequence.gql';
import { CardRecordingStackFragmentDoc } from './recordingStack.gql';
import { CardCollectionFragmentDoc } from './collection.gql';
import { CardSponsorFragmentDoc } from './sponsor.gql';
import { CardPersonFragmentDoc } from './person.gql';
export type CardFavoriteEntity_Collection_Fragment = {
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
};

export type CardFavoriteEntity_Person_Fragment = {
	__typename: 'Person';
	id: string;
	name: string;
	canonicalPath: string;
	image?: { __typename?: 'Image'; id: string; url: any } | null;
	recordings: {
		__typename?: 'RecordingConnection';
		aggregate?: { __typename?: 'Aggregate'; count: number } | null;
	};
};

export type CardFavoriteEntity_Recording_Fragment = {
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
};

export type CardFavoriteEntity_Sequence_Fragment = {
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
		nodes?: Array<{ __typename?: 'Recording'; canonicalPath: string }> | null;
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
};

export type CardFavoriteEntity_Sponsor_Fragment = {
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
};

export type CardFavoriteEntityFragment =
	| CardFavoriteEntity_Collection_Fragment
	| CardFavoriteEntity_Person_Fragment
	| CardFavoriteEntity_Recording_Fragment
	| CardFavoriteEntity_Sequence_Fragment
	| CardFavoriteEntity_Sponsor_Fragment;

export const CardFavoriteEntityFragmentDoc = `
    fragment cardFavoriteEntity on FavoriteEntityUnion {
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
    `;
