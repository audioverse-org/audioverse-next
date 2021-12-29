import * as Types from '../../../lib/generated/graphql';

import { TeaseRecordingFragmentDoc } from '../teaseRecording.generated';
import { AndMiniplayerFragmentDoc } from '../../templates/andMiniplayer.generated';
import { PersonLockupFragmentDoc } from '../personLockup.generated';
export type CardPlaylistFragment = {
	__typename?: 'UserPlaylist';
	id: string | number;
	title: string;
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
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
	};
};

export const CardPlaylistFragmentDoc = `
    fragment cardPlaylist on UserPlaylist {
  id
  title
  recordings(first: 2) {
    nodes {
      ...teaseRecording
    }
    aggregate {
      count
    }
  }
}
    ${TeaseRecordingFragmentDoc}`;
