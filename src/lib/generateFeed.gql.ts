// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../types/generated';

export type GenerateFeedFragment = {
	__typename?: 'Recording';
	id: string;
	title: string;
	contentType: Types.RecordingContentType;
	description?: string | null;
	publishDate?: any | null;
	audioFiles: Array<{
		__typename?: 'AudioFile';
		id: string;
		url: any;
		filesize: string;
		duration: number;
		mimeType: string;
		bitrate: number;
	}>;
	videoFiles: Array<{
		__typename?: 'VideoFile';
		id: string;
		url: any;
		filesize: string;
		duration: number;
		mimeType: string;
		bitrate: number;
		container: string;
	}>;
	persons: Array<{ __typename?: 'Person'; name: string }>;
	sequence?: { __typename?: 'Sequence'; title: string } | null;
	sponsor?: { __typename?: 'Sponsor'; title: string } | null;
};

export const GenerateFeedFragmentDoc = `
    fragment generateFeed on Recording {
  id
  title
  contentType
  description
  publishDate
  audioFiles {
    id
    url(requestType: RSS)
    filesize
    duration
    mimeType
    bitrate
  }
  videoFiles(allowedContainers: [M4A, M4V, MOV, MP4]) {
    id
    url(requestType: RSS)
    filesize
    duration
    mimeType
    bitrate
    container
  }
  persons(role: SPEAKER) {
    name
  }
  sequence {
    title
  }
  sponsor {
    title
  }
}
    `;
