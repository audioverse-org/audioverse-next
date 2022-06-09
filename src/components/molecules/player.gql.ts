// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { AndMiniplayerFragmentDoc } from '../templates/andMiniplayer.gql';
import { ButtonDownloadFragmentDoc } from './buttonDownload.gql';
import { ButtonShareRecordingFragmentDoc } from './buttonShareRecording.gql';
export type PlayerFragment = {
	__typename?: 'Recording';
	id: string;
	title: string;
	canonicalPath: string;
	duration: number;
	isDownloadAllowed: boolean;
	shareUrl: any;
	sequence?: {
		__typename?: 'Sequence';
		title: string;
		contentType: Types.SequenceContentType;
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
	videoDownloads: Array<{
		__typename?: 'VideoFile';
		url: any;
		filesize: string;
		height: number;
		width: number;
	}>;
	audioDownloads: Array<{
		__typename?: 'AudioFile';
		url: any;
		filesize: string;
		bitrate: number;
	}>;
	speakers: Array<{ __typename?: 'Person'; name: string }>;
};

export const PlayerFragmentDoc = `
    fragment player on Recording {
  id
  title
  ...andMiniplayer
  ...buttonDownload
  ...buttonShareRecording
}
    `;
