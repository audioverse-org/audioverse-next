import { BibleChapterDetailBookFragment } from '~src/containers/bible/__generated__/chapter';

import { IBibleBook } from '../types';

export function transformBook(val: IBibleBook): BibleChapterDetailBookFragment {
	return {
		id: val.book_id,
		title: val.name,
	};
}
