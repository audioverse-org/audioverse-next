// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../../types/generated';

import { CardRecordingSequenceHatFragmentDoc } from './recordingSequenceHat.gql';
import { PersonLockupFragmentDoc } from '../personLockup.gql';
import { CardHatSponsorFragmentDoc } from './hat/sponsor.gql';
import { TeaseRecordingFragmentDoc } from '../teaseRecording.gql';
import { AndMiniplayerFragmentDoc } from '../../templates/andMiniplayer.gql';
export type CardRecordingFragment = {
	__typename?: 'Recording';
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

export const CardRecordingFragmentDoc = `
    fragment cardRecording on Recording {
  ...cardRecordingSequenceHat
  ...cardHatSponsor
  ...teaseRecording
}
    `;
