import clsx from 'clsx';
import startCase from 'lodash/startCase';
import Head from 'next/head';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading1 from '~components/atoms/heading1';
import Heading6 from '~components/atoms/heading6';
import HorizontalRule from '~components/atoms/horizontalRule';
import LineHeading from '~components/atoms/lineHeading';
import Link from '~components/atoms/linkWithoutPrefetch';
import { TeaseRecordingFragment } from '~components/molecules/__generated__/teaseRecording';
import BibleVersionTypeLockup from '~components/molecules/bibleVersionTypeLockup';
import Button from '~components/molecules/button';
import CopyrightInfo from '~components/molecules/copyrightInfo';
import DefinitionList, {
	IDefinitionListTerm,
} from '~components/molecules/definitionList';
import MediaFormatSwitcher from '~components/molecules/mediaFormatSwitcher';
import PersonLockup from '~components/molecules/personLockup';
import Player from '~components/molecules/player';
import SequenceNav from '~components/molecules/sequenceNav';
import SequenceTypeLockup from '~components/molecules/sequenceTypeLockup';
import Tease from '~components/molecules/tease';
import TeaseRecording from '~components/molecules/teaseRecording';
import Transcript from '~components/molecules/transcript';
import { formatLongDateTime, parseRelativeDate } from '~lib/date';
import { getRecordingTypeTheme } from '~lib/getRecordingTheme';
import root from '~lib/routes';
import IconBack from '~public/img/icons/icon-back-light.svg';
import IconBlogLight from '~public/img/icons/icon-blog-light-small.svg';
import IconDisclosure from '~public/img/icons/icon-disclosure-light-small.svg';
import IconDownload from '~public/img/icons/icon-download.svg';
import {
	RecordingContentType,
	SequenceContentType,
} from '~src/__generated__/graphql';
import useLanguageRoute from '~src/lib/hooks/useLanguageRoute';

import { analytics } from '../../lib/analytics';
import PlaylistTypeLockup from '../molecules/playlistTypeLockup';
import { RecordingFragment } from './__generated__/recording';
import styles from './recording.module.scss';

interface RecordingProps {
	recording: RecordingFragment;
	overrideSequence?: {
		playlistId?: string | number;
		publicPlaylist?: boolean;
		title: string;
		items: TeaseRecordingFragment[];
	};
}

export function Recording({
	recording,
	overrideSequence,
}: RecordingProps): JSX.Element {
	const intl = useIntl();
	const { id, imageWithFallback, contentType, sponsor, speakers, writers } =
		recording;
	return (
		<Tease className={clsx(styles.base, styles[contentType])}>
			<Head>
				<meta
					name="apple-itunes-app"
					content={`app-id=726998810, app-argument=avorg://recordings?id=${id}`}
				/>
				<link href={imageWithFallback.url} rel="image_src" />
				<meta property="og:title" content={recording.title} />
				<meta
					property="og:description"
					content={
						{
							[RecordingContentType.AudiobookTrack]: intl.formatMessage(
								{
									id: 'sermonDetailPage__openGraphDescription_audiobook',
									defaultMessage: 'Audiobook provided by {sponsorName}',
								},
								{
									sponsorName: sponsor?.title || '',
								},
							),
							[RecordingContentType.BibleChapter]: intl.formatMessage(
								{
									id: 'sermonDetailPage__openGraphDescription_bibleChapter',
									defaultMessage: 'Bible Chapter provided by {sponsorName}',
								},
								{
									sponsorName: sponsor?.title || '',
								},
							),
							[RecordingContentType.MusicTrack]: intl.formatMessage(
								{
									id: 'sermonDetailPage__openGraphDescription_music',
									defaultMessage: 'Music by {speakerName}',
								},
								{
									speakerName: speakers.map(({ name }) => name).join(','),
								},
							),
							[RecordingContentType.Sermon]: intl.formatMessage(
								{
									id: 'sermonDetailPage__openGraphDescription_sermon',
									defaultMessage: 'Teaching by {speakerName}',
								},
								{
									speakerName: speakers.map(({ name }) => name).join(','),
								},
							),
							[RecordingContentType.Story]: intl.formatMessage(
								{
									id: 'sermonDetailPage__openGraphDescription_story',
									defaultMessage: 'Story by {writerName}',
								},
								{
									writerName: writers.map(({ name }) => name).join(','),
								},
							),
						}[contentType]
					}
				/>
				<meta property="og:image" content={imageWithFallback.url} />
			</Head>

			<RecordingInner
				recording={recording}
				overrideSequence={overrideSequence}
			/>
		</Tease>
	);
}

