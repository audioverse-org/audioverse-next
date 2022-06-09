// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../../types/generated';

import { PersonLockupFragmentDoc } from '../personLockup.gql';
export type CardSequenceFragment = {
	__typename?: 'Sequence';
	id: string;
	title: string;
	canonicalPath: string;
	contentType: Types.SequenceContentType;
	duration: number;
	summary: string;
	speakers: {
		__typename?: 'PersonConnection';
		nodes?: Array<{
			__typename?: 'Person';
			name: string;
			canonicalPath: string;
			imageWithFallback: { __typename?: 'Image'; url: any };
		}> | null;
	};
	sequenceWriters: {
		__typename?: 'PersonConnection';
		nodes?: Array<{
			__typename?: 'Person';
			name: string;
			canonicalPath: string;
			imageWithFallback: { __typename?: 'Image'; url: any };
		}> | null;
	};
	allRecordings: {
		__typename?: 'RecordingConnection';
		nodes?: Array<{ __typename?: 'Recording'; canonicalPath: string }> | null;
		aggregate?: { __typename?: 'Aggregate'; count: number } | null;
	};
	collection?: { __typename?: 'Collection'; title: string } | null;
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
  allRecordings: recordings(first: 1) {
    nodes {
      canonicalPath(useFuturePath: true)
    }
    aggregate {
      count
    }
  }
  collection {
    title
  }
}
    `;
