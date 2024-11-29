import clsx from 'clsx';
import React, { useState } from 'react';

import Link from '~components/atoms/linkWithoutPrefetch';
import { IBibleVersion } from '~src/lib/api/bibleBrain';
import root from '~src/lib/routes';
import useLanguageRoute from '~src/lib/useLanguageRoute';

import styles from './passageNavigation.module.scss';

type Props = {
	audiobibles: IBibleVersion[];
};

export default function PassageNavigation(props: Props): JSX.Element {
	const books = props.audiobibles[0].books;
	const [selectedBook, setSelectedBook] = useState<string | null>(
		books[0]?.name,
	);

	const languageRoute = useLanguageRoute();

	return (
		<div className={styles.wrapper}>
			<ul className={styles.books}>
				{books.map((book) => {
					const chapters = book.chapters;
					return (
						<li
							key={book.name}
							className={clsx(styles.book, {
								active: book.name === selectedBook,
							})}
						>
							<button
								onClick={() => {
									setSelectedBook(book.name);
								}}
							>
								{book.name}
							</button>
							{book.name === selectedBook ? (
								<ul className={styles.chapters}>
									{chapters?.map((n) => {
										return (
											<li key={n} className={styles.chapter}>
												<Link
													href={root
														.lang(languageRoute)
														.bibles.bookId(book.book_id)
														.chapterNumber(n)
														.get()}
												>
													{n}
												</Link>
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
