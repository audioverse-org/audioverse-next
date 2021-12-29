import * as Types from '../../../lib/generated/graphql';

import { PersonLockupFragmentDoc } from '../personLockup.generated';
export type CardRecordingSequenceHatFragment = {
	__typename?: 'Recording';
	sequence:
		| {
				__typename?: 'Sequence';
				id: string | number;
				canonicalPath: string;
				contentType: Types.SequenceContentType;
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
  }
  writers: persons(role: WRITER) {
    ...personLockup
  }
}
    ${PersonLockupFragmentDoc}`;
