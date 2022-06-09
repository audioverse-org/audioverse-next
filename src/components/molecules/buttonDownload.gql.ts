// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

export type ButtonDownloadFragment = {
	__typename?: 'Recording';
	isDownloadAllowed: boolean;
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
};

export const ButtonDownloadFragmentDoc = `
    fragment buttonDownload on Recording {
  isDownloadAllowed
  videoDownloads: videoFiles(allowedContainers: MP4) {
    url(requestType: DOWNLOAD)
    filesize
    height
    width
  }
  audioDownloads: audioFiles(allowedContainers: MP3) {
    url(requestType: DOWNLOAD)
    filesize
    bitrate
  }
}
    `;
