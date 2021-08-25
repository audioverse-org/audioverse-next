import React from 'react';
import { useIntl } from 'react-intl';

import RecordingProgressBar from '@components/atoms/recordingProgressBar';
import ButtonFavorite from '@components/molecules/buttonFavorite';
import ButtonPlay from '@components/molecules/buttonPlay';
import { CardTheme } from '@components/molecules/card/base/withHat';
import SpeakerName from '@components/molecules/speakerName';
import {
	CardWithPlayableFragment,
	SpeakerNameFragment,
} from '@lib/generated/graphql';
import { useFormattedDuration } from '@lib/time';
import usePlaybackSession from '@lib/usePlaybackSession';

import CardWithHat from './withHat';
import styles from './withPlayable.module.scss';

export interface CardWithPlayableProps {
	recording: CardWithPlayableFragment;
	container?: {
		icon?: any;
		title: string;
		length?: number;
		index?: number;
	};
	title: string;
	url: string;
	persons?: SpeakerNameFragment[];
	duration?: number;
	progress?: number;
	theme?: CardTheme;
}

export default function CardWithPlayable({
	recording,
	container,
	title,
	url,
	persons = [],
	duration,
	theme,
	progress,
}: CardWithPlayableProps): JSX.Element {
	const intl = useIntl();
	const session = usePlaybackSession(recording);
	const hasPartInfo = container?.length && container?.index;
	const shouldShowProgress =
		!!progress || !!session.progress || session.isPlaying;

	const partString = hasPartInfo
		? intl.formatMessage(
				{
					id: 'cardWithPlayable__partInfo',
					defaultMessage: 'Part {index} of {length}',
					description: '',
				},
				{ index: container?.index, length: container?.length }
		  )
		: undefined;
	return (
		<CardWithHat
			hat={
				container?.title
					? {
							icon: container?.icon,
							title: container?.title,
					  }
					: undefined
			}
			preTitle={partString}
			title={title}
			titleAdornment={
				<div className={styles.play}>
					<ButtonPlay recording={recording} />
				</div>
			}
			url={url}
			theme={theme}
		>
			<div className={styles.speakers}>
				{persons.map((p) => (
					<div key={p.id}>
						<SpeakerName person={p} />
					</div>
				))}
			</div>
			<div className={styles.controls}>
				{!!duration && (
					<span className={styles.time}>{useFormattedDuration(duration)}</span>
				)}

				<div className={styles.bar}>
					{shouldShowProgress && (
						<RecordingProgressBar recording={recording} interactive={false} />
					)}
				</div>

				<ButtonFavorite id={recording.id} />
			</div>
		</CardWithHat>
	);
}
