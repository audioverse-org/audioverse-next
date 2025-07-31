import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '~components/atoms/heading1';
import BibleVersionTophat from '~components/molecules/bibleVersionTophat';
import { BibleVersionTophatFragment } from '~components/molecules/bibleVersionTophat/__generated__';
import Button from '~components/molecules/button';
import ContentWidthLimiter from '~components/molecules/contentWidthLimiter';
import DefinitionList, {
	IDefinitionListTerm,
} from '~components/molecules/definitionList';
import MiniNav from '~components/molecules/mininav';
import Player from '~components/molecules/player';
import SequenceNav from '~components/molecules/sequenceNav';
import Tease from '~components/molecules/tease';
import TeaseRecording from '~components/molecules/teaseRecording';
import { BaseColors } from '~lib/constants';
import root from '~lib/routes';
import IconBack from '~public/img/icons/icon-back-light.svg';
import IconBlog from '~public/img/icons/icon-blog-light-small.svg';
import { RecordingContentType } from '~src/__generated__/graphql';
import HorizontalRule from '~src/components/atoms/horizontalRule';
import AndFailStates from '~src/components/templates/andFailStates';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';
import isServerSide from '~src/lib/isServerSide';
import { FCBH_VERSIONS } from '~src/services/bibles/constants';
import { parseChapterNumber } from '~src/services/bibles/utils';
import { gtmPushEvent, gtmPushRecordingView } from '~src/services/gtm';

import styles from './index.module.scss';
import { useChapterData } from './useChapterData';

export interface ChapterProps {
	versionId: string;
	bookId: string;
	chapterNumber: number;
}

function useShouldAllowDownload(
	versionId: string | number | undefined,
): boolean {
	if (!versionId) return false;

	const id = versionId.toString();
	const isWeb = id === '538';
	const isKjvAv = id === '552';

	return isWeb || isKjvAv;
}

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
	const router = useRouter();
	const [showingText, setShowingText] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);
	const currentRef = useRef<HTMLDivElement>(null);
	const hasNavigatedBack = useRef(false);
	const isFcbhVersion = FCBH_VERSIONS.some((v) => v.id === version?.id);
	const allowDownload = useShouldAllowDownload(version?.id);
	const [currentTab, setCurrentTab] = useState('chapters');

	useEffect(() => {
		if (!chapter) return;
		gtmPushRecordingView(chapter);
	}, [chapter]);

	const details: IDefinitionListTerm[] = [];

	const handlBackForInvalid = (missingItem: string) => {
		if (hasNavigatedBack.current) return;
		hasNavigatedBack.current = true;
		window.alert(`${missingItem} not available in selected version.`);

		// Check if there's a valid history entry in the current domain else navigate to discover pag
		if (
			window.history.length > 1 &&
			document.referrer &&
			document.referrer.includes(window.location.hostname)
		) {
			window.history.back();
		} else {
			router.push(root.lang(languageRoute).bibles.get());
		}
	};

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

	if (!version) {
		handlBackForInvalid('Version');
		return <div />;
	}

	if (!book) {
		handlBackForInvalid('Book');
		return <div />;
	}

	if (!chapters) {
		handlBackForInvalid('Chapters');
		return <div />;
	}

	if (!chapter) {
		handlBackForInvalid('Chapter');
		return <div />;
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
						.chapterNumber(chapterNumber)
						.get({ params: { autoplay: 'true' } })
				}
				hatUrl={root
					.lang(languageRoute)
					.bibles.versionId(version.id)
					.versionTitle(version.title)
					.get()}
				bookName={book.title}
				chapterNumber={chapterNumber}
			/>
			<div className={styles.content}>
				<div className={styles.main}>
					{showingText ? (
						<>
							<Button
								type="secondary"
								text={
									<FormattedMessage
										id="bibleChapter__backToChapter"
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
									dangerouslySetInnerHTML={{
										__html: chapter?.transcript?.text || '',
									}}
								/>
							</ContentWidthLimiter>
						</>
					) : (
						<>
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
								disableUserFeatures={isFcbhVersion}
								disableDownload={!allowDownload}
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
							{chapter.transcript && (
								<div className={styles.readAlong}>
									<Button
										type="secondary"
										text={
											<FormattedMessage
												id="bibleChapter__readAlong"
												defaultMessage="Read Along"
											/>
										}
										IconLeft={IconBlog}
										onClick={() => setShowingText(!showingText)}
									/>
								</div>
							)}
						</>
					)}
				</div>

				<div className={styles.chapters}>
					<div className={styles.chaptersScroller} ref={scrollRef}>
						{/* Show two tabs chapters and Sermons */}
						<div className={styles.chapterHeadingTabbed}>
							<MiniNav
								items={[
									{
										id: 'chapters',
										label: 'Chapters',
										isActive: currentTab === 'chapters',
										onClick: () => {
											setCurrentTab('chapters');
										},
									},
									{
										id: 'related',
										label: 'Related',
										isActive: currentTab === 'related',
										onClick: () => {
											setCurrentTab('related');
										},
									},
								]}
							/>
						</div>
						{currentTab === 'chapters' ? (
							<>
								<div className={styles.chaptersItems}>
									{chapters.map((chapter) => {
										const number = parseChapterNumber(chapter.title);
										return (
											<div
												className={styles.item}
												key={chapter.id}
												ref={number === chapterNumber ? currentRef : undefined}
											>
												<TeaseRecording
													recording={{
														...chapter,
														recordingContentType:
															RecordingContentType.BibleChapter,
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
							</>
						) : (
							<>
								<ol className={styles.recordingItem}>
									{chapter.relatedList?.related?.map((r) => (
										<li className={styles.chaptersItems} key={r.id}>
											<HorizontalRule color={BaseColors.LIGHT_TONE} />
											<div
												onClick={() => {
													gtmPushEvent('navigate', {
														navigation_type: 'bible_related',
														from_id: chapter.id,
														to_id: r.id,
														from_content_type:
															RecordingContentType.BibleChapter,
														to_content_type: r.recordingContentType,
														from_title: version.title,
														to_title: r.title,
													});
												}}
											>
												<TeaseRecording recording={r} theme="sermon" unpadded />
											</div>
										</li>
									))}
								</ol>
							</>
						)}
					</div>
				</div>
			</div>
		</Tease>
	);
};

const WithFailStates = (props: ChapterProps) => (
	<AndFailStates Component={Chapter} componentProps={props} />
);

export default WithFailStates;
