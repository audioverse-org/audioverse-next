import clsx from 'clsx';
import React, { useRef, useState } from 'react';

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
	const [selectedView, setSelectedView] = useState<'grid' | 'list'>('grid');

	return (
		<div className={styles.wrapper}>
			<div className={styles.switch}>
				<button
					className={clsx({ active: selectedView === 'grid' })}
					onClick={() => setSelectedView('grid')}
				>
					Grid
				</button>
				<button
					className={clsx({ active: selectedView === 'list' })}
					onClick={() => setSelectedView('list')}
				>
					List
				</button>
			</div>

			<ul className={clsx(styles.books, { grid: selectedView === 'grid' })}>
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
								<button
									onClick={() => {
										setSelectedBook(book.id);
									}}
								>
									{selectedView === 'grid'
										? book.title.replace(' ', '').substring(0, 3)
										: book.title}
								</button>
							</li>
							{book.id === selectedBook && selectedView === 'list' ? (
								<li className={styles.chaptersWrapper}>
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
								</li>
							) : (
								''
							)}
						</>
					);
				})}
			</ul>
		</div>
	);
}
