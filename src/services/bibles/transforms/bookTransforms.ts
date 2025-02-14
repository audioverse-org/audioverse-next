import { BibleBookDetailBookFragment } from '~src/containers/bible/__generated__/book';

import { IBibleBook } from '../types';

export function transformBook(val: IBibleBook): BibleBookDetailBookFragment {
	return {
		id: val.book_id,
		title: val.name,
	};
}
