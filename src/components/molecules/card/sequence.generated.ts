import * as Types from '../../../lib/generated/graphql';

import { PersonLockupFragmentDoc } from '../personLockup.generated';
export type CardSequenceFragment = {
	__typename?: 'Sequence';
	id: string | number;
	title: string;
	canonicalPath: string;
	contentType: Types.SequenceContentType;
	duration: number;
	summary: string;
	speakers: {
		__typename?: 'PersonConnection';
		nodes:
			| Array<{
					__typename?: 'Person';
					name: string;
					canonicalPath: string;
					imageWithFallback: { __typename?: 'Image'; url: string };
			  }>
			| null
			| undefined;
	};
	sequenceWriters: {
		__typename?: 'PersonConnection';
		nodes:
			| Array<{
					__typename?: 'Person';
					name: string;
					canonicalPath: string;
					imageWithFallback: { __typename?: 'Image'; url: string };
			  }>
			| null
			| undefined;
	};
	allRecordings: {
		__typename?: 'RecordingConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
	};
};

export const CardSequenceFragmentDoc = `
    fragment cardSequence on Sequence {
  id
  title
  canonicalPath(useFuturePath: true)
  contentType
  duration
  summary
  speakers: persons(role: SPEAKER, orderBy: [{field: NAME, direction: ASC}]) {
    nodes {
      ...personLockup
    }
  }
  sequenceWriters: persons(role: WRITER, orderBy: [{field: NAME, direction: ASC}]) {
    nodes {
      ...personLockup
    }
  }
  allRecordings: recordings(first: 3) {
    aggregate {
      count
    }
  }
}
    ${PersonLockupFragmentDoc}`;
