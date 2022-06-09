// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../../types/generated';

export type CardPersonFragment = {
	__typename?: 'Person';
	id: string;
	name: string;
	canonicalPath: string;
	image?: { __typename?: 'Image'; id: string; url: any } | null;
	recordings: {
		__typename?: 'RecordingConnection';
		aggregate?: { __typename?: 'Aggregate'; count: number } | null;
	};
};

export const CardPersonFragmentDoc = `
    fragment cardPerson on Person {
  id
  name
  canonicalPath(useFuturePath: true)
  image {
    id
    url(size: 128)
  }
  recordings(first: 2, orderBy: [{field: PUBLISHED_AT, direction: DESC}]) {
    aggregate {
      count
    }
  }
}
    `;
