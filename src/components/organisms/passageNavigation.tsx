import clsx from 'clsx';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

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
					<FormattedMessage
						id="passageNavigation__selector-grid"
						defaultMessage="Grid"
						description="Switch to grid view"
					/>
				</button>
				<button
					className={clsx({ active: selectedView === 'list' })}
					onClick={() => setSelectedView('list')}
				>
					<FormattedMessage
						id="passageNavigation__selector-list"
						defaultMessage="List"
						description="Switch to list view"
					/>
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
							{book.id === selectedBook ? (
								<li
									className={clsx(styles.chaptersWrapper, {
										active: book.id === selectedBook,
									})}
								>
									<ul
										className={clsx(styles.chapters, {
											active: book.id === selectedBook,
										})}
									>
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
