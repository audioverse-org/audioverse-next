import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BaseColors } from '@components/atoms/baseColors';
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
import Tease from '@components/molecules/tease';
import TeaseRecording from '@components/molecules/teaseRecording';
import Transcript from '@components/molecules/transcript';
import {
	RecordingContentType,
	RecordingFragment,
} from '@lib/generated/graphql';
import {
	makeCollectionRoute,
	makeSeriesDetailRoute,
	makeSponsorRoute,
} from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import ListIcon from '../../../public/img/icon-list-alt-solid.svg';

import styles from './recording.module.scss';

interface RecordingProps {
	recording: RecordingFragment;
}

export function Recording({ recording }: RecordingProps): JSX.Element {
	const langRoute = useLanguageRoute();
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
	} = recording;
	const isAudiobook = contentType === RecordingContentType.AudiobookTrack;
	const persons = isAudiobook ? writers : speakers;
	const recordingDateString = new Date(recordingDate || '').toLocaleString([], {
		hour: 'numeric',
		minute: 'numeric',
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
	const index = sequenceIndex;
	const seriesItems = sequence?.recordings?.nodes;
	const seriesDetailRoute = sequence
		? makeSeriesDetailRoute(langRoute, sequence.id)
		: '';

	const {
		accentColor,
		backgroundColor,
		textColor,
		textSecondaryColor,
		textRuleColor,
		theme,
		useInverseButtons,
	} = (
		{
			[RecordingContentType.AudiobookTrack]: {
				accentColor: BaseColors.SALMON,
				backgroundColor: BaseColors.BOOK_B,
				textColor: BaseColors.WHITE,
				textSecondaryColor: BaseColors.LIGHT_TONE,
				textRuleColor: BaseColors.BOOK_H,
				theme: 'audiobookTrack',
				useInverseButtons: true,
			},
			[RecordingContentType.MusicTrack]: {
				accentColor: BaseColors.RED,
				backgroundColor: BaseColors.SONG_B,
				textColor: BaseColors.DARK,
				textSecondaryColor: BaseColors.MID_TONE,
				textRuleColor: BaseColors.LIGHT_TONE,
				theme: 'song',
				useInverseButtons: false,
			},
			[RecordingContentType.Sermon]: {
				accentColor: BaseColors.RED,
				backgroundColor: BaseColors.WHITE,
				textColor: BaseColors.DARK,
				textSecondaryColor: BaseColors.MID_TONE,
				textRuleColor: BaseColors.CREAM,
				theme: 'sermon',
				useInverseButtons: false,
			},
			[RecordingContentType.Story]: {
				accentColor: BaseColors.SALMON,
				backgroundColor: BaseColors.STORY_B,
				textColor: BaseColors.WHITE,
				textSecondaryColor: BaseColors.LIGHT_TONE,
				textRuleColor: BaseColors.STORY_H,
				theme: 'story',
				useInverseButtons: true,
			},
		} as const
	)[contentType];
	const audiobookHeadingStyle = isAudiobook && styles.audiobookHeading;
	const hatLabel = {
		[RecordingContentType.AudiobookTrack]: (
			<FormattedMessage
				id="sermonDetailPage__audiobookTitle"
				defaultMessage="Book"
			/>
		),
		[RecordingContentType.MusicTrack]: (
			<FormattedMessage
				id="sermonDetailPage__musicTrackTitle"
				defaultMessage="Scripture Songs"
			/>
		),
		[RecordingContentType.Sermon]: (
			<FormattedMessage
				id="sermonDetailPage__seriesTitle"
				defaultMessage="Series"
			/>
		),
		[RecordingContentType.Story]: (
			<FormattedMessage
				id="sermonDetailPage__storyTitle"
				defaultMessage="Stories"
			/>
		),
	}[contentType];
	const linkClass = `decorated${useInverseButtons ? ' hover--salmon' : ''}`;
	const hideSpeakers = isAudiobook;

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
					<Link href={seriesDetailRoute}>
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
					<Link href={makeCollectionRoute(langRoute, collection.id)}>
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
					<Link href={makeSponsorRoute(langRoute, sponsor.id)}>
						<a className={linkClass}>{sponsor.title}</a>
					</Link>
				</p>
			),
		});
	}
	if (recordingDate) {
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

	return (
		<Tease className={clsx(styles.base, styles[contentType])}>
			{recording?.sequence && (
				<Link href={recording.sequence.canonicalPath}>
					<a className={styles.hat}>
						<div className={styles.hatType}>
							<ListIcon width={13} height={13} />
							<Heading6 sans uppercase loose unpadded>
								{hatLabel}
							</Heading6>
						</div>
						<h4 className={clsx(audiobookHeadingStyle)}>
							{recording?.sequence?.title}
						</h4>
					</a>
				</Link>
			)}
			<div className={styles.content}>
				<div className={styles.main}>
					<div className={styles.meta}>
						{index && (
							<span className={styles.part}>
								<FormattedMessage
									id={'organism-recording__partInfo'}
									defaultMessage={'Part {index}'}
									description={'recording part info'}
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
					<Player {...{ recording, backgroundColor }} />

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

						<CopyrightInfo recording={recording} />
					</div>
				</div>

				{/*TODO: use ul > li*/}

				{seriesItems?.length && (
					<div
						className={styles.series}
						aria-label={intl.formatMessage({
							id: 'organism-recording__seriesListLabel',
							defaultMessage: 'series list',
							description: 'recording series list label',
						})}
					>
						<LineHeading small color={accentColor}>
							<FormattedMessage
								id={'organism-recording__seriesListTitle'}
								defaultMessage={'Other Teachings in Series'}
								description={'recording series list title'}
							/>
						</LineHeading>

						<div className={styles.seriesItems}>
							{seriesItems.map((r) => (
								<div className={styles.item} key={r.id}>
									<TeaseRecording
										recording={r}
										theme={theme}
										hideSpeakers={hideSpeakers}
										unpadded
									/>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</Tease>
	);
}
