import clsx from 'clsx';
import React, { useState } from 'react';

import Link from '~components/atoms/linkWithoutPrefetch';

import { PassageNavigationFragment } from './__generated__/passageNavigation';
import styles from './passageNavigation.module.scss';

type Props = {
	books: Array<PassageNavigationFragment>;
};

export default function PassageNavigation({ books }: Props): JSX.Element {
	const [selectedBook, setSelectedBook] = useState<string | number | null>(
		null,
	);

	return (
		<div className={styles.wrapper}>
			<ul className={styles.books}>
				{books.map((book) => {
					const chapters = book.recordings.nodes;
					return (
						<li
							key={book.id}
							className={clsx(styles.book, {
								active: book.id === selectedBook,
							})}
						>
							<button
								onClick={() => {
									setSelectedBook(book.id);
								}}
							>
								{book.title}
							</button>
							{book.id === selectedBook ? (
								<ul className={styles.chapters}>
									{chapters?.map((chapter) => {
										const n = Number(chapter.title.split(' ').pop());
										return (
											<li key={n} className={styles.chapter}>
												<Link href={chapter.canonicalPath}>{n}</Link>
											</li>
										);
									})}
								</ul>
							) : (
								''
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
