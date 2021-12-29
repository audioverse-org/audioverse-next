import * as Types from '../../../lib/generated/graphql';

export type CardPersonFragment = {
	__typename?: 'Person';
	id: string | number;
	name: string;
	canonicalPath: string;
	image:
		| { __typename?: 'Image'; id: string | number; url: string }
		| null
		| undefined;
	recordings: {
		__typename?: 'RecordingConnection';
		aggregate: { __typename?: 'Aggregate'; count: number } | null | undefined;
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
