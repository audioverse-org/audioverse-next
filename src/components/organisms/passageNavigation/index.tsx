import clsx from 'clsx';
import React, { ReactNode, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import IconDisclosure from '~public/img/icons/icon-disclosure.svg';
import IconSearch from '~public/img/icons/icon-search.svg';
import BibleVersionTypeLockup from '~src/components/molecules/bibleVersionTypeLockup';
import Button from '~src/components/molecules/button';
import Dropdown from '~src/components/molecules/dropdown';
import IconButton from '~src/components/molecules/iconButton';
import { GetAudiobibleIndexDataQuery } from '~src/containers/bible/__generated__';
import { BaseColors } from '~src/lib/constants';
import { getBibleAcronym } from '~src/lib/getBibleAcronym';
import { useLocalStorage } from '~src/lib/hooks/useLocalStorage';

import BookGrid from './bookGrid';
import BookList from './bookList';
import styles from './index.module.scss';

export type Version = NonNullable<
	GetAudiobibleIndexDataQuery['collections']['nodes']
>[0];

type Book = NonNullable<Version['sequences']['nodes']>[0];
type Chapter = NonNullable<Book['recordings']['nodes']>[0];

type BookId = string | number | null;
type ChapterId = string | number;

type Props = {
	versions: Array<Version>;
	chapterId?: ChapterId;
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

function getBibleData(
	versions: Array<Version>,
	chapterId: ChapterId,
): [Version, Book, Chapter] {
	for (const version of versions) {
		for (const book of version.sequences.nodes || []) {
			const chapter = book.recordings.nodes?.find((r) => r.id === chapterId);
			if (chapter) {
				return [version, book, chapter];
			}
		}
	}
	throw Error("Couldn't find the chapter");
}

function getLabelText(
	versions: Array<Version>,
	chapterId: ChapterId | null,
): string {
	if (chapterId) {
		const [_version, _book, chapter] = getBibleData(versions, chapterId);

		return `${chapter.title}`;
	}

	return `Bible`;
}

export default function PassageNavigation({
	versions,
	chapterId,
	children,
}: Props): ReactNode {
	const [open, setOpen] = useState<boolean>(!children);

	const [selectedVersion, setSelectedVersion] = useState<Version>(versions[0]);

	const books = selectedVersion.sequences.nodes || [];

	const [selectedBookId, setSelectedBookId] = useState<BookId>(books[0].id);

	const [selectedChapterId, setSelectedChapterId] =
		useLocalStorage<ChapterId | null>('selectedChapterId', chapterId || null);

	useEffect(() => {
		if (chapterId !== undefined) {
			setSelectedChapterId(chapterId);
		}

		if (selectedChapterId !== null) {
			const [version, book] = getBibleData(versions, selectedChapterId);
			setSelectedVersion(version);
			setSelectedBookId(book.id);
		}
	}, [selectedChapterId, chapterId, setSelectedChapterId, versions]);

	useEffect(() => {
		setOpen(false);
	}, [selectedChapterId]);

	const [selectedView, setSelectedView] = useLocalStorage<'grid' | 'list'>(
		'passageNavLayout',
		'grid',
	);

	return (
		<div className={styles.base}>
			<div className={styles.hat} onClick={() => setOpen(!open)}>
				<BibleVersionTypeLockup
					unpadded
					label={getLabelText(versions, selectedChapterId)}
				/>
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
							selectedBook={selectedBookId}
							selectBook={setSelectedBookId}
							chapterId={selectedChapterId}
						/>
					) : (
						<>
							<BookGrid
								books={books.filter((book) =>
									OT.includes(book.title.toLocaleLowerCase()),
								)}
								selectedBook={selectedBookId}
								selectBook={setSelectedBookId}
								chapterId={selectedChapterId}
							/>
							<BookGrid
								books={books.filter(
									(book) => !OT.includes(book.title.toLocaleLowerCase()),
								)}
								selectedBook={selectedBookId}
								selectBook={setSelectedBookId}
								chapterId={selectedChapterId}
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
