import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '~components/atoms/heading1';
import LineHeading from '~components/atoms/lineHeading';
import BibleVersionTophat from '~components/molecules/bibleVersionTophat';
import { BibleVersionTophatFragment } from '~components/molecules/bibleVersionTophat/__generated__';
import Button from '~components/molecules/button';
import ContentWidthLimiter from '~components/molecules/contentWidthLimiter';
import DefinitionList, {
	IDefinitionListTerm,
} from '~components/molecules/definitionList';
import Player from '~components/molecules/player';
import SequenceNav from '~components/molecules/sequenceNav';
import Tease from '~components/molecules/tease';
import TeaseRecording from '~components/molecules/teaseRecording';
import { BaseColors } from '~lib/constants';
import root from '~lib/routes';
import IconBack from '~public/img/icons/icon-back-light.svg';
import IconBlog from '~public/img/icons/icon-blog-light-small.svg';
import { RecordingContentType } from '~src/__generated__/graphql';
import AndFailStates from '~src/components/templates/andFailStates';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';
import { GetGraphqlVersionsQuery } from '~src/services/bibles/__generated__/getVersions';
import { FCBH_VERSIONS } from '~src/services/bibles/fcbh/fetchFcbhBibles';
import { parseChapterNumber } from '~src/services/bibles/utils';
import { Must } from '~src/types/types';

import {
	BibleChapterDetailBookFragment,
	BibleChapterDetailChapterFullFragment,
	BibleChapterDetailChapterPartialFragment,
	BibleChapterDetailVersionFragment,
} from './__generated__/chapter';
import styles from './chapter.module.scss';

type Version = NonNullable<
	GetGraphqlVersionsQuery['collections']['nodes']
>[0] & {
	disabled?: boolean;
};

export interface ChapterProps {
	version: BibleChapterDetailVersionFragment;
	book: BibleChapterDetailBookFragment;
	chapters: BibleChapterDetailChapterPartialFragment[];
	chapter: BibleChapterDetailChapterFullFragment;
	versions: Version[];
}

const Chapter = ({
	version,
	book,
	chapters,
	chapter,
	versions,
}: Must<ChapterProps>) => {
	const c = chapter;
	const { description, sponsor } = version;
	const languageRoute = useLanguageRoute();
	const currentChapterNumber = parseChapterNumber(c.title);
	const [showingText, setShowingText] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);
	const currentRef = useRef<HTMLDivElement>(null);
	const [scrollPosition, setScrollPosition] = useState(0);
	const isFcbhVersion = FCBH_VERSIONS.some((v) => v.id === version.id);

	const getVersionUrl = (v: BibleVersionTophatFragment) =>
		root
			.lang(languageRoute)
			.bibles.versionId(v.id)
			.bookName(book.title)
			.chapterNumber(currentChapterNumber)
			.get({ params: { autoplay: 'true' } });

	const versionDetailUrl = root
		.lang(languageRoute)
		.bibles.versionId(version.id)
		.get();

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

	if (sponsor) {
		details.push({
			term: (
				<FormattedMessage
					id="bibleVersion__sponsorLabel"
					defaultMessage="Sponsor"
				/>
			),
			definition: (
				<p>
					{sponsor.website ? (
						<a
							href={sponsor.website}
							target="_blank"
							className="decorated hover--salmon"
							rel="noreferrer"
						>
							{sponsor.title}
						</a>
					) : (
						sponsor.title
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
				getVersionUrl={getVersionUrl}
				hatUrl={versionDetailUrl}
			/>
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
							<Heading1>{c?.title}</Heading1>
							<ContentWidthLimiter>
								<div
									className={styles.chapterText}
									dangerouslySetInnerHTML={{
										__html: c?.transcript?.text || '',
									}}
								/>
							</ContentWidthLimiter>
						</>
					) : (
						<>
							<Heading1>{c?.title}</Heading1>
							<div className={styles.sequenceNav}>
								<SequenceNav recording={c} useInverse={false} />
							</div>
							<Player
								recording={c}
								playlistRecordings={chapters.slice(
									chapters.findIndex((_c) => _c.id === c?.id),
								)}
								backgroundColor={BaseColors.BIBLE_B}
								disableUserFeatures={isFcbhVersion}
							/>
							<div className={styles.definitions}>
								<DefinitionList terms={details} textColor={BaseColors.DARK} />
							</div>
							{isFcbhVersion && (
								<div className={styles.disclaimer}>
									<FormattedMessage
										id="bibleBook__disclaimer"
										defaultMessage="The terms and conditions governing the use of audio Bibles from Faith Comes By Hearing prevents the option to download and the integration of certain features on our platform."
									/>
								</div>
							)}
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
													.bookName(book.title)
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

const WithFailStates = (props: Parameters<typeof Chapter>[0]) => (
	<AndFailStates
		Component={Chapter}
		componentProps={props}
		options={{ should404: (props: ChapterProps) => !props.chapter }}
	/>
);
export default WithFailStates;
