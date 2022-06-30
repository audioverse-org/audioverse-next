import * as Types from '../../../../__generated__/graphql';

import { PersonLockupFragmentDoc } from '../../__generated__/personLockup';
export type CardRecordingSequenceHatFragment = {
	__typename?: 'Recording';
	sequence: {
		__typename?: 'Sequence';
		id: string | number;
		canonicalPath: string;
		contentType: Types.SequenceContentType;
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
};

export const CardRecordingSequenceHatFragmentDoc = `
    fragment cardRecordingSequenceHat on Recording {
  sequence {
    id
    canonicalPath(useFuturePath: true)
    contentType
    image {
      url(size: 100)
    }
    recordings {
      aggregate {
        count
      }
    }
    collection {
      title
    }
  }
  writers: persons(role: WRITER) {
    ...personLockup
  }
}
    `;
