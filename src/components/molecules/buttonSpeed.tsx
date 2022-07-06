import clsx from 'clsx';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { BaseColors } from '@lib/constants';

import { isBackgroundColorDark } from './buttonPlay';
import styles from './buttonSpeed.module.scss';
import CircleButton from './circleButton';
import useSpeed, { SPEEDS } from '@lib/hooks/useSpeed';
import { PlayerFragment } from '@components/molecules/__generated__/player';

export default function ButtonSpeed({
	recording,
	backgroundColor,
}: {
	recording: PlayerFragment;
	backgroundColor: BaseColors;
}): JSX.Element {
	const [speed, setSpeed] = useSpeed(recording);

	return (
		<CircleButton
			onClick={() => {
				const newSpeed = SPEEDS.find((s) => s > (speed || 0)) || SPEEDS[0];
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
