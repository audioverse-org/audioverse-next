import * as Types from '../../lib/generated/graphql';

export type TestimoniesFragment = {
	__typename?: 'Testimony';
	id: string | number;
	body: string;
	author: string;
};

export const TestimoniesFragmentDoc = `
    fragment testimonies on Testimony {
  id
  body
  author
}
    `;
