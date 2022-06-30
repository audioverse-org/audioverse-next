import * as Types from '../../../../__generated__/graphql';

export type CardCollectionFragment = {
	__typename?: 'Collection';
	id: string | number;
	canonicalPath: string;
	title: string;
	startDate: string | null;
	endDate: string | null;
	duration: number;
	collectionContentType: Types.CollectionContentType;
	image: { __typename?: 'Image'; id: string | number; url: string } | null;
	allSequences: {
		__typename?: 'SequenceConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null;
	};
	allRecordings: {
		__typename?: 'RecordingConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null;
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
