import { BibleChapterDetailBookFragment } from '~src/containers/bible/chapter/__generated__/index';

import { IBBBook } from '../types';

export function transformBook(val: IBBBook): BibleChapterDetailBookFragment {
	return {
		id: val.book_id,
		title: val.name,
	};
}
