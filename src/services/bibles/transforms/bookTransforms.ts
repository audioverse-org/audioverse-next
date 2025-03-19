import { BibleChapterDetailBookFragment } from '~src/containers/bible/chapter/__generated__/index';

import { IBibleBook } from '../types';

export function transformBook(val: IBibleBook): BibleChapterDetailBookFragment {
	return {
		id: val.book_id,
		title: val.name,
	};
}
