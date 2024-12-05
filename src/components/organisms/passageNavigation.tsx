import clsx from 'clsx';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useLocalStorage } from '~src/lib/hooks/useLocalStorage';

import { PassageNavigationFragment } from './__generated__/passageNavigation';
import BookGrid from './bookGrid';
import BookList from './bookList';
import styles from './passageNavigation.module.scss';

type Props = {
	books: Array<PassageNavigationFragment>;
};

// FIXME
const OT = [
	'genesis',
	'exodus',
	'leviticus',
	'numbers',
	'deuteronomy',
	'joshua',
	'judges',
	'ruth',
	'1 samuel',
	'2 samuel',
	'1 kings',
	'2 kings',
	'1 chronicles',
	'2 chronicles',
	'ezra',
	'nehemiah',
	'esther',
	'job',
	'psalms',
	'proverbs',
	'ecclesiastes',
	'song of solomon',
	'isaiah',
	'jeremiah',
	'lamentations',
	'ezekiel',
	'daniel',
	'hosea',
	'joel',
	'amos',
	'obadiah',
	'jonah',
	'micah',
	'nahum',
	'habakkuk',
	'zephaniah',
	'haggai',
	'zechariah',
	'malachi',
];

export default function PassageNavigation({ books }: Props): JSX.Element {
	const [selectedBook, setSelectedBook] = useState<string | number | null>(
		null,
	);
	const [selectedView, setSelectedView] = useLocalStorage<'grid' | 'list'>(
		'passageNavLayout',
		'grid',
	);

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

			{selectedView === 'list' ? (
				<BookList
					books={books}
					selectedBook={selectedBook}
					selectBook={setSelectedBook}
				/>
			) : (
				<>
					<BookGrid
						books={books.filter((book) =>
							OT.includes(book.title.toLocaleLowerCase()),
						)}
						selectedBook={selectedBook}
						selectBook={setSelectedBook}
					/>
					<BookGrid
						books={books.filter(
							(book) => !OT.includes(book.title.toLocaleLowerCase()),
						)}
						selectedBook={selectedBook}
						selectBook={setSelectedBook}
					/>
				</>
			)}
		</div>
	);
}
