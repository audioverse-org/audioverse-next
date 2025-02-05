import { useRouter } from 'next/router';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading1 from '~components/atoms/heading1';
import LineHeading from '~components/atoms/lineHeading';
import Link from '~components/atoms/linkWithoutPrefetch';
import { PlayerFragment } from '~components/molecules/__generated__/player';
import { SequenceNavFragment } from '~components/molecules/__generated__/sequenceNav';
import BibleVersionTypeLockup from '~components/molecules/bibleVersionTypeLockup';
import Button from '~components/molecules/button';
import ContentWidthLimiter from '~components/molecules/contentWidthLimiter';
import DefinitionList, {
	IDefinitionListTerm,
} from '~components/molecules/definitionList';
import Player from '~components/molecules/player';
import SequenceNav from '~components/molecules/sequenceNav';
import Tease from '~components/molecules/tease';
import TeaseRecording from '~components/molecules/teaseRecording';
import { PlaybackContext } from '~components/templates/andPlaybackContext';
import {
	bibleFCBHJKVDramatized,
	getFileSetId,
	IBibleBook,
	IBibleBookChapter,
	IBibleVersion,
} from '~lib/api/bibleBrain';
import { BaseColors } from '~lib/constants';
import root from '~lib/routes';
import useLanguageRoute from '~lib/useLanguageRoute';
import IconBack from '~public/img/icons/icon-back-light.svg';
import IconBlog from '~public/img/icons/icon-blog-light-small.svg';
import {
	RecordingContentType,
	SequenceContentType,
} from '~src/__generated__/graphql';
import AndFailStates from '~src/components/templates/andFailStates';
import { Must } from '~src/types/types';
import { gtmPushEvent } from '~src/utils/gtm';

import styles from './book.module.scss';

// TODO: Remove this transformation when the API returns Recording type
function chapterToRecording(
	chapter: IBibleBookChapter | undefined,
	languageRoute: string,
	book: IBibleBook,
): PlayerFragment &
	SequenceNavFragment & {
		collection: { id: string | number };
		sequence: { id: string | number };
		sponsor: { id: string | number };
	} {
	const makeCanonicalPath = (n: number) =>
		root.lang(languageRoute).bibles.bookId(book.book_id).chapterNumber(n).get();

	const toRecordingChapterNumber = chapter?.number as number;
	let fakeAlias = 'KJV';
	try {
		const urlPathnameComponents =
			new URL(chapter?.url || '').pathname.match(/(\d+)_([^_]+)/i) || [];
		fakeAlias = `KJV_${urlPathnameComponents[2]}_${urlPathnameComponents[1]}`;
	} catch (e) {
		console.log(e);
	}
	return {
		id: chapter?.id || '',
		title: chapter?.title || '',
		canonicalPath: makeCanonicalPath(toRecordingChapterNumber),
		duration: chapter?.duration || 0,
		audioFiles: [
			{
				url: chapter?.url || '',
				mimeType: 'audio/mpeg',
				filesize: 'unknown',
				duration: chapter?.duration || 0,
				logUrl: `https://www.audioverse.org/en/download/audiobible/${fakeAlias}/filename.mp3`,
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} as any,
		],
		sequencePreviousRecording:
			toRecordingChapterNumber > 1
				? { canonicalPath: makeCanonicalPath(toRecordingChapterNumber - 1) }
				: null,
		sequenceNextRecording:
			toRecordingChapterNumber < book.chapters.length
				? { canonicalPath: makeCanonicalPath(toRecordingChapterNumber + 1) }
				: null,
		isDownloadAllowed: false,
		speakers: [],
		videoDownloads: [],
		videoFiles: [],
		videoStreams: [],
		audioDownloads: [],
		shareUrl: `https://www.audioverse.org${makeCanonicalPath(
			toRecordingChapterNumber,
		)}`,
		sequence: {
			__typename: 'Sequence',
			id: chapter
				? getFileSetId(bibleFCBHJKVDramatized.fileSetId, chapter.testament)
				: '',
			contentType: SequenceContentType.BibleBook,
			title: chapter?.bookName || '',
		},
		collection: {
			__typename: 'Collection',
			id: bibleFCBHJKVDramatized.id,
			title: bibleFCBHJKVDramatized.name,
		},
		recordingContentType: RecordingContentType.BibleChapter,
		sponsor: {
			__typename: 'Sponsor',
			id: 1,
			title: 'Faith Comes By Hearing',
		},
	};
}

export interface BookProps {
	version: IBibleVersion;
	book: IBibleBook;
	chapters: IBibleBookChapter[];
	chapterNumber: string | number;
}

const Book = (params: Must<BookProps>) => {
	const chapter = params.chapters.find(
		({ number }) => number === +params.chapterNumber,
	);
	const currentChapterNumber = chapter?.number || 1;
	const playbackContext = useContext(PlaybackContext);
	const currentRecordingId = playbackContext.getRecording()?.id;
	const router = useRouter();
	useEffect(() => {
		if (!currentRecordingId || !(currentRecordingId + '').includes('/')) {
			return;
		}
		const currentRecordingIdChapter = (currentRecordingId + '').split('/')[2];
		if (+currentRecordingIdChapter !== currentChapterNumber) {
			router.replace(router.asPath.replace(/\d+$/, currentRecordingIdChapter));
		}
	}, [currentChapterNumber, currentRecordingId, router]);

	return useMemo(() => {
		return <BookInner {...params} />;
	}, [params]);
};

