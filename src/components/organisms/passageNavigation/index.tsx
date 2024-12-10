import clsx from 'clsx';
import React, { ReactNode, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useLocalStorage } from '~src/lib/hooks/useLocalStorage';

import IconSearch from '~public/img/icons/icon-search.svg';
import IconDisclosure from '~public/img/icons/icon-disclosure.svg';
import BookGrid from './bookGrid';
import BookList from './bookList';
import styles from './index.module.scss';
import BibleVersionTypeLockup from '~src/components/molecules/bibleVersionTypeLockup';
import Dropdown from '~src/components/molecules/dropdown';
import Button from '~src/components/molecules/button';
import { getBibleAcronym } from '~src/lib/getBibleAcronym';
import { GetAudiobibleIndexDataQuery } from '~src/containers/bible/__generated__';
import IconButton from '~src/components/molecules/iconButton';
import { BaseColors } from '~src/lib/constants';

export type Version = NonNullable<
	GetAudiobibleIndexDataQuery['collections']['nodes']
>[0];

type BookIndex = string | number | null;

type Props = {
	versions: Array<Version>;
	children?: ReactNode;
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

export default function PassageNavigation({
	versions,
	children,
}: Props): ReactNode {
	const [open, setOpen] = useState<boolean>(!children);

	const [selectedVersion, setSelectedVersion] = useLocalStorage<Version>(
		'bibleVersion',
		versions[0],
	);

	const books = selectedVersion.sequences.nodes || [];

	const [selectedBook, setSelectedBook] = useLocalStorage<BookIndex>(
		'bibleBook',
		books[0].id,
	);

	const [selectedView, setSelectedView] = useLocalStorage<'grid' | 'list'>(
		'passageNavLayout',
		'grid',
	);

	return (
		<div className={styles.base}>
			<div className={styles.hat} onClick={() => setOpen(!open)}>
				<BibleVersionTypeLockup unpadded />
				<a className={styles.historyButton} href="https://www.example.com">
					<FormattedMessage id="bibles__history" defaultMessage="History" />
				</a>
				<Dropdown
					id="booksMenu"
					trigger={(props) => (
						<Button
							type="tertiary"
							text={getBibleAcronym(selectedVersion.title)}
							IconRight={IconDisclosure}
							className={styles.dropdownButton}
							{...props}
						/>
					)}
				>
					{(handleClose) => (
						<div className={styles.dropdownContainer}>
							{versions.map((version) => (
								<p key={version.id}>
									<Button
										type="tertiary"
										onClick={() => {
											setSelectedVersion(version);
											handleClose();
										}}
										text={getBibleAcronym(version.title)}
									/>
								</p>
							))}
						</div>
					)}
				</Dropdown>
				<IconButton
					Icon={IconSearch}
					onClick={function (): void {
						throw new Error('Function not implemented.');
					}}
					color={BaseColors.WHITE}
					backgroundColor={BaseColors.DARK}
				/>
			</div>

			{open || !children ? (
				<div className={styles.content}>
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
			) : (
				children
			)}
		</div>
	);
}
