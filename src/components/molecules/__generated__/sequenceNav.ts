import * as Types from '../../../__generated__/graphql';

export type SequenceNavFragment = {
	__typename?: 'Recording';
	sequencePreviousRecording: {
		__typename?: 'Recording';
		canonicalPath: string;
	} | null;
	sequenceNextRecording: {
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
