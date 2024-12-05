import clsx from 'clsx';
import React, { useRef, useState } from 'react';

import { PassageNavigationFragment } from './__generated__/passageNavigation';
import BookGrid from './bookGrid';
import BookList from './bookList';
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

			{selectedView === 'list' ? (
				<BookList
					books={books}
					selectedBook={selectedBook}
					selectBook={setSelectedBook}
				/>
			) : (
				<BookGrid
					books={books}
					selectedBook={selectedBook}
					selectBook={setSelectedBook}
				/>
			)}
		</div>
	);
}
