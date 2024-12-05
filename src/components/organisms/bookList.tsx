import clsx from 'clsx';
import React from 'react';

import { PassageNavigationFragment } from './__generated__/passageNavigation';
import ChapterGrid from './chapterGrid';
import styles from './passageNavigation.module.scss';

type Props = {
	books: Array<PassageNavigationFragment>;
	selectedBook: string | number | null;
	selectBook: (id: string | number | null) => void;
};

export default function BookList({ books, selectedBook, selectBook }: Props) {
	return (
		<ul className={clsx(styles.books)}>
			{books.map((book) => {
				const chapters = book.recordings.nodes;

				return (
					<>
						<li
							key={book.id}
							className={clsx(styles.book, {
								active: book.id === selectedBook,
							})}
						>
							<button onClick={() => selectBook(book.id)}>{book.title}</button>
						</li>
						{book.id === selectedBook && chapters && (
							<ChapterGrid chapters={chapters} />
						)}
					</>
				);
			})}
		</ul>
	);
}
