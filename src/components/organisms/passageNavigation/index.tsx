import clsx from 'clsx';
import React, { ReactNode, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import IconDisclosure from '~public/img/icons/icon-disclosure.svg';
import BibleVersionTypeLockup from '~src/components/molecules/bibleVersionTypeLockup';
import Button from '~src/components/molecules/button';
import Dropdown from '~src/components/molecules/dropdown';
import { GetAudiobibleIndexDataQuery } from '~src/containers/bible/__generated__';
import { BIBLE_BOOKS } from '~src/lib/constants';
import { getBibleAcronym } from '~src/lib/getBibleAcronym';
import { useLocalStorage } from '~src/lib/hooks/useLocalStorage';
import usePlaybackSession from '~src/lib/hooks/usePlaybackSession';
import isServerSide from '~src/lib/isServerSide';

import BookGrid from './bookGrid';
import BookList from './bookList';
import styles from './index.module.scss';

export type Version = NonNullable<
	GetAudiobibleIndexDataQuery['collections']['nodes']
>[0];
export type Book = NonNullable<Version['sequences']['nodes']>[0];
export type Chapter = NonNullable<Book['recordings']['nodes']>[0];

type Props = {
	versions: Array<Version>;
	chapter?: Chapter;
	children?: ReactNode;
};

function resolveChapterPath(
	versions: Array<Version>,
	chapter: Chapter,
): [Version, Book, Chapter] {
	for (const version of versions) {
		for (const book of version.sequences.nodes || []) {
			const found = book.recordings.nodes?.some((r) => r.id === chapter.id);
			if (found) {
				return [version, book, chapter];
			}
		}
	}
	throw Error("Couldn't find the chapter");
}

export default function PassageNavigation({
	versions,
	chapter,
	children,
}: Props): ReactNode {
	const [open, setOpen] = useState<boolean>(!children);

	const [selectedVersion, setSelectedVersion] = useState<Version>(versions[0]);

	const books = selectedVersion.sequences.nodes || [];

	const [selectedBook, setSelectedBook] = useState<Book>(books[0]);

	const [selectedChapterId, setSelectedChapterId] = useLocalStorage(
		'selectedChapterId',
		chapter?.id || null,
	);

	const session = usePlaybackSession(chapter ?? null);

	useEffect(() => {
		if (isServerSide() || !chapter) return;
		session.play();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (chapter) {
			setSelectedChapterId(chapter.id);

			const [version, book] = resolveChapterPath(versions, chapter);
			setSelectedVersion(version);
			setSelectedBook(book);
		}
	}, [chapter, versions, setSelectedChapterId]);

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
				<BibleVersionTypeLockup unpadded label={chapter?.title || 'Bible'} />
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
										onClick={(e) => {
											setSelectedVersion(version);
											handleClose(e);
										}}
										text={getBibleAcronym(version.title)}
									/>
								</p>
							))}
						</div>
					)}
				</Dropdown>
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
							chapterId={selectedChapterId}
						/>
					) : (
						<>
							<BookGrid
								books={books.filter((book) =>
									BIBLE_BOOKS.slice(0, 39).includes(book.title),
								)}
								selectedBook={selectedBook}
								selectBook={setSelectedBook}
								chapterId={selectedChapterId}
							/>
							<BookGrid
								books={books.filter((book) =>
									BIBLE_BOOKS.slice(39).includes(book.title),
								)}
								selectedBook={selectedBook}
								selectBook={setSelectedBook}
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
