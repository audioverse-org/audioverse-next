import { CardRecordingSequenceHatFragmentDoc } from './recordingSequenceHat.generated';
import { TeaseRecordingFragmentDoc } from '../teaseRecording.generated';
export type CardRecordingFragment = {
	__typename?: 'Recording';
	canonicalPath: string;
	sequenceIndex: number | null | undefined;
	id: string | number;
	title: string;
	duration: number;
	recordingContentType: Types.RecordingContentType;
	sequence:
		| {
				__typename?: 'Sequence';
				id: string | number;
				canonicalPath: string;
				contentType: Types.SequenceContentType;
				title: string;
				image: { __typename?: 'Image'; url: string } | null | undefined;
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
	writers: Array<{
		__typename?: 'Person';
		name: string;
		canonicalPath: string;
		imageWithFallback: { __typename?: 'Image'; url: string };
	}>;
	persons: Array<{
		__typename?: 'Person';
		name: string;
		canonicalPath: string;
		imageWithFallback: { __typename?: 'Image'; url: string };
	}>;
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
};

export const CardRecordingFragmentDoc = `
    fragment cardRecording on Recording {
  ...cardRecordingSequenceHat
  ...teaseRecording
}
    ${CardRecordingSequenceHatFragmentDoc}
${TeaseRecordingFragmentDoc}`;
import * as Types from '../../../lib/generated/graphql';
