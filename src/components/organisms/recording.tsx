import clsx from 'clsx';
import startCase from 'lodash/startCase';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading1 from '@components/atoms/heading1';
import Heading6 from '@components/atoms/heading6';
import HorizontalRule from '@components/atoms/horizontalRule';
import LineHeading from '@components/atoms/lineHeading';
import CopyrightInfo from '@components/molecules/copyrightInfo';
import DefinitionList, {
	IDefinitionListTerm,
} from '@components/molecules/definitionList';
import MediaFormatSwitcher from '@components/molecules/mediaFormatSwitcher';
import PersonLockup from '@components/molecules/personLockup';
import Player from '@components/molecules/player';
import SequenceNav from '@components/molecules/sequenceNav';
import SequenceTypeLockup from '@components/molecules/sequenceTypeLockup';
import Tease from '@components/molecules/tease';
import TeaseRecording from '@components/molecules/teaseRecording';
import Transcript from '@components/molecules/transcript';
import { formatLongDateTime, parseRelativeDate } from '@lib/date';
import type {
	RecordingFragment,
	TeaseRecordingFragment,
} from '@lib/generated/graphql';
import {
	RecordingContentType,
	SequenceContentType,
} from '@lib/generated/graphql';
import { getRecordingTypeTheme } from '@lib/getRecordingTheme';
import { makeBibleMusicRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import IconDownload from '../../../public/img/icon-download.svg';

import styles from './recording.module.scss';

interface RecordingProps {
	recording: RecordingFragment;
	overrideSequence?: {
		book: string;
		seriesItems: TeaseRecordingFragment[];
	};
}

export function Recording({
	recording,
	overrideSequence,
}: RecordingProps): JSX.Element {
	const intl = useIntl();
	const {
		id,
		contentType,
		collection,
		description,
		imageWithFallback,
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

	const isAudiobook = contentType === RecordingContentType.AudiobookTrack;
	const persons = isAudiobook ? writers : speakers;
	const recordingDateString = recordingDate
		? formatLongDateTime(parseRelativeDate(recordingDate) || '')
		: undefined;
	const index = sequenceIndex;
	const seriesItems = overrideSequence
		? overrideSequence.seriesItems
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
	if (sequence) {
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
					<Link href={sequence.canonicalPath}>
						<a className={linkClass}>{sequence.title}</a>
					</Link>
				</p>
			),
		});
	}
	if (collection) {
		details.push({
			term: (
				<FormattedMessage
					id="organism-recording__conferenceInfoTitle"
					defaultMessage="Parent Conference"
					description="Recording conference info title"
				/>
			),
			definition: (
				<p>
					<Link href={collection.canonicalPath}>
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
					<Link href={sponsor.canonicalPath}>
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
		isAudiobook || contentType === RecordingContentType.MusicTrack
			? recording.sequence?.recordings.nodes
			: undefined;

	const makeHat = (
		sequenceContentType: SequenceContentType,
		title: string,
		href: string
	) => (
		<Link href={href}>
			<a className={styles.hat}>
				<SequenceTypeLockup contentType={sequenceContentType} unpadded />
				<h4 className={clsx(audiobookHeadingStyle)}>{title}</h4>
			</a>
		</Link>
	);

	return (
		<Tease className={clsx(styles.base, styles[contentType])}>
			<Head>
				<meta
					name="apple-itunes-app"
					content={`app-id=726998810, app-argument=avorg://recordings?id=${id}`}
				/>
				<link href={imageWithFallback.url} rel="image_src" />
			</Head>
			{overrideSequence
				? makeHat(
						SequenceContentType.MusicAlbum,
						startCase(overrideSequence.book),
						makeBibleMusicRoute(languageRoute, overrideSequence.book)
				  )
				: recording.sequence &&
				  makeHat(
						recording.sequence.contentType,
						recording.sequence.title,
						recording.sequence.canonicalPath
				  )}
			<div className={styles.content}>
				<div className={styles.main}>
					<div className={styles.meta}>
						{index && !overrideSequence && (
							<span className={styles.part}>
								<FormattedMessage
									id="organism-recording__partInfo"
									defaultMessage="Part {index}"
									description="recording part info"
									values={{ index }}
								/>
							</span>
						)}
						<Heading1 className={clsx(audiobookHeadingStyle)}>{title}</Heading1>
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
						{isAudiobook && !!speakers.length && (
							<Heading6 loose sans uppercase>
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
					<SequenceNav recording={recording} useInverse={useInverseButtons} />
					<Player
						{...{
							recording,
							playlistRecordings: playlistRecordings?.slice(
								Math.max((recording.sequenceIndex || 0) - 1, 0)
							),
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

						{transcript?.text && (
							<Transcript
								text={transcript.text}
								useInverse={useInverseButtons}
							/>
						)}

						<HorizontalRule color={textRuleColor} />

						<CopyrightInfo
							recording={recording}
							useInverse={useInverseButtons}
						/>
					</div>
				</div>

				{seriesItems?.length && (
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
									) : (
										<FormattedMessage
											id="organism-recording__seriesListTitle"
											defaultMessage="Other Teachings in Series"
											description="recording series list title"
										/>
									)}
								</LineHeading>

								<ol className={styles.seriesItems}>
									{seriesItems.map((r) => (
										<li
											className={styles.item}
											key={r.id}
											ref={r.id === recording.id ? currentRef : undefined}
										>
											<TeaseRecording
												recording={r}
												playlistRecordings={playlistRecordings?.slice(
													Math.max((r.sequenceIndex || 0) - 1, 0)
												)}
												theme={theme}
												unpadded
											/>
										</li>
									))}
								</ol>
							</div>
						</div>
						<div
							className={styles.overflowShadow}
							style={{ opacity: Math.min(1, scrollPosition / 100) }}
						/>
					</div>
				)}
			</div>
		</Tease>
	);
}
