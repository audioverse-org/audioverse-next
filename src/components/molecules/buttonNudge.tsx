import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

import { AndMiniplayerFragment } from '~components/templates/__generated__/andMiniplayer';
import { BaseColors } from '~lib/constants';
import IconJumpBack from '~public/img/icons/icon-jump-back.svg';
import IconJumpBackMedium from '~public/img/icons/icon-jump-back-medium.svg';
import IconJumpForward from '~public/img/icons/icon-jump-forward.svg';
import IconJumpForwardMedium from '~public/img/icons/icon-jump-forward-medium.svg';
import useOnRecordingLoad from '~src/lib/media/useOnRecordingLoad';
import usePlayerTime from '~src/lib/media/usePlayerTime';

import styles from './buttonNudge.module.scss';
import { isBackgroundColorDark } from './buttonPlay';
import IconButton from './iconButton';

export default function ButtonNudge({
	recording,
	backgroundColor,
	reverse = false,
	large,
}: {
	recording: AndMiniplayerFragment;
	backgroundColor: BaseColors;
	reverse?: boolean;
	large?: boolean;
}): JSX.Element {
	const intl = useIntl();
	const onLoad = useOnRecordingLoad();
	const { time, setTime } = usePlayerTime();

	const shiftTime = useCallback(
		(delta: number) => {
			onLoad({
				recording,
				fn: () => {
					setTime(time + delta);
				},
			});
		},
		[onLoad, recording, setTime, time]
	);

	const label = reverse
		? intl.formatMessage({
				id: 'player__nudgeBack',
				defaultMessage: 'back 15 seconds',
				description: 'player nudge-back label',
		  })
		: intl.formatMessage({
				id: 'player__nudgeForward',
				defaultMessage: 'forward 15 seconds',
				description: 'player nudge-forward label',
		  });

	return (
		<IconButton
			Icon={
				reverse
					? large
						? IconJumpBackMedium
						: IconJumpBack
					: large
					? IconJumpForwardMedium
					: IconJumpForward
			}
			onClick={() => shiftTime(reverse ? -15 : 15)}
			aria-label={label}
			color={
				isBackgroundColorDark(backgroundColor)
					? BaseColors.SALMON
					: BaseColors.RED
			}
			backgroundColor={backgroundColor}
			className={clsx(
				styles.base,
				isBackgroundColorDark(backgroundColor) && styles.onDark,
				large && styles.large
			)}
		/>
	);
}
