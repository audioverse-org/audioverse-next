import * as Types from '../../../__generated__/graphql';

import { PersonLockupFragmentDoc } from '../../molecules/__generated__/personLockup';
import { TeaseRecordingFragmentDoc } from '../../molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../templates/__generated__/andMiniplayer';
import { SequenceNavFragmentDoc } from '../../molecules/__generated__/sequenceNav';
import { CopyrightInfoFragmentDoc } from '../../molecules/__generated__/copyrightInfo';
import { PlayerFragmentDoc } from '../../molecules/__generated__/player';
import { ButtonDownloadFragmentDoc } from '../../molecules/__generated__/buttonDownload';
import { ButtonShareRecordingFragmentDoc } from '../../molecules/__generated__/buttonShareRecording';
export type RecordingFragment = {
	__typename?: 'Recording';
	id: string | number;
	title: string;
	contentType: Types.RecordingContentType;
	description: string | null;
	recordingDate: string | null;
	sequenceIndex: number | null;
	canonicalUrl: string;
	shareUrl: string;
	copyrightYear: number | null;
	canonicalPath: string;
	duration: number;
	isDownloadAllowed: boolean;
	speakers: Array<{
		__typename?: 'Person';
		name: string;
		canonicalPath: string;
		imageWithFallback: { __typename?: 'Image'; url: string };
	}>;
	writers: Array<{
		__typename?: 'Person';
		name: string;
		canonicalPath: string;
		imageWithFallback: { __typename?: 'Image'; url: string };
	}>;
	attachments: Array<{
		__typename?: 'Attachment';
		filename: string;
		url: string;
	}>;
	imageWithFallback: { __typename?: 'Image'; url: string };
	recordingTags: {
		__typename?: 'RecordingTagConnection';
		nodes: Array<{
			__typename?: 'RecordingTag';
			tag: { __typename?: 'Tag'; id: string | number; name: string };
		}> | null;
	};
	sponsor: {
		__typename?: 'Sponsor';
		title: string;
		canonicalPath: string;
	} | null;
	sequence: {
		__typename?: 'Sequence';
		id: string | number;
		title: string;
		contentType: Types.SequenceContentType;
		canonicalPath: string;
		recordings: {
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
					title: string;
					contentType: Types.SequenceContentType;
					recordings: {
						__typename?: 'RecordingConnection';
						aggregate: { __typename?: 'Aggregate'; count: number } | null;
					};
				} | null;
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
			aggregate: { __typename?: 'Aggregate'; count: number } | null;
		};
	} | null;
	collection: {
		__typename?: 'Collection';
		title: string;
		canonicalPath: string;
	} | null;
	transcript: { __typename?: 'Transcript'; text: string } | null;
	sequencePreviousRecording: {
		__typename?: 'Recording';
		canonicalPath: string;
	} | null;
	sequenceNextRecording: {
		__typename?: 'Recording';
		canonicalPath: string;
	} | null;
	distributionAgreement: {
		__typename?: 'DistributionAgreement';
		sponsor: { __typename?: 'Sponsor'; title: string } | null;
		license: { __typename?: 'License'; summary: string } | null;
	} | null;
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
