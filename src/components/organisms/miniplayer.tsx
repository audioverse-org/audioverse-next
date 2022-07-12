import clsx from 'clsx';
import Link from 'next/link';
import React, { useContext } from 'react';
import { useIntl } from 'react-intl';

import ButtonNudge from '@components/molecules/buttonNudge';
import ButtonPlay from '@components/molecules/buttonPlay';
import RecordingProgressBar from '@components/molecules/recordingProgressBar';
import { VjsContext } from '@components/templates/andVjs';
import { BaseColors } from '@lib/constants';
import { SequenceContentType } from '@src/__generated__/graphql';
import { getSequenceTypeTheme } from '@lib/getSequenceType';
import { useFormattedTime } from '@lib/time';

import styles from './miniplayer.module.scss';
import { Volume } from '@components/molecules/volume';

export default function Miniplayer(): JSX.Element | null {
	const intl = useIntl();
	const playbackContext = useContext(VjsContext);
	const miniplayerRef = playbackContext.getMiniplayerRef();
	const recording = playbackContext.getRecording();
	const isShowingVideo = playbackContext.getVideoLocation() === 'miniplayer';
	const timeString = useFormattedTime(playbackContext.getTime());
	const durationString = useFormattedTime(playbackContext.getDuration());

	if (!recording) return null;

	let sequenceLine = null;
	if (recording.sequence) {
		const { Icon } = getSequenceTypeTheme(recording.sequence.contentType);
		sequenceLine = (
			<div
				className={styles.series}
				aria-label={intl.formatMessage({
					id: 'miniplayer__series',
					defaultMessage: 'Series',
				})}
			>
				<Icon width={13} height={13} />
				{recording.sequence.contentType === SequenceContentType.BibleBook
					? recording.collection?.title
					: recording.sequence.title}
			</div>
		);
	}

	return (
		<div
			className={styles.miniplayer}
			aria-label={intl.formatMessage({
				id: 'miniplayer__label',
				defaultMessage: 'miniplayer',
			})}
		>
			<div className={styles.player}>
				<div
					data-testid="miniplayerPortal"
					ref={miniplayerRef}
					className={styles.pane}
				/>
				<div className={clsx(styles.controls, isShowingVideo && styles.hidden)}>
					<ButtonNudge
						recording={recording}
						reverse={true}
						backgroundColor={BaseColors.WHITE}
						large
					/>
					<ButtonPlay
						recording={recording}
						backgroundColor={BaseColors.WHITE}
					/>
					<ButtonNudge
						recording={recording}
						backgroundColor={BaseColors.WHITE}
						large
					/>
				</div>
			</div>
			<div className={styles.meta}>
				<Link href={recording.canonicalPath}>
					<a className={styles.link}>
						{sequenceLine}
						<h4 className={styles.title}>{recording.title}</h4>
					</a>
				</Link>
				<div className={styles.progress}>
					<span>{timeString}</span>
					<span className={styles.bar}>
						<RecordingProgressBar recording={recording} />
					</span>
					<span>{durationString}</span>
				</div>
			</div>
			<Volume />
		</div>
	);
}
