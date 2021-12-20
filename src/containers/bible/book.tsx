import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '@components/atoms/heading1';
import LineHeading from '@components/atoms/lineHeading';
import withFailStates from '@components/HOCs/withFailStates';
import BibleVersionTypeLockup from '@components/molecules/bibleVersionTypeLockup';
import DefinitionList, {
	IDefinitionListTerm,
} from '@components/molecules/definitionList';
import Player from '@components/molecules/player';
import SequenceNav from '@components/molecules/sequenceNav';
import Tease from '@components/molecules/tease';
import TeaseRecording from '@components/molecules/teaseRecording';
import {
	IBibleBook,
	IBibleBookChapter,
	IBibleVersion,
} from '@lib/api/bibleBrain';
import { BaseColors } from '@lib/constants';
import {
	PlayerFragment,
	RecordingContentType,
	SequenceNavFragment,
} from '@lib/generated/graphql';
import { makeBibleBookRoute, makeBibleVersionRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import styles from './book.module.scss';

export interface BookProps {
	version: IBibleVersion;
	book: IBibleBook;
	chapters: IBibleBookChapter[];
	chapterNumber: string | number;
}

function Book({
	version,
	book,
	chapters,
	chapterNumber,
}: Must<BookProps>): JSX.Element {
	const { id, description, sponsor } = version;
	const languageRoute = useLanguageRoute();
	const chapter = chapters.find(({ number }) => number === +chapterNumber);

	const makeCanonicalPath = (n: number) =>
		makeBibleBookRoute(languageRoute, book.book_id, n);
	const currentChapterNumber = chapter?.number || 1;

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

	// TODO: Remove this transformation when the API returns Recording type
	function chapterToRecording(chapter: IBibleBookChapter | undefined): Omit<
		PlayerFragment & SequenceNavFragment,
		'sequence'
	> & {
		sequence: null;
	} {
		const toRecordingChapterNumber = chapter?.number as number;
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
				},
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
				toRecordingChapterNumber
			)}`,
			sequence: null,
		};
	}

	const recording = chapterToRecording(chapter);
	const recordings = chapters.map((c) => chapterToRecording(c));

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
					href={sponsor.url}
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
			<Link href={makeBibleVersionRoute(languageRoute, id)}>
				<a className={styles.hat}>
					<BibleVersionTypeLockup unpadded={true} label="KJV Bible" />
					<h4>{book.name}</h4>
				</a>
			</Link>
			<div className={styles.content}>
				<div className={styles.main}>
					<Heading1>{chapter?.title}</Heading1>
					<div className={styles.sequenceNav}>
						<SequenceNav recording={recording} useInverse={false} />
					</div>
					{chapter?.url && (
						<Player
							recording={recording as PlayerFragment}
							playlistRecordings={recordings.slice(
								chapters.findIndex((c) => c.id === chapter?.id)
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
											...chapterToRecording(chapter),
											recordingContentType: RecordingContentType.Sermon,
											sequenceIndex: null,
											persons: [],
										}}
										playlistRecordings={recordings.slice(
											chapters.findIndex((c) => c.id === chapter.id)
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

export default withFailStates(
	Book,
	({ chapters }: BookProps) => !chapters.length
);
