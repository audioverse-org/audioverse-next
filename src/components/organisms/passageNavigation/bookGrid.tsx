import clsx from 'clsx';
import React from 'react';

import { Book } from '.';
import styles from './bookGrid.module.scss';
import ChapterGrid, { ChapterId } from './chapterGrid';

type Props = {
	books: Array<Book>;
	selectedBook: Book | null;
	selectBook: (book: Book) => void;
	chapterId: ChapterId;
	className?: string;
};

export default function BookGrid({
	books,
	selectedBook,
	selectBook,
	chapterId,
	className,
}: Props) {
	return (
		<ul className={clsx(className, styles.books, styles.grid)}>
			{books.map((book) => {
				const chapters = book.recordings.nodes;

				return (
					<>
						<li
							key={book.id}
							className={clsx(styles.book, {
								[styles.active]: book.id === selectedBook?.id,
							})}
						>
							<button onClick={() => selectBook(book)}>
								{book.title.replace(' ', '').substring(0, 3)}
							</button>
						</li>
						{book.id === selectedBook?.id && chapters && (
							<li className={styles.drawer}>
								<ChapterGrid chapters={chapters} chapterId={chapterId} />
							</li>
						)}
					</>
				);
			})}
		</ul>
	);
}
