import React from 'react';
import { useIntl } from 'react-intl';

import ProgressBar from '@components/atoms/progressBar';
import ButtonFavorite from '@components/molecules/buttonFavorite';
import ButtonPlay from '@components/molecules/buttonPlay';
import { CardTheme } from '@components/molecules/cardHat';
import SpeakerName from '@components/molecules/speakerName';
import {
	CardPlayableFragment,
	SpeakerNameFragment,
} from '@lib/generated/graphql';
import { useFormattedDuration } from '@lib/time';
import usePlaybackSession from '@lib/usePlaybackSession';

import CardHat from './cardHat';
import styles from './cardPlayable.module.scss';

export interface CardPlayableProps {
	recording: CardPlayableFragment;
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

export default function CardPlayable({
	recording,
	container,
	title,
	url,
	persons = [],
	duration,
	theme,
	progress,
}: CardPlayableProps): JSX.Element {
	const intl = useIntl();
	const session = usePlaybackSession(recording);
	const hasPartInfo = container?.length && container?.index;
	const shouldShowProgress =
		!!progress || !!session.progress || session.isPlaying;

	console.log({
		shouldShowProgress,
		progress: !!progress,
		sessionProgress: !!session.progress,
		sessionIsPlaying: session.isPlaying,
	});

	const partString = hasPartInfo
		? intl.formatMessage(
				{
					id: 'cardPlayable__partInfo',
					defaultMessage: 'Part {index} of {length}',
					description: '',
				},
				{ index: container?.index, length: container?.length }
		  )
		: undefined;
	return (
		<CardHat
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
						<ProgressBar recording={recording} interactive={false} />
					)}
				</div>

				<ButtonFavorite id={recording.id} />
			</div>
		</CardHat>
	);
}
