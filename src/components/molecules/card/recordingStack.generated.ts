import * as Types from '../../../lib/generated/graphql';

import { SponsorLockupFragmentDoc } from '../sponsorLockup.generated';
import { TeaseRecordingFragmentDoc } from '../teaseRecording.generated';
import { AndMiniplayerFragmentDoc } from '../../templates/andMiniplayer.generated';
import { PersonLockupFragmentDoc } from '../personLockup.generated';
import { CardRecordingSequenceHatFragmentDoc } from './recordingSequenceHat.generated';
export type CardRecordingStackFragment = {
	__typename?: 'Sequence';
	contentType: Types.SequenceContentType;
	favoritedRecordings: {
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
					sponsor:
						| {
								__typename?: 'Sponsor';
								id: string | number;
								title: string;
								canonicalPath: string;
								imageWithFallback: { __typename?: 'Image'; url: string };
						  }
						| null
						| undefined;
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
								canonicalPath: string;
								contentType: Types.SequenceContentType;
								title: string;
								recordings: {
									__typename?: 'RecordingConnection';
									aggregate:
										| { __typename?: 'Aggregate'; count: number }
										| null
										| undefined;
								};
								image: { __typename?: 'Image'; url: string } | null | undefined;
						  }
						| null
						| undefined;
					writers: Array<{
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
			  }>
			| null
			| undefined;
	};
};

export const CardRecordingStackFragmentDoc = `
    fragment cardRecordingStack on Sequence {
  contentType
  favoritedRecordings: recordings(viewerHasFavorited: true) {
    nodes {
      sponsor {
        ...sponsorLockup
      }
      ...teaseRecording
      ...cardRecordingSequenceHat
    }
  }
}
    ${SponsorLockupFragmentDoc}
${TeaseRecordingFragmentDoc}
${CardRecordingSequenceHatFragmentDoc}`;
