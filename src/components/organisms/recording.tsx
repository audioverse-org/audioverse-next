import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import LineHeading from '@components/atoms/lineHeading';
import CopyrightInfo from '@components/molecules/copyrightInfo';
import MediaFormatSwitcher from '@components/molecules/mediaFormatSwitcher';
import Player from '@components/molecules/player';
import SequenceNav from '@components/molecules/sequenceNav';
import SpeakerName from '@components/molecules/speakerName';
import SponsorInfo from '@components/molecules/sponsorInfo';
import TeaseRecording from '@components/molecules/teaseRecording';
import Transcript from '@components/molecules/transcript';
import { RecordingFragment } from '@lib/generated/graphql';
import { makeCollectionRoute, makeSeriesDetailRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import ListIcon from '../../../public/img/icon-list-alt-solid.svg';

import styles from './recording.module.scss';

interface RecordingProps {
	recording: RecordingFragment;
}

export function Recording({ recording }: RecordingProps): JSX.Element {
	const langRoute = useLanguageRoute();
	const intl = useIntl();
	const speakers = recording?.persons || [];
	const { sponsor } = recording;
	const recordingDateString = new Date(
		recording.recordingDate || ''
	).toLocaleString([], {
		hour: 'numeric',
		minute: 'numeric',
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
	const index = recording.sequenceIndex;
	const seriesItems = recording?.sequence?.recordings?.nodes;
	const seriesDetailRoute = recording.sequence
		? makeSeriesDetailRoute(langRoute, recording.sequence.id)
		: '';

	return (
		<div className={styles.base}>
			{/*TODO: use next/link for sequence link*/}
			{recording?.sequence && (
				<a href={seriesDetailRoute} className={styles.hat}>
					<div className={styles.hatType}>
						<ListIcon width={13} height={13} />
						<FormattedMessage
							id="sermonDetailPage__seriesTitle"
							defaultMessage="Series"
							description="Sermon detail series title"
						/>
					</div>
					<h4>{recording?.sequence?.title}</h4>
				</a>
			)}
			<div className={styles.content}>
				<div>
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
						<h1>{recording.title}</h1>
						<ul className={styles.speakers}>
							{speakers.map((speaker) => (
								<li key={speaker.id}>
									<SpeakerName person={speaker} />
								</li>
							))}
						</ul>
					</div>

					<MediaFormatSwitcher recording={recording} />
					<SequenceNav recording={recording} />
					<Player recording={recording} />

					<div
						aria-label={intl.formatMessage({
							id: 'organism-recording__metadataLabel',
							defaultMessage: 'metadata',
							description: 'recording metadata section label',
						})}
					>
						{recording.description && (
							<>
								<h6>
									<FormattedMessage
										id="sermonDetailPage__descriptionTitle"
										defaultMessage="Description"
										description="Sermon detail description title"
									/>
								</h6>
								<div
									dangerouslySetInnerHTML={{ __html: recording.description }}
								/>
							</>
						)}

						{recording.sequence && (
							<>
								<h6>
									<FormattedMessage
										id="organism-recording__seriesInfoTitle"
										defaultMessage="Parent Series"
										description="Recording series info title"
									/>
								</h6>
								<p>
									<Link href={seriesDetailRoute}>
										<a>{recording.sequence.title}</a>
									</Link>
								</p>
							</>
						)}

						{recording.collection && (
							<>
								<h6>
									<FormattedMessage
										id="organism-recording__conferenceInfoTitle"
										defaultMessage="Parent Conference"
										description="Recording conference info title"
									/>
								</h6>
								<p>
									<Link
										href={makeCollectionRoute(
											langRoute,
											recording.collection.id
										)}
									>
										<a>{recording.collection.title}</a>
									</Link>
								</p>
							</>
						)}

						{sponsor && (
							<>
								<h6>
									<FormattedMessage
										id="organism-recording__sponsorInfoTitle"
										defaultMessage="Sponsor"
										description="recording sponsor info title"
									/>
								</h6>
								<SponsorInfo sponsor={sponsor} />
							</>
						)}

						{recording.recordingDate ? (
							<>
								<h6>
									<FormattedMessage
										id="sermonDetailPage__recordedTitle"
										defaultMessage="Recorded"
										description="Sermon detail recorded date title"
									/>
								</h6>
								<p>{recordingDateString}</p>
							</>
						) : null}

						{recording.transcript?.text && (
							<Transcript text={recording.transcript.text} />
						)}

						<CopyrightInfo recording={recording} />
					</div>
				</div>

				{/*TODO: use ul > li*/}

				{seriesItems && (
					<div
						className={styles.series}
						aria-label={intl.formatMessage({
							id: 'organism-recording__seriesListLabel',
							defaultMessage: 'series list',
							description: 'recording series list label',
						})}
					>
						<LineHeading size={12}>
							<FormattedMessage
								id={'organism-recording__seriesListTitle'}
								defaultMessage={'Other Teachings in Series'}
								description={'recording series list title'}
							/>
						</LineHeading>
						{seriesItems.map((r) => (
							<div className={styles.item} key={r.id}>
								<TeaseRecording recording={r} />
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