function BookInner({
	version,
	book,
	chapters,
	chapterNumber,
}: Must<BookProps>): JSX.Element {
	const { id, description, sponsor } = version;
	const languageRoute = useLanguageRoute();
	const chapter = chapters.find(({ number }) => number === +chapterNumber);
	const intl = useIntl();

	const currentChapterNumber = chapter?.number || 1;

	const [showingText, setShowingText] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);
	const currentRef = useRef<HTMLDivElement>(null);
	const [scrollPosition, setScrollPosition] = useState(0);
	useEffect(() => {
		if (!scrollRef.current || !currentRef.current) {
			return;
		}
		const scroller = scrollRef.current;
		scroller.scrollTo({ top: currentRef.current.offsetTop - 32 });
		const saveScrollPosition = (e: Event) => {
			setScrollPosition((e.target as HTMLElement).scrollTop);
		};
		scroller.addEventListener('scroll', saveScrollPosition);
		return () => scroller.removeEventListener('scroll', saveScrollPosition);
	}, [currentChapterNumber]);

	const recording = useMemo(
		() => chapterToRecording(chapter, languageRoute, book),
		[chapter, languageRoute, book],
	);

	useEffect(() => {
		gtmPushEvent('recording_view', {
			content_type: recording.recordingContentType,
			item_id: recording.id,
			title: recording.title,
			presenter: recording.speakers.map((item) => item.name).join(';'),
			sponsor: recording.sponsor?.title,
			conference: recording.collection?.title,
			series: recording.sequence?.title,
		});
	}, [recording]);
	const recordings = chapters.map((c) =>
		chapterToRecording(c, languageRoute, book),
	);

	const details: IDefinitionListTerm[] = [];
	if (description) {
		details.push({
			term: (
				<FormattedMessage
					id="bibleVersion__description"
					defaultMessage="Description"
				/>
			),
			definition: <p>{description}</p>,
		});
	}
	details.push({
		term: (
			<FormattedMessage
				id="bibleVersion__sponsorLabel"
				defaultMessage="Sponsor"
			/>
		),
		definition: (
			<p>
				<a
					href={sponsor.website}
					target="_blank"
					className="decorated hover--salmon"
					rel="noreferrer"
				>
					{sponsor.title}
				</a>
			</p>
		),
	});

	return (
		<Tease>
			<Link
				href={root.lang(languageRoute).bibles.versionId(id).get()}
				legacyBehavior
			>
				<a className={styles.hat}>
					<BibleVersionTypeLockup
						unpadded={true}
						label={intl.formatMessage({
							id: 'bibleBook__typeLabel',
							// TODO: Make dynamic?
							defaultMessage: 'KJV Bible',
						})}
					/>
					<h4>{book.name}</h4>
				</a>
			</Link>
			<div className={styles.content}>
				<div className={styles.main}>
					{showingText ? (
						<>
							<Button
								type="secondary"
								text={
									<FormattedMessage
										id="bibleBook__backToChapter"
										defaultMessage="Back to Chapter Info"
									/>
								}
								IconLeft={IconBack}
								onClick={() => setShowingText(false)}
								className={styles.backButton}
							/>
							<Heading1>{chapter?.title}</Heading1>
							<ContentWidthLimiter>
								<div
									className={styles.chapterText}
									dangerouslySetInnerHTML={{ __html: chapter?.text || '' }}
								/>
							</ContentWidthLimiter>
						</>
					) : (
						<>
							<Heading1>{chapter?.title}</Heading1>
							<div className={styles.sequenceNav}>
								<SequenceNav recording={recording} useInverse={false} />
							</div>
							{chapter?.url && (
								<Player
									recording={recording as PlayerFragment}
									playlistRecordings={recordings.slice(
										chapters.findIndex((c) => c.id === chapter?.id),
									)}
									backgroundColor={BaseColors.BIBLE_B}
									disableUserFeatures
								/>
							)}
							<div className={styles.definitions}>
								<DefinitionList terms={details} textColor={BaseColors.DARK} />
							</div>
							<div className={styles.disclaimer}>
								<FormattedMessage
									id="bibleBook__disclaimer"
									defaultMessage="The terms and conditions governing the use of audio Bibles from Faith Comes By Hearing prevents the option to download and the integration of certain features on our platform."
								/>
							</div>
							<div className={styles.readAlong}>
								<Button
									type="secondary"
									text={
										<FormattedMessage
											id="bibleBook__readAlong"
											defaultMessage="Read Along"
										/>
									}
									IconLeft={IconBlog}
									onClick={() => setShowingText(!showingText)}
								/>
							</div>
						</>
					)}
				</div>

				<div className={styles.chapters}>
					<div className={styles.chaptersScroller} ref={scrollRef}>
						<LineHeading
							small
							color={BaseColors.RED}
							className={styles.chapterHeading}
						>
							<FormattedMessage
								id="bibleBook__chapterListTitle"
								defaultMessage="Other Chapters in Book"
							/>
						</LineHeading>

						<div className={styles.chaptersItems}>
							{chapters.map((chapter) => (
								<div
									className={styles.item}
									key={chapter.id}
									ref={
										chapter.number === currentChapterNumber
											? currentRef
											: undefined
									}
								>
									<TeaseRecording
										recording={{
											...chapterToRecording(chapter, languageRoute, book),
											sequence: null,
											sequenceIndex: null,
										}}
										playlistRecordings={recordings.slice(
											chapters.findIndex((c) => c.id === chapter.id),
										)}
										theme="chapter"
										unpadded
										disableUserFeatures
									/>
								</div>
							))}
						</div>
					</div>
					<div
						className={styles.overflowShadow}
						style={{ opacity: Math.min(1, scrollPosition / 100) }}
					/>
				</div>
			</div>
		</Tease>
	);
}

const WithFailStates = (props: Parameters<typeof Book>[0]) => (
	<AndFailStates
		Component={Book}
		componentProps={props}
		options={{ should404: ({ chapters }: BookProps) => !chapters.length }}
	/>
);
export default WithFailStates;
