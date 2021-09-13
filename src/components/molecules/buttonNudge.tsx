import clsx from 'clsx';
import React from 'react';
import { useIntl } from 'react-intl';

import { BaseColors } from '@lib/constants';
import { AndMiniplayerFragment } from '@lib/generated/graphql';
import usePlaybackSession from '@lib/usePlaybackSession';

import IconJumpBackMedium from '../../../public/img/icon-jump-back-medium.svg';
import IconJumpBack from '../../../public/img/icon-jump-back.svg';
import IconJumpForwardMedium from '../../../public/img/icon-jump-forward-medium.svg';
import IconJumpForward from '../../../public/img/icon-jump-forward.svg';

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
	const session = usePlaybackSession(recording);

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
			onPress={() => session.shiftTime(reverse ? -15 : 15)}
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
