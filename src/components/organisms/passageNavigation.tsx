import clsx from 'clsx';
import React, { useState } from 'react';

import Link from '~components/atoms/linkWithoutPrefetch';
import root from '~src/lib/routes';
import useLanguageRoute from '~src/lib/useLanguageRoute';

import { BIBLE_BOOKS } from '../../lib/constants';
import { PassageNavigationFragment } from './__generated__/passageNavigation';
import { getBookId, getChapters } from './passageNavigation.logic';
import styles from './passageNavigation.module.scss';

type Props = {
	audiobibles: PassageNavigationFragment;
};

export default function PassageNavigation(props: Props): JSX.Element {
	const [selectedBook, setSelectedBook] = useState<string | null>(
		BIBLE_BOOKS[0],
	);

	const languageRoute = useLanguageRoute();

	return (
		<div className={styles.wrapper}>
			<ul className={styles.books}>
				{BIBLE_BOOKS.map((book) => {
					const chapters = getChapters(props.audiobibles, book);
					return (
						<li
							key={book}
							className={clsx(styles.book, { active: book === selectedBook })}
						>
							<button
								onClick={() => {
									setSelectedBook(book);
								}}
							>
								{book}
							</button>
							{book === selectedBook ? (
								<ul className={styles.chapters}>
									{chapters?.map(({ title }) => {
										const n = title.split(' ').pop()?.padStart(2, '0') ?? '';
										return (
											<li key={title} className={styles.chapter}>
												<Link
													href={root
														.lang(languageRoute)
														.bibles.bookId(
															getBookId(title, props.audiobibles) ?? '',
														)
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
