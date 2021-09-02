import React from 'react';
import { FormattedMessage } from 'react-intl';

import { BaseColors } from '@components/atoms/baseColors';
import { AndMiniplayerFragment } from '@lib/generated/graphql';
import usePlaybackSession from '@lib/usePlaybackSession';

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
	const speeds = [1, 1.5, 1.75, 2];

	return (
		<CircleButton
			onPress={() => {
				const newSpeed = speeds.find((s) => s > (speed || 0)) || speeds[0];
				setSpeed(newSpeed);
			}}
			backgroundColor={backgroundColor}
		>
			<div className={styles.speed}>
				<FormattedMessage
					id={'molecule-buttonSpeed__buttonLabel'}
					defaultMessage={'{speed}x'}
					description={'button speed button label'}
					values={{ speed }}
				/>
			</div>
		</CircleButton>
	);
}
