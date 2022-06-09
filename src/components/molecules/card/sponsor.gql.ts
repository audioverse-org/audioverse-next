// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../../types/generated';

export type CardSponsorFragment = {
	__typename?: 'Sponsor';
	id: string;
	title: string;
	canonicalPath: string;
	image?: { __typename?: 'Image'; url: any } | null;
	collections: {
		__typename?: 'CollectionConnection';
		aggregate?: { __typename?: 'Aggregate'; count: number } | null;
	};
	sequences: {
		__typename?: 'SequenceConnection';
		aggregate?: { __typename?: 'Aggregate'; count: number } | null;
	};
	recordings: {
		__typename?: 'RecordingConnection';
		aggregate?: { __typename?: 'Aggregate'; count: number } | null;
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
  collections {
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
