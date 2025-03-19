import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '~components/atoms/heading1';
import LineHeading from '~components/atoms/lineHeading';
import BibleVersionTophat from '~components/molecules/bibleVersionTophat';
import { BibleVersionTophatFragment } from '~components/molecules/bibleVersionTophat/__generated__';
import DefinitionList, {
	IDefinitionListTerm,
} from '~components/molecules/definitionList';
import Player from '~components/molecules/player';
import SequenceNav from '~components/molecules/sequenceNav';
import Tease from '~components/molecules/tease';
import TeaseRecording from '~components/molecules/teaseRecording';
import { BaseColors } from '~lib/constants';
import root from '~lib/routes';
import { RecordingContentType } from '~src/__generated__/graphql';
import AndFailStates from '~src/components/templates/andFailStates';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';
import isServerSide from '~src/lib/isServerSide';
import { FCBH_VERSIONS } from '~src/services/bibles/constants';
import { parseChapterNumber } from '~src/services/bibles/utils';
import { gtmPushRecordingView } from '~src/services/gtm';

import styles from './index.module.scss';
import { useChapterData } from './useChapterData';

export interface ChapterProps {
	versionId: string;
	bookId: string;
	chapterNumber: number;
}

const versionWebId = 538;
const versionKjvAvId = 552;
const allowedDownloadVersions: (string | number)[] = [
	versionWebId,
	versionKjvAvId,
];

const Chapter = ({
	versionId,
	bookId,
	chapterNumber,
}: ChapterProps): JSX.Element => {
	const { version, book, chapters, chapter, versions, isLoading } =
		useChapterData({
			versionId,
			bookId,
			chapterNumber,
		});

	const languageRoute = useLanguageRoute();
	const currentChapterNumber = chapter ? parseChapterNumber(chapter.title) : -1;
	const scrollRef = useRef<HTMLDivElement>(null);
	const currentRef = useRef<HTMLDivElement>(null);
	const [scrollPosition, setScrollPosition] = useState(0);
	const isFcbhVersion = FCBH_VERSIONS.some((v) => v.id === version?.id);
	const shouldAllowDownload = allowedDownloadVersions.includes(
		version?.id || 0,
	);

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

	useEffect(() => {
		if (!chapter) return;
		gtmPushRecordingView(chapter);
	}, [chapter]);

	const details: IDefinitionListTerm[] = [];

	if (isLoading || isServerSide()) {
		return (
			<div>
				<FormattedMessage
					id="container-version__loading"
					defaultMessage="Loading..."
				/>
			</div>
		);
	}

	if (!version || !book || !chapters || !chapter) {
		return (
			<div>
				<FormattedMessage
					id="container-version__notFound"
					defaultMessage="Chapter not found"
				/>
			</div>
		);
	}

	if (version?.description) {
		details.push({
			term: (
				<FormattedMessage
					id="bibleVersion__description"
					defaultMessage="Description"
				/>
			),
			definition: <p>{version.description}</p>,
		});
	}

	if (version?.sponsor) {
		details.push({
			term: (
				<FormattedMessage
					id="bibleVersion__sponsorLabel"
					defaultMessage="Sponsor"
				/>
			),
			definition: (
				<p>
					{version.sponsor.website ? (
						<a
							href={version.sponsor.website}
							target="_blank"
							className="decorated hover--salmon"
							rel="noreferrer"
						>
							{version.sponsor.title}
						</a>
					) : (
						version.sponsor.title
					)}
				</p>
			),
		});
	}

	return (
		<Tease>
			<BibleVersionTophat
				version={version}
				versions={versions}
				label={book.title}
				getVersionUrl={(v: BibleVersionTophatFragment) =>
					root
						.lang(languageRoute)
						.bibles.versionId(v.id)
						.fcbhId(book.id.toString())
						.chapterNumber(currentChapterNumber)
						.get({ params: { autoplay: 'true' } })
				}
				hatUrl={root.lang(languageRoute).bibles.versionId(version.id).get()}
				bookName={book.title}
				chapterNumber={currentChapterNumber}
			/>
			<div className={styles.content}>
				<div className={styles.main}>
					<Heading1>{chapter?.title}</Heading1>
					<div className={styles.sequenceNav}>
						<SequenceNav recording={chapter} useInverse={false} />
					</div>
					<Player
						recording={chapter}
						playlistRecordings={chapters.slice(
							chapters.findIndex((_c) => _c.id === chapter?.id),
						)}
						backgroundColor={BaseColors.BIBLE_B}
						disableUserFeatures={shouldAllowDownload}
					/>
					<div className={styles.definitions}>
						<DefinitionList terms={details} textColor={BaseColors.DARK} />
					</div>
					{isFcbhVersion && (
						<div className={styles.disclaimer}>
							<FormattedMessage
								id="bibleChapter__disclaimer"
								defaultMessage="The terms and conditions governing the use of audio Bibles from Faith Comes By Hearing prevents the option to download and the integration of certain features on our platform."
							/>
						</div>
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
								id="bibleChapter__chapterListTitle"
								defaultMessage="Other Chapters in Book"
							/>
						</LineHeading>

						<div className={styles.chaptersItems}>
							{chapters.map((chapter) => {
								const number = parseChapterNumber(chapter.title);
								return (
									<div
										className={styles.item}
										key={chapter.id}
										ref={
											number === currentChapterNumber ? currentRef : undefined
										}
									>
										<TeaseRecording
											recording={{
												...chapter,
												recordingContentType: RecordingContentType.BibleChapter,
												sequenceIndex: null,
												speakers: [],
												canonicalPath: root
													.lang(languageRoute)
													.bibles.versionId(version.id)
													.fcbhId(book.id.toString())
													.chapterNumber(number)
													.get({
														params: {
															autoplay: 'true',
														},
													}),
											}}
											playlistRecordings={chapters.slice(
												chapters.findIndex((c) => c.id === chapter.id),
											)}
											theme="chapter"
											unpadded
											disableUserFeatures={isFcbhVersion}
										/>
									</div>
								);
							})}
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
};

const WithFailStates = (props: ChapterProps) => (
	<AndFailStates Component={Chapter} componentProps={props} />
);

export default WithFailStates;
