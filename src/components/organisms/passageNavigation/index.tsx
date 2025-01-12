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
import { BIBLE_BOOKS } from '~src/lib/constants';
import { getBibleAcronym } from '~src/lib/getBibleAcronym';
import { useLocalStorage } from '~src/lib/hooks/useLocalStorage';

import {
	PassageNavigationBookFragment,
	PassageNavigationChapterFragment,
	PassageNavigationVersionFragment,
} from './__generated__';
import BookGrid from './bookGrid';
import BookList from './bookList';
import styles from './index.module.scss';

export type Version = PassageNavigationVersionFragment;
export type Book = PassageNavigationBookFragment;
export type Chapter = PassageNavigationChapterFragment;

type Props = {
	versions: Array<Version>;
	chapter?: Chapter;
	children?: ReactNode;
};

export default function PassageNavigation({
	versions,
	chapter,
	children,
}: Props): ReactNode {
	const context = useContext(PlaybackContext);
	const loadedRecording = context.getRecording();
	const [open, setOpen] = useState<boolean>(!children);
	const [view, setView] = useLocalStorage<'grid' | 'list'>(
		'passageNavLayout',
		'grid',
	);

	const [version, setVersion] = useState<Version>(() => {
		const c = chapter?.collection || loadedRecording?.collection;
		const isVersion = c?.contentType === CollectionContentType.BibleVersion;
		if (!isVersion) return versions[0];
		return versions.find((v) => v.id === c.id) || versions[0];
	});

	const books = useMemo(() => {
		return version.sequences.nodes || [];
	}, [version.sequences.nodes]);

	const [book, setBook] = useState<Book | null>(() => {
		const s = loadedRecording?.sequence;
		const isBook = s?.contentType === SequenceContentType.BibleBook;
		if (!isBook) return null;
		return books.find((b) => b.id === s.id) || books[0];
	});

	const chapterId = useMemo(() => {
		if (chapter) return chapter.id;
		const r = loadedRecording;
		const isChapter =
			r && r.recordingContentType === RecordingContentType.BibleChapter;
		if (!isChapter) return null;
		return loadedRecording.id;
	}, [loadedRecording, chapter]);

	useEffect(() => {
		setOpen(false);
	}, [chapter]);

	return (
		<div className={clsx(styles.base, { [styles.hasChildren]: !!children })}>
			<div className={styles.hat} onClick={() => setOpen(!open)}>
				<BibleVersionTypeLockup unpadded label={chapter?.title || 'Bible'} />
				<Dropdown
					id="booksMenu"
					trigger={(props) => (
						<Button
							type="tertiary"
							text={getBibleAcronym(version.title)}
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
											setVersion(v);
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
							className={clsx({ [styles.active]: view === 'grid' })}
							onClick={() => setView('grid')}
						>
							<FormattedMessage
								id="passageNavigation__selector-grid"
								defaultMessage="Grid"
								description="Switch to grid view"
							/>
						</button>
						<button
							className={clsx({ [styles.active]: view === 'list' })}
							onClick={() => setView('list')}
						>
							<FormattedMessage
								id="passageNavigation__selector-list"
								defaultMessage="List"
								description="Switch to list view"
							/>
						</button>
					</div>

					{view === 'list' ? (
						<BookList
							books={books}
							selectedBook={book}
							selectBook={setBook}
							chapterId={chapterId}
						/>
					) : (
						<>
							<BookGrid
								books={books.filter((book) =>
									BIBLE_BOOKS.slice(0, 39).find(
										(b) => b.toLowerCase() === book.title.toLowerCase(),
									),
								)}
								selectedBook={book}
								selectBook={setBook}
								chapterId={chapterId}
							/>
							<BookGrid
								className={styles.nt}
								books={books.filter((book) =>
									BIBLE_BOOKS.slice(39).find(
										(b) => b.toLowerCase() === book.title.toLowerCase(),
									),
								)}
								selectedBook={book}
								selectBook={setBook}
								chapterId={chapterId}
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
