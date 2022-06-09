// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

import { CardRecordingFragmentDoc } from '../molecules/card/recording.gql';
import { CardRecordingSequenceHatFragmentDoc } from '../molecules/card/recordingSequenceHat.gql';
import { PersonLockupFragmentDoc } from '../molecules/personLockup.gql';
import { CardHatSponsorFragmentDoc } from '../molecules/card/hat/sponsor.gql';
import { TeaseRecordingFragmentDoc } from '../molecules/teaseRecording.gql';
import { AndMiniplayerFragmentDoc } from '../templates/andMiniplayer.gql';
export type SequenceFragment = {
	__typename?: 'Sequence';
	id: string;
	title: string;
	contentType: Types.SequenceContentType;
	duration: number;
	description: string;
	startDate?: any | null;
	endDate?: any | null;
	shareUrl: any;
	collection?: {
		__typename?: 'Collection';
		title: string;
		canonicalPath: string;
	} | null;
	image?: { __typename?: 'Image'; url: any } | null;
	sponsor?: {
		__typename?: 'Sponsor';
		title: string;
		canonicalPath: string;
	} | null;
	recordings: {
		__typename?: 'RecordingConnection';
		aggregate?: { __typename?: 'Aggregate'; count: number } | null;
		nodes?: Array<{
			__typename?: 'Recording';
			canonicalPath: string;
			sequenceIndex?: number | null;
			id: string;
			title: string;
			duration: number;
			recordingContentType: Types.RecordingContentType;
			sequence?: {
				__typename?: 'Sequence';
				id: string;
				canonicalPath: string;
				contentType: Types.SequenceContentType;
				title: string;
				image?: { __typename?: 'Image'; url: any } | null;
				recordings: {
					__typename?: 'RecordingConnection';
					aggregate?: { __typename?: 'Aggregate'; count: number } | null;
				};
				collection?: { __typename?: 'Collection'; title: string } | null;
			} | null;
			writers: Array<{
				__typename?: 'Person';
				name: string;
				canonicalPath: string;
				imageWithFallback: { __typename?: 'Image'; url: any };
			}>;
			sponsor?: {
				__typename?: 'Sponsor';
				id: string;
				title: string;
				canonicalPath: string;
				image?: { __typename?: 'Image'; url: any } | null;
			} | null;
			persons: Array<{
				__typename?: 'Person';
				name: string;
				canonicalPath: string;
				imageWithFallback: { __typename?: 'Image'; url: any };
			}>;
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
	};
};

export const SequenceFragmentDoc = `
    fragment sequence on Sequence {
  id
  title
  contentType
  duration
  description
  startDate
  endDate
  collection {
    title
    canonicalPath(useFuturePath: true)
  }
  image {
    url(size: 100)
  }
  sponsor {
    title
    canonicalPath(useFuturePath: true)
  }
  shareUrl
  recordings(first: 250) {
    aggregate {
      count
    }
    nodes {
      ...cardRecording
    }
  }
}
    `;
