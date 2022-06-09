// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { PersonLockupFragmentDoc } from '../molecules/personLockup.gql';
import { TeaseRecordingFragmentDoc } from '../molecules/teaseRecording.gql';
import { AndMiniplayerFragmentDoc } from '../templates/andMiniplayer.gql';
import { SequenceNavFragmentDoc } from '../molecules/sequenceNav.gql';
import { CopyrightInfoFragmentDoc } from '../molecules/copyrightInfo.gql';
import { PlayerFragmentDoc } from '../molecules/player.gql';
import { ButtonDownloadFragmentDoc } from '../molecules/buttonDownload.gql';
import { ButtonShareRecordingFragmentDoc } from '../molecules/buttonShareRecording.gql';
export type RecordingFragment = {
	__typename?: 'Recording';
	id: string;
	title: string;
	contentType: Types.RecordingContentType;
	description?: string | null;
	recordingDate?: any | null;
	sequenceIndex?: number | null;
	canonicalUrl: any;
	shareUrl: any;
	copyrightYear?: number | null;
	canonicalPath: string;
	duration: number;
	isDownloadAllowed: boolean;
	speakers: Array<{
		__typename?: 'Person';
		name: string;
		canonicalPath: string;
		imageWithFallback: { __typename?: 'Image'; url: any };
	}>;
	writers: Array<{
		__typename?: 'Person';
		name: string;
		canonicalPath: string;
		imageWithFallback: { __typename?: 'Image'; url: any };
	}>;
	attachments: Array<{ __typename?: 'Attachment'; filename: string; url: any }>;
	imageWithFallback: { __typename?: 'Image'; url: any };
	recordingTags: {
		__typename?: 'RecordingTagConnection';
		nodes?: Array<{
			__typename?: 'RecordingTag';
			tag: { __typename?: 'Tag'; id: string; name: string };
		}> | null;
	};
	sponsor?: {
		__typename?: 'Sponsor';
		title: string;
		canonicalPath: string;
	} | null;
	sequence?: {
		__typename?: 'Sequence';
		id: string;
		title: string;
		contentType: Types.SequenceContentType;
		canonicalPath: string;
		recordings: {
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
			}> | null;
			aggregate?: { __typename?: 'Aggregate'; count: number } | null;
		};
	} | null;
	collection?: {
		__typename?: 'Collection';
		title: string;
		canonicalPath: string;
	} | null;
	transcript?: { __typename?: 'Transcript'; text: string } | null;
	sequencePreviousRecording?: {
		__typename?: 'Recording';
		canonicalPath: string;
	} | null;
	sequenceNextRecording?: {
		__typename?: 'Recording';
		canonicalPath: string;
	} | null;
	distributionAgreement?: {
		__typename?: 'DistributionAgreement';
		sponsor?: { __typename?: 'Sponsor'; title: string } | null;
		license?: {
			__typename?: 'License';
			summary: string;
			image?: { __typename?: 'Image'; url: any } | null;
		} | null;
	} | null;
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
};

export const RecordingFragmentDoc = `
    fragment recording on Recording {
  id
  title
  contentType
  speakers: persons(role: SPEAKER) {
    ...personLockup
  }
  writers: persons(role: WRITER) {
    ...personLockup
  }
  attachments {
    filename
    url
  }
  description
  imageWithFallback {
    url(size: 1200, cropMode: MAX_SIZE)
  }
  recordingDate
  recordingTags {
    nodes {
      tag {
        id
        name
      }
    }
  }
  sponsor {
    title
    canonicalPath(useFuturePath: true)
  }
  sequenceIndex
  sequence {
    id
    title
    contentType
    canonicalPath(useFuturePath: true)
    recordings(first: 1000) {
      nodes {
        ...teaseRecording
      }
      aggregate {
        count
      }
    }
  }
  collection {
    title
    canonicalPath(useFuturePath: true)
  }
  transcript {
    text
  }
  canonicalUrl(useFuturePath: true)
  shareUrl
  ...sequenceNav
  ...copyrightInfo
  ...player
}
    `;
