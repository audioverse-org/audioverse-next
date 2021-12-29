import * as Types from '../../lib/generated/graphql';

import { AndMiniplayerFragmentDoc } from '../templates/andMiniplayer.generated';
import { ButtonDownloadFragmentDoc } from './buttonDownload.generated';
import { ButtonShareRecordingFragmentDoc } from './buttonShareRecording.generated';
export type PlayerFragment = {
	__typename?: 'Recording';
	id: string | number;
	title: string;
	canonicalPath: string;
	duration: number;
	isDownloadAllowed: boolean;
	shareUrl: string;
	sequence:
		| {
				__typename?: 'Sequence';
				title: string;
				contentType: Types.SequenceContentType;
		  }
		| null
		| undefined;
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
	videoDownloads: Array<{
		__typename?: 'VideoFile';
		url: string;
		filesize: string;
		height: number;
		width: number;
	}>;
	audioDownloads: Array<{
		__typename?: 'AudioFile';
		url: string;
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
    ${AndMiniplayerFragmentDoc}
${ButtonDownloadFragmentDoc}
${ButtonShareRecordingFragmentDoc}`;
