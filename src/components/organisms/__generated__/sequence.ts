import * as Types from '../../../__generated__/graphql';

import { CardRecordingFragmentDoc } from '../../molecules/card/__generated__/recording';
import { CardRecordingSequenceHatFragmentDoc } from '../../molecules/card/__generated__/recordingSequenceHat';
import { PersonLockupFragmentDoc } from '../../molecules/__generated__/personLockup';
import { CardHatSponsorFragmentDoc } from '../../molecules/card/hat/__generated__/sponsor';
import { TeaseRecordingFragmentDoc } from '../../molecules/__generated__/teaseRecording';
import { AndMiniplayerFragmentDoc } from '../../templates/__generated__/andMiniplayer';
export type SequenceFragment = {
	__typename?: 'Sequence';
	id: string | number;
	title: string;
	contentType: Types.SequenceContentType;
	duration: number;
	description: string;
	startDate: string | null;
	endDate: string | null;
	shareUrl: string;
	collection: {
		__typename?: 'Collection';
		title: string;
		canonicalPath: string;
	} | null;
	image: { __typename?: 'Image'; url: string } | null;
	sponsor: {
		__typename?: 'Sponsor';
		title: string;
		canonicalPath: string;
	} | null;
	recordings: {
		__typename?: 'RecordingConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null;
		nodes: Array<{
			__typename?: 'Recording';
			canonicalPath: string;
			sequenceIndex: number | null;
			id: string | number;
			title: string;
			duration: number;
			recordingContentType: Types.RecordingContentType;
			sequence: {
				__typename?: 'Sequence';
				id: string | number;
				canonicalPath: string;
				contentType: Types.SequenceContentType;
				title: string;
				image: { __typename?: 'Image'; url: string } | null;
				recordings: {
					__typename?: 'RecordingConnection';
					aggregate: { __typename?: 'Aggregate'; count: number } | null;
				};
				collection: { __typename?: 'Collection'; title: string } | null;
			} | null;
			writers: Array<{
				__typename?: 'Person';
				name: string;
				canonicalPath: string;
				imageWithFallback: { __typename?: 'Image'; url: string };
			}>;
			sponsor: {
				__typename?: 'Sponsor';
				id: string | number;
				title: string;
				canonicalPath: string;
				image: { __typename?: 'Image'; url: string } | null;
			} | null;
			persons: Array<{
				__typename?: 'Person';
				name: string;
				canonicalPath: string;
				imageWithFallback: { __typename?: 'Image'; url: string };
			}>;
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
