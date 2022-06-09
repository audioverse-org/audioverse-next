// ------------------------------------------------------
// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
// ------------------------------------------------------
import * as Types from '../../../types/generated';

export type CardPostFragment = {
	__typename?: 'BlogPost';
	publishDate: any;
	title: string;
	teaser: string;
	canonicalPath: string;
	readingDuration?: number | null;
	image?: { __typename?: 'Image'; url: any } | null;
};

export const CardPostFragmentDoc = `
    fragment cardPost on BlogPost {
  image {
    url(size: 500, cropMode: MAX_SIZE)
  }
  publishDate
  title
  teaser
  canonicalPath(useFuturePath: true)
  readingDuration
}
    `;
