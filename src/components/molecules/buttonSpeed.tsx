import clsx from 'clsx';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { AndMiniplayerFragment } from '~components/templates/__generated__/andMiniplayer';
import { BaseColors } from '~lib/constants';
import usePlaybackSession from '~lib/usePlaybackSession';

import { isBackgroundColorDark } from './buttonPlay';
import styles from './buttonSpeed.module.scss';
import CircleButton from './circleButton';

export default function ButtonSpeed({
	recording,
	backgroundColor,
}: {
	recording: AndMiniplayerFragment;
	backgroundColor: BaseColors;
}): JSX.Element {
	const { setSpeed, speed } = usePlaybackSession(recording);
	const speeds = [1, 1.25, 1.5, 1.75, 2];

	return (
		<CircleButton
			onClick={() => {
				const newSpeed = speeds.find((s) => s > (speed || 0)) || speeds[0];
				setSpeed(newSpeed);
			}}
			backgroundColor={backgroundColor}
			className={styles.base}
		>
			<div
				className={clsx(
					styles.speed,
					isBackgroundColorDark(backgroundColor) && styles.light
				)}
			>
				<FormattedMessage
					id="molecule-buttonSpeed__buttonLabel"
					defaultMessage="{speed}x"
					description="button speed button label"
					values={{ speed }}
				/>
			</div>
		</CircleButton>
	);
}
