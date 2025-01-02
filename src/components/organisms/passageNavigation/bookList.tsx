import clsx from 'clsx';
import React from 'react';

import { Book } from '.';
import styles from './bookList.module.scss';
import ChapterGrid, { ChapterId } from './chapterGrid';

type Props = {
	books: Array<Book>;
	selectedBook: Book | null;
	selectBook: (book: Book) => void;
	chapterId: ChapterId;
};

export default function BookList({
	books,
	selectedBook,
	selectBook,
	chapterId,
}: Props) {
	return (
		<ul className={clsx(styles.books)}>
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
							<button onClick={() => selectBook(book)}>{book.title}</button>
						</li>
						{book.id === selectedBook?.id && chapters && (
							<li>
								<ChapterGrid chapters={chapters} chapterId={chapterId} />
							</li>
						)}
					</>
				);
			})}
		</ul>
	);
}