function RecordingInner({
	recording,
	overrideSequence,
}: RecordingProps): JSX.Element {
	const intl = useIntl();
	const {
		contentType,
		collection,
		description,
		recordingDate,
		sequence,
		sequenceIndex,
		sponsor,
		title,
		transcript,
		speakers,
		writers,
		attachments,
	} = recording;
	const scrollRef = useRef<HTMLDivElement>(null);
	const currentRef = useRef<HTMLLIElement>(null);
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
	}, [recording.id]);
	const languageRoute = useLanguageRoute();
	const [isShowingTranscript, setIsShowingTranscript] =
		useState<boolean>(false);

	const isAudiobook = contentType === RecordingContentType.AudiobookTrack;
	const isBibleChapter = contentType === RecordingContentType.BibleChapter;
	const persons = isAudiobook ? writers : speakers;
	const recordingDateString =
		recordingDate && !isBibleChapter
			? formatLongDateTime(parseRelativeDate(recordingDate) || '')
			: undefined;
	const index = sequenceIndex;
	const items = overrideSequence
		? overrideSequence.items
		: sequence?.recordings?.nodes;

	const {
		accentColor,
		backgroundColor,
		textColor,
		textSecondaryColor,
		textRuleColor,
		theme,
		useInverseButtons,
	} = getRecordingTypeTheme(contentType);
	const audiobookHeadingStyle = isAudiobook && styles.audiobookHeading;
	const linkClass = `decorated${useInverseButtons ? ' hover--salmon' : ''}`;

	const details: IDefinitionListTerm[] = [];
	if (description) {
		details.push({
			term: (
				<FormattedMessage
					id="sermonDetailPage__descriptionTitle"
					defaultMessage="Description"
					description="Sermon detail description title"
				/>
			),
			definition: <div dangerouslySetInnerHTML={{ __html: description }} />,
		});
	}
	if (sequence && !isBibleChapter) {
		details.push({
			term: (
				<FormattedMessage
					id="organism-recording__seriesInfoTitle"
					defaultMessage="Parent Series"
					description="Recording series info title"
				/>
			),
			definition: (
				<p>
					<Link href={sequence.canonicalPath} legacyBehavior>
						<a className={linkClass}>{sequence.title}</a>
					</Link>
				</p>
			),
		});
	}
	if (collection) {
		details.push({
			term: isBibleChapter ? (
				<FormattedMessage
					id="organism-recording__collectionInfoTitle"
					defaultMessage="Parent Bible"
				/>
			) : (
				<FormattedMessage
					id="organism-recording__conferenceInfoTitle"
					defaultMessage="Parent Conference"
					description="Recording conference info title"
				/>
			),
			definition: (
				<p>
					<Link href={collection.canonicalPath} legacyBehavior>
						<a className={linkClass}>{collection.title}</a>
					</Link>
				</p>
			),
		});
	}
	if (sponsor) {
		details.push({
			term: (
				<FormattedMessage
					id="organism-recording__sponsorInfoTitle"
					defaultMessage="Sponsor"
					description="recording sponsor info title"
				/>
			),
			definition: (
				<p>
					<Link href={sponsor.canonicalPath} legacyBehavior>
						<a className={linkClass}>{sponsor.title}</a>
					</Link>
				</p>
			),
		});
	}
	if (recordingDateString) {
		details.push({
			term: (
				<FormattedMessage
					id="sermonDetailPage__recordedTitle"
					defaultMessage="Recorded"
					description="Sermon detail recorded date title"
				/>
			),
			definition: <p>{recordingDateString}</p>,
		});
	}
	if (attachments.length) {
		details.push({
			term: (
				<FormattedMessage
					id="sermonDetailPage__attachments"
					defaultMessage="Attachments"
					description="Sermon detail attachments label"
				/>
			),
			definition: (
				<div>
					{attachments.map(({ filename, url }) => (
						<a
							href={url}
							target="_blank"
							className={styles.attachment}
							key={url}
							rel="noreferrer"
							onClick={() => {
								analytics.track('Attachment click', {
									recording: recording.title,
									attachment: filename,
								});
							}}
							download
						>
							{filename}
							<div className={styles.attachmentIcon}>
								<IconDownload />
							</div>
						</a>
					))}
				</div>
			),
		});
	}

	const playlistRecordings =
		overrideSequence && overrideSequence
			? overrideSequence.items
			: contentType !== RecordingContentType.Sermon
				? recording.sequence?.recordings.nodes
				: undefined;

	const makeHat = (typeLockup: ReactElement, title: string, href: string) => (
		<Link href={href} legacyBehavior>
			<a className={styles.hat}>
				{typeLockup}
				<h4 className={clsx(audiobookHeadingStyle)}>{title}</h4>
			</a>
		</Link>
	);

	return (
		<>
			{isBibleChapter && recording.collection ? (
				<Link href={recording.collection.canonicalPath} legacyBehavior>
					<a className={styles.hat}>
						<BibleVersionTypeLockup
							label={recording.collection.title}
							unpadded
						/>
						<h4>{recording.sequence?.title}</h4>
					</a>
				</Link>
			) : overrideSequence && overrideSequence.playlistId ? (
				makeHat(
					<PlaylistTypeLockup unpadded />,
					startCase(overrideSequence.title),
					overrideSequence.publicPlaylist
						? root
								.lang(languageRoute)
								.playlists.playlist(overrideSequence.playlistId)
								.get()
						: root
								.lang(languageRoute)
								.library.playlists(overrideSequence.playlistId)
								.get(),
				)
			) : overrideSequence ? (
				makeHat(
					<SequenceTypeLockup
						contentType={SequenceContentType.MusicAlbum}
						unpadded
					/>,
					startCase(overrideSequence.title),
					root.lang(languageRoute).songs.book(overrideSequence.title).get(),
				)
			) : (
				recording.sequence &&
				makeHat(
					<SequenceTypeLockup
						contentType={recording.sequence.contentType}
						unpadded
					/>,
					recording.sequence.title,
					recording.sequence.canonicalPath,
				)
			)}
			<div className={styles.content}>
				<div className={styles.main}>
					{isBibleChapter && isShowingTranscript && transcript ? (
						<>
							<Button
								type="secondary"
								text={
									<FormattedMessage
										id="organism-recording__backToChapterInfo"
										defaultMessage="Back to Chapter Info"
									/>
								}
								IconLeft={IconBack}
								onClick={() => setIsShowingTranscript(false)}
								className={styles.backToChapterButton}
							/>
							<Heading1>{title}</Heading1>
							<Transcript
								recordingContentType={contentType}
								text={transcript.text}
							/>
						</>
					) : (
						<>
							<div className={styles.meta}>
								{index && !overrideSequence && !isBibleChapter && (
									<span className={styles.part}>
										<FormattedMessage
											id="organism-recording__partInfo"
											defaultMessage="Part {index}"
											description="recording part info"
											values={{ index }}
										/>
									</span>
								)}
								<Heading1 className={clsx(audiobookHeadingStyle)}>
									{title}
								</Heading1>
								{!isBibleChapter && (
									<ul className={styles.speakers}>
										{persons.map((speaker) => (
											<li key={speaker.canonicalPath}>
												<PersonLockup
													person={speaker}
													textColor={textSecondaryColor}
													hoverColor={accentColor}
													isLinked
												/>
											</li>
										))}
									</ul>
								)}
								{(isAudiobook || isBibleChapter) && !!speakers.length && (
									<Heading6
										loose
										sans
										uppercase
										className={clsx(isBibleChapter && styles.bibleReadBy)}
									>
										<FormattedMessage
											id="organism-recording__readByLabel"
											defaultMessage="Read by {name}"
											values={{
												name: speakers[0].name,
											}}
										/>
									</Heading6>
								)}
							</div>

							<MediaFormatSwitcher recording={recording} />
							<SequenceNav
								recording={recording}
								useInverse={useInverseButtons}
							/>
							<Player
								{...{
									recording,
									playlistRecordings: playlistRecordings || undefined,
									backgroundColor,
								}}
							/>

							<HorizontalRule color={textRuleColor} />

							<div
								aria-label={intl.formatMessage({
									id: 'organism-recording__metadataLabel',
									defaultMessage: 'metadata',
									description: 'recording metadata section label',
								})}
							>
								<DefinitionList terms={details} textColor={textColor} />

								{transcript?.text &&
									(isBibleChapter ? (
										<Button
											type="secondary"
											onClick={() =>
												setIsShowingTranscript(!isShowingTranscript)
											}
											text={
												<FormattedMessage
													id="organism-recording__readAlongLabel"
													defaultMessage="Read Along"
												/>
											}
											IconLeft={IconBlogLight}
										/>
									) : contentType !== RecordingContentType.AudiobookTrack &&
									  contentType !== RecordingContentType.MusicTrack ? (
										<div
											className={clsx(
												styles.transcriptWrapper,
												isShowingTranscript && styles.transcriptOpen,
											)}
										>
											<Button
												type={
													useInverseButtons ? 'secondaryInverse' : 'secondary'
												}
												onClick={() =>
													setIsShowingTranscript(!isShowingTranscript)
												}
												text={
													isShowingTranscript ? (
														<FormattedMessage
															id="molecule-transcript__labelClose"
															defaultMessage="Hide Transcript"
															description="transcript button label close"
														/>
													) : (
														<FormattedMessage
															id="molecule-transcript__labelOpen"
															defaultMessage="Read Transcript"
															description="transcript button label open"
														/>
													)
												}
												IconLeft={IconDisclosure}
											/>
											{isShowingTranscript && (
												<Transcript
													recordingContentType={contentType}
													text={transcript.text}
												/>
											)}
										</div>
									) : null)}

								<HorizontalRule color={textRuleColor} />

								<CopyrightInfo
									recording={recording}
									useInverse={useInverseButtons}
								/>
							</div>
						</>
					)}
				</div>

				{items?.length && (
					<div
						className={styles.series}
						aria-label={intl.formatMessage({
							id: 'organism-recording__seriesListLabel',
							defaultMessage: 'series list',
							description: 'recording series list label',
						})}
					>
						<div className={styles.seriesScroller} ref={scrollRef}>
							<div>
								<LineHeading
									small
									color={accentColor}
									className={styles.seriesHeading}
								>
									{contentType === RecordingContentType.MusicTrack ? (
										<FormattedMessage
											id="organism-recording__albumListTitle"
											defaultMessage="Other Songs in Album"
										/>
									) : overrideSequence?.playlistId ? (
										<FormattedMessage
											id="organism-recording__playlistTitle"
											defaultMessage="Other items in Playlist"
										/>
									) : (
										<FormattedMessage
											id="organism-recording__seriesListTitle"
											defaultMessage="Other Teachings in Series"
											description="recording series list title"
										/>
									)}
								</LineHeading>

								<ol className={styles.seriesItems}>
									{items.map((r) => (
										<li
											className={styles.item}
											key={r.id}
											ref={r.id === recording.id ? currentRef : undefined}
										>
											<TeaseRecording
												recording={r}
												playlistRecordings={playlistRecordings || undefined}
												theme={theme}
												unpadded
											/>
										</li>
									))}
								</ol>
							</div>
						</div>
						<div
							className={styles.topOverflowShadow}
							style={{ opacity: Math.min(1, scrollPosition / 100) }}
						/>
						<div
							className={styles.bottomOverflowShadow}
							style={{
								opacity: Math.min(
									1,
									(scrollRef.current?.scrollTop || 0) - scrollPosition / 100,
								),
							}}
						/>
					</div>
				)}
			</div>
		</>
	);
}
