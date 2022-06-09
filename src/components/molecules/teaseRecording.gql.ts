// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { AndMiniplayerFragmentDoc } from '../templates/andMiniplayer.gql';
import { PersonLockupFragmentDoc } from './personLockup.gql';
export type TeaseRecordingFragment = {
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
		title: string;
		contentType: Types.SequenceContentType;
		recordings: {
			__typename?: 'RecordingConnection';
			aggregate?: { __typename?: 'Aggregate'; count: number } | null;
		};
	} | null;
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

export const TeaseRecordingFragmentDoc = `
    fragment teaseRecording on Recording {
  ...andMiniplayer
  recordingContentType: contentType
  canonicalPath(useFuturePath: true)
  persons(role: SPEAKER) {
    ...personLockup
  }
  sequenceIndex
  sequence {
    id
    recordings {
      aggregate {
        count
      }
    }
  }
}
    `;
