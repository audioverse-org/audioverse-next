import clsx from 'clsx';
import React, {
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { FormattedMessage } from 'react-intl';

import BibleVersionTophat from '~components/molecules/bibleVersionTophat';
import { BibleVersionTophatFragment } from '~components/molecules/bibleVersionTophat/__generated__';
import {
	RecordingContentType,
	SequenceContentType,
} from '~src/__generated__/graphql';
import { useLocalStorage } from '~src/components/organisms/passageNavigation/useLocalStorage';
import { PlaybackContext } from '~src/components/templates/andPlaybackContext';
import { BIBLE_BOOKS } from '~src/lib/constants';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';
import root from '~src/lib/routes';

import {
	PassageNavigationBookFragment,
	PassageNavigationChapterFragment,
	PassageNavigationVersionFragment,
	PassageNavigationVersionFullFragment,
} from './__generated__';
import BookGrid from './bookGrid';
import BookList from './bookList';
import styles from './index.module.scss';

export type Version = PassageNavigationVersionFragment;
export type VersionFull = PassageNavigationVersionFullFragment;
export type Book = PassageNavigationBookFragment;
export type Chapter = PassageNavigationChapterFragment;

type Props = {
	versions: Array<Version>;
	version: VersionFull;
	chapter?: Chapter;
	children?: ReactNode;
};

export default function PassageNavigation({
	versions,
	version,
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

	const books = useMemo(() => {
		return version.sequences.nodes || [];
	}, [version.sequences.nodes]);

	const [book, setBook] = useState<Book | null>(() => {
		const s = loadedRecording?.sequence;
		const isBook = s?.contentType === SequenceContentType.BibleBook;
		if (!isBook) return null;
		return books.find((b) => b.id === s.id) || books[0];
	});

	const toggleBook = (selectedBook: Book) => {
		if (book && book.id === selectedBook.id) {
			setBook(null);
		} else {
			setBook(selectedBook);
		}
	};

	const chapterId = useMemo(() => {
		if (chapter) return chapter.id;
		const r = loadedRecording;
		const isChapter =
			r && r.recordingContentType === RecordingContentType.BibleChapter;
		if (!isChapter) return null;
		return loadedRecording.id;
	}, [loadedRecording, chapter]);

	const languageRoute = useLanguageRoute();

	const getVersionUrl = (v: BibleVersionTophatFragment) =>
		root.lang(languageRoute).bibles.versionId(v.id).get();

	useEffect(() => {
		setOpen(false);
	}, [chapter]);

	return (
		<div className={clsx(styles.base, { [styles.hasChildren]: !!children })}>
			<BibleVersionTophat
				version={version}
				versions={versions}
				label={chapter?.title || 'Bible'}
				getVersionUrl={getVersionUrl}
			/>
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
							selectBook={toggleBook}
							chapterId={chapterId}
							versionId={version.id}
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
								selectBook={toggleBook}
								chapterId={chapterId}
								versionId={version.id}
							/>
							<BookGrid
								className={styles.nt}
								books={books.filter((book) =>
									BIBLE_BOOKS.slice(39).find(
										(b) => b.toLowerCase() === book.title.toLowerCase(),
									),
								)}
								selectedBook={book}
								selectBook={toggleBook}
								chapterId={chapterId}
								versionId={version.id}
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
