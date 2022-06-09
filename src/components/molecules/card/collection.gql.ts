// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../../types/generated';

export type CardCollectionFragment = {
	__typename?: 'Collection';
	id: string;
	canonicalPath: string;
	title: string;
	startDate?: any | null;
	endDate?: any | null;
	duration: number;
	collectionContentType: Types.CollectionContentType;
	image?: { __typename?: 'Image'; id: string; url: any } | null;
	allSequences: {
		__typename?: 'SequenceConnection';
		aggregate?: { __typename?: 'Aggregate'; count: number } | null;
	};
	allRecordings: {
		__typename?: 'RecordingConnection';
		aggregate?: { __typename?: 'Aggregate'; count: number } | null;
	};
};

export const CardCollectionFragmentDoc = `
    fragment cardCollection on Collection {
  id
  canonicalPath(useFuturePath: true)
  collectionContentType: contentType
  title
  startDate
  endDate
  duration
  image {
    id
    url(size: 240, cropMode: DEFAULT)
  }
  allSequences: sequences {
    aggregate {
      count
    }
  }
  allRecordings: recordings(sequenceId: 0) {
    aggregate {
      count
    }
  }
}
    `;
