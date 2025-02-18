import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Heading1 from '~components/atoms/heading1';
import LineHeading from '~components/atoms/lineHeading';
import Link from '~components/atoms/linkWithoutPrefetch';
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
import BibleVersionTypeLockup from '~src/components/molecules/bibleVersionTypeLockup';
import AndFailStates from '~src/components/templates/andFailStates';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';
import { parseChapterNumber } from '~src/services/bibles/utils';
import { Must } from '~src/types/types';

import {
	BibleBookDetailBookFragment,
	BibleBookDetailChapterFullFragment,
	BibleBookDetailChapterPartialFragment,
	BibleBookDetailVersionFragment,
} from './__generated__/book';
import styles from './book.module.scss';

export interface BookProps {
	version: BibleBookDetailVersionFragment;
	book: BibleBookDetailBookFragment;
	chapters: BibleBookDetailChapterPartialFragment[];
	chapter: BibleBookDetailChapterFullFragment;
}

const Book = ({ version, book, chapters, chapter }: Must<BookProps>) => {
	const c = chapter;
	const { id, description, sponsor } = version;
	const languageRoute = useLanguageRoute();
	const currentChapterNumber = parseChapterNumber(c.title);
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
			<Link
				href={root.lang(languageRoute).bibles.versionId(id).get()}
				legacyBehavior
			>
				<a className={styles.hat}>
					<BibleVersionTypeLockup unpadded={true} label={version.title} />
					<h4>{book.title}</h4>
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
								disableUserFeatures
							/>
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
											disableUserFeatures
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

const WithFailStates = (props: Parameters<typeof Book>[0]) => (
	<AndFailStates
		Component={Book}
		componentProps={props}
		options={{ should404: (props: BookProps) => !props.chapter }}
	/>
);
export default WithFailStates;
