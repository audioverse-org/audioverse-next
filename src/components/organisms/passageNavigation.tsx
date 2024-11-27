import clsx from 'clsx';
import React, { useState } from 'react';

import { BIBLE_BOOKS } from '../../lib/constants';
import { PassageNavigationFragment } from './__generated__/passageNavigation';
import { getChapters } from './passageNavigation.logic';
import styles from './passageNavigation.module.scss';

type Props = {
	audiobibles: PassageNavigationFragment;
};

export default function PassageNavigation(props: Props): JSX.Element {
	const [selectedBook, setSelectedBook] = useState<string | null>(
		BIBLE_BOOKS[0],
	);
	const chapters = getChapters(props.audiobibles, selectedBook);

	return (
		<div className={styles.wrapper}>
			<ul>
				{BIBLE_BOOKS.map((book) => (
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
				{chapters?.map(({ title }) => {
					const n = title.split(' ').pop()?.padStart(2, '0') ?? '';
					return (
						<li key={title} className={styles.chapter}>
							<button>{n}</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
