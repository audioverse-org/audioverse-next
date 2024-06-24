import clsx from 'clsx';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useFormattedDuration } from '~lib/time';
import SuccessIcon from '~public/img/icons/icon-success-light.svg';
import { BaseColors } from '~src/lib/constants';

import Heading6 from './heading6';
import styles from './playTime.module.scss';

interface Props {
	duration: number;
	progress: number;
	textSecondaryColor: BaseColors;
	iconSecondaryColor: BaseColors;
}

const PlayTime: React.FC<Props> = ({
	duration,
	progress,
	iconSecondaryColor,
	textSecondaryColor,
}) => {
	const formattedDuration = useFormattedDuration(duration);
	const remainingDuration = useFormattedDuration(duration * (1 - progress));

	return (
		<>
			<Heading6
				large
				className={clsx(styles.duration, {
					[styles[textSecondaryColor]]: textSecondaryColor,
				})}
			>
				{progress > 0 && progress < 1 ? (
					<FormattedMessage
						id="timeLeft"
						defaultMessage="{time} left"
						values={{ time: remainingDuration }}
					/>
				) : (
					formattedDuration
				)}
			</Heading6>
			{progress >= 1 && (
				<SuccessIcon
					className={styles.successIcon}
					style={{ color: iconSecondaryColor }}
				/>
			)}
		</>
	);
};

export default PlayTime;
