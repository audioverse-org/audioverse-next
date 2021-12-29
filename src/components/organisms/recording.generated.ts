import * as Types from '../../lib/generated/graphql';

import { PersonLockupFragmentDoc } from '../molecules/personLockup.generated';
import { TeaseRecordingFragmentDoc } from '../molecules/teaseRecording.generated';
import { SequenceNavFragmentDoc } from '../molecules/sequenceNav.generated';
import { CopyrightInfoFragmentDoc } from '../molecules/copyrightInfo.generated';
import { PlayerFragmentDoc } from '../molecules/player.generated';
export type RecordingFragment = {
	__typename?: 'Recording';
	id: string | number;
	title: string;
	contentType: Types.RecordingContentType;
	description: string | null | undefined;
	recordingDate: string | null | undefined;
	sequenceIndex: number | null | undefined;
	canonicalUrl: string;
	shareUrl: string;
	copyrightYear: number | null | undefined;
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
		nodes:
			| Array<{
					__typename?: 'RecordingTag';
					tag: { __typename?: 'Tag'; id: string | number; name: string };
			  }>
			| null
			| undefined;
	};
	sponsor:
		| { __typename?: 'Sponsor'; title: string; canonicalPath: string }
		| null
		| undefined;
	sequence:
		| {
				__typename?: 'Sequence';
				id: string | number;
				title: string;
				contentType: Types.SequenceContentType;
				canonicalPath: string;
				recordings: {
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
											title: string;
											contentType: Types.SequenceContentType;
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
					aggregate:
						| { __typename?: 'Aggregate'; count: number }
						| null
						| undefined;
				};
		  }
		| null
		| undefined;
	collection:
		| { __typename?: 'Collection'; title: string; canonicalPath: string }
		| null
		| undefined;
	transcript: { __typename?: 'Transcript'; text: string } | null | undefined;
	sequencePreviousRecording:
		| { __typename?: 'Recording'; canonicalPath: string }
		| null
		| undefined;
	sequenceNextRecording:
		| { __typename?: 'Recording'; canonicalPath: string }
		| null
		| undefined;
	distributionAgreement:
		| {
				__typename?: 'DistributionAgreement';
				sponsor: { __typename?: 'Sponsor'; title: string } | null | undefined;
				license:
					| {
							__typename?: 'License';
							summary: string;
							image: { __typename?: 'Image'; url: string } | null | undefined;
					  }
					| null
					| undefined;
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
    url(size: 1200)
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
    ${PersonLockupFragmentDoc}
${TeaseRecordingFragmentDoc}
${SequenceNavFragmentDoc}
${CopyrightInfoFragmentDoc}
${PlayerFragmentDoc}`;
