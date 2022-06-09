// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../../types/generated';

import { TeaseRecordingFragmentDoc } from '../teaseRecording.gql';
import { AndMiniplayerFragmentDoc } from '../../templates/andMiniplayer.gql';
import { PersonLockupFragmentDoc } from '../personLockup.gql';
export type CardPlaylistFragment = {
	__typename?: 'UserPlaylist';
	id: string;
	title: string;
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
    `;
