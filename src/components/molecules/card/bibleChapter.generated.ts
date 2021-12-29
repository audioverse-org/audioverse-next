import * as Types from '../../../lib/generated/graphql';

export type CardBibleChapterFragment = {
	__typename?: 'BibleChapter';
	id: string | number;
	title: string;
	url: string;
};

export const CardBibleChapterFragmentDoc = `
    fragment cardBibleChapter on BibleChapter {
  id
  title
  url
}
    `;
