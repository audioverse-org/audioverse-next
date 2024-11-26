import clsx from 'clsx';
import React, { useState } from 'react';

import styles from './passageNavigation.module.scss';

// TODO: Fetch from FCBH API probably
const books: Record<string, Array<number>> = {
	Genesis: [1, 2],
	Exodus: [1, 2, 3],
	Leviticus: [1, 2, 3],
	Numbers: [1, 2, 3],
	Deuteronomy: [1, 2, 3, 5],
	Joshua: [1, 2, 3],
};

export default function PassageNavigation(): JSX.Element {
	const [selectedBook, setSelectedBook] = useState<string | null>(null);

	return (
		<div className={styles.wrapper}>
			<ul>
				{Object.keys(books).map((book) => (
					<li key={book} className={clsx({ active: book === selectedBook })}>
						<button
							onClick={() => {
								setSelectedBook(book);
							}}
						>
							{book}
						</button>
					</li>
				))}
			</ul>
			<ul>
				{selectedBook &&
					books[selectedBook].map((chapter) => (
						<li key={chapter}>
							<button>{chapter}</button>
						</li>
					))}
			</ul>
		</div>
	);
}
