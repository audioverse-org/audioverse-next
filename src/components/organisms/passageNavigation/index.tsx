import clsx from 'clsx';
import React, {
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { FormattedMessage } from 'react-intl';

import IconDisclosure from '~public/img/icons/icon-disclosure-light-small.svg';
import {
	CollectionContentType,
	RecordingContentType,
	SequenceContentType,
} from '~src/__generated__/graphql';
import BibleVersionTypeLockup from '~src/components/molecules/bibleVersionTypeLockup';
import Button from '~src/components/molecules/button';
import Dropdown from '~src/components/molecules/dropdown';
import { PlaybackContext } from '~src/components/templates/andPlaybackContext';
import { GetAudiobibleIndexDataQuery } from '~src/containers/bible/__generated__';
import { BIBLE_BOOKS } from '~src/lib/constants';
import { getBibleAcronym } from '~src/lib/getBibleAcronym';
import { useLocalStorage } from '~src/lib/hooks/useLocalStorage';

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

// function resolveChapterPath(
// 	versions: Array<Version>,
// 	chapter: Chapter,
// ): [Version, Book, Chapter] {
// 	for (const version of versions) {
// 		for (const book of version.sequences.nodes || []) {
// 			const found = book.recordings.nodes?.some((r) => r.id === chapter.id);
// 			if (found) {
// 				return [version, book, chapter];
// 			}
// 		}
// 	}
// 	throw Error("Couldn't find the chapter");
// }

export default function PassageNavigation({
	versions,
	chapter,
	children,
}: Props): ReactNode {
	const context = useContext(PlaybackContext);
	const loadedRecording = context.getRecording();
	const [open, setOpen] = useState<boolean>(!children);

	const [selectedVersion, setSelectedVersion] = useState<Version>(() => {
		const c = chapter?.collection || loadedRecording?.collection;
		console.log({ collection: c });
		const isVersion = c?.contentType === CollectionContentType.BibleVersion;
		if (!isVersion) return versions[0];
		return versions.find((version) => (version.id = c.id)) || versions[0];
	});

	const books = useMemo(() => {
		return selectedVersion.sequences.nodes || [];
	}, [selectedVersion.sequences.nodes]);

	// const [selectedChapterId, setSelectedChapterId] = useLocalStorage(
	// 	'selectedChapterId',
	// 	chapter?.id || null,
	// );

	const selectedChapterId = useMemo(() => {
		if (chapter) return chapter.id;
		const r = loadedRecording;
		const isChapter =
			r && r.recordingContentType === RecordingContentType.BibleChapter;
		if (!isChapter) return null;
		return loadedRecording.id;
	}, [loadedRecording, chapter]);

	// const selectedBook = useMemo((): Book => {
	// 	const sequence = loadedRecording?.sequence;
	// 	const isBibleBook = sequence?.contentType === SequenceContentType.BibleBook;
	// 	if (!isBibleBook) return books[0];
	// 	return sequence;
	// }, [loadedRecording, books]);

	const [selectedBook, setSelectedBook] = useState<Book>(() => {
		const s = loadedRecording?.sequence;
		const isBook = s?.contentType === SequenceContentType.BibleBook;
		if (!isBook) return books[0];
		return books.find((book) => book.id === s.id) || books[0];
	});

	console.log({ loadedRecording });

	// useEffect(() => {
	// 	if (chapter) {
	// 		setSelectedChapterId(chapter.id);

	// 		const [version, book] = resolveChapterPath(versions, chapter);
	// 		setSelectedVersion(version);
	// 		setSelectedBook(book);
	// 	}
	// }, [chapter, versions, setSelectedChapterId]);

	const [selectedView, setSelectedView] = useLocalStorage<'grid' | 'list'>(
		'passageNavLayout',
		'grid',
	);

	useEffect(() => {
		setOpen(false);
	}, [chapter]);

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
							{versions.map((v) => (
								<p key={v.id} data-key={v.id}>
									<Button
										type="tertiary"
										onClick={(e) => {
											setSelectedVersion(v);
											handleClose(e);
										}}
										text={getBibleAcronym(v.title)}
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
							className={clsx({ [styles.active]: selectedView === 'grid' })}
							onClick={() => setSelectedView('grid')}
						>
							<FormattedMessage
								id="passageNavigation__selector-grid"
								defaultMessage="Grid"
								description="Switch to grid view"
							/>
						</button>
						<button
							className={clsx({ [styles.active]: selectedView === 'list' })}
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
								className={styles.nt}
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
