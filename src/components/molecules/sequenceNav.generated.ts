import * as Types from '../../lib/generated/graphql';

export type SequenceNavFragment = {
	__typename?: 'Recording';
	sequencePreviousRecording:
		| { __typename?: 'Recording'; canonicalPath: string }
		| null
		| undefined;
	sequenceNextRecording:
		| { __typename?: 'Recording'; canonicalPath: string }
		| null
		| undefined;
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
