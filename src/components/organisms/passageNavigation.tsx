import clsx from 'clsx';
import React, { useState } from 'react';

import { BIBLE_BOOKS } from '../../lib/constants';
import { PassageNavigationFragment } from './__generated__/passageNavigation';
import styles from './passageNavigation.module.scss';

type Props = {
	data: PassageNavigationFragment;
};

export default function PassageNavigation(props: Props): JSX.Element {
	const [selectedBook, setSelectedBook] = useState<string | null>(null);

	const chapters = props.data.nodes[0];

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
				{chapters?.chapters.map((chapter) => (
					<li key={chapter}>
						<button>{chapter}</button>
					</li>
				))}
			</ul>
		</div>
	);
}
