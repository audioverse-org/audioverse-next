import Link from 'next/link';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BaseColors } from '@components/atoms/baseColors';
import LineHeading from '@components/atoms/lineHeading';
import CopyrightInfo from '@components/molecules/copyrightInfo';
import DefinitionList, {
	IDefinitionListTerm,
} from '@components/molecules/definitionList';
import MediaFormatSwitcher from '@components/molecules/mediaFormatSwitcher';
import PersonLockup from '@components/molecules/personLockup';
import Player from '@components/molecules/player';
import SequenceNav from '@components/molecules/sequenceNav';
import SponsorInfo from '@components/molecules/sponsorInfo';
import Tease from '@components/molecules/tease';
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
	const {
		collection,
		description,
		recordingDate,
		sequence,
		sequenceIndex,
		sponsor,
		title,
		transcript,
	} = recording;
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
						<a className="decorated">{sequence.title}</a>
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
						<a className="decorated">{collection.title}</a>
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
			definition: <SponsorInfo sponsor={sponsor} />,
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
		<Tease className={styles.base}>
			{recording?.sequence && (
				<Link href={recording.sequence.canonicalPath}>
					<a className={styles.hat}>
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
						<h1>{title}</h1>
						<ul className={styles.speakers}>
							{speakers.map((speaker) => (
								<li key={speaker.canonicalPath}>
									<PersonLockup
										person={speaker}
										textColor={BaseColors.DARK}
										hoverColor={BaseColors.RED}
										isLinked
									/>
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
						<DefinitionList terms={details} textColor={BaseColors.DARK} />

						{transcript?.text && <Transcript text={transcript.text} />}

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
						<LineHeading small>
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
										theme={'sermon'} // TODO: fix this
										hideSpeakers
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
