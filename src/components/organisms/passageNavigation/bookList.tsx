import clsx from 'clsx';
import React from 'react';

import getBookMeta from '~src/services/bibles/getBookMeta';

import { Book } from '.';
import styles from './bookList.module.scss';
import ChapterGrid, { ChapterId } from './chapterGrid';

type Props = {
	books: Array<Book>;
	selectedBook: Book | null;
	selectBook: (book: Book) => void;
	chapterId: ChapterId;
	versionId: string | number;
};

export default function BookList({
	books,
	selectedBook,
	selectBook,
	chapterId,
	versionId,
}: Props) {
	return (
		<ul className={clsx(styles.books)}>
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
							<button onClick={() => selectBook(book)}>{book.title}</button>
						</li>
						{book.id === selectedBook?.id && (
							<li>
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
