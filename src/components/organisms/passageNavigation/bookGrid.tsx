import clsx from 'clsx';
import React from 'react';

import getBookMeta from '~src/services/bibles/getBookName';

import { Book } from '.';
import styles from './bookGrid.module.scss';
import ChapterGrid, { ChapterId } from './chapterGrid';

type Props = {
	books: Array<Book>;
	selectedBook: Book | null;
	selectBook: (book: Book) => void;
	chapterId: ChapterId;
	className?: string;
	versionId: string | number;
};

export default function BookGrid({
	books,
	selectedBook,
	selectBook,
	chapterId,
	className,
	versionId,
}: Props) {
	return (
		<ul className={clsx(className, styles.books, styles.grid)}>
			{books.map((book) => {
				const bookMeta = getBookMeta(book.title);

				if (!bookMeta) {
					throw new Error(`Book not found: ${book.title}`);
				}

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
						{book.id === selectedBook?.id && (
							<li className={styles.drawer}>
								<ChapterGrid
									chapterId={chapterId}
									bookId={bookMeta.fcbhId}
									versionId={versionId}
								/>
							</li>
						)}
					</>
				);
			})}
		</ul>
	);
}
