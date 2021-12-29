import * as Types from '../../../lib/generated/graphql';

export type CardSponsorFragment = {
	__typename?: 'Sponsor';
	id: string | number;
	title: string;
	canonicalPath: string;
	image: { __typename?: 'Image'; url: string } | null | undefined;
	collections: {
		__typename?: 'CollectionConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
	};
	sequences: {
		__typename?: 'SequenceConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
	};
	recordings: {
		__typename?: 'RecordingConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
	};
};

export const CardSponsorFragmentDoc = `
    fragment cardSponsor on Sponsor {
  id
  title
  canonicalPath(useFuturePath: true)
  image {
    url(size: 128)
  }
  collections(
    first: 2
    orderBy: [{field: RECORDING_PUBLISHED_AT, direction: DESC}]
  ) {
    aggregate {
      count
    }
  }
  sequences {
    aggregate {
      count
    }
  }
  recordings {
    aggregate {
      count
    }
  }
}
    `;
