// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../types/generated';

export type SequenceNavFragment = {
	__typename?: 'Recording';
	sequencePreviousRecording?: {
		__typename?: 'Recording';
		canonicalPath: string;
	} | null;
	sequenceNextRecording?: {
		__typename?: 'Recording';
		canonicalPath: string;
	} | null;
};

export const SequenceNavFragmentDoc = `
    fragment sequenceNav on Recording {
  sequencePreviousRecording {
    canonicalPath(useFuturePath: true)
  }
  sequenceNextRecording {
    canonicalPath(useFuturePath: true)
  }
}
    `;
