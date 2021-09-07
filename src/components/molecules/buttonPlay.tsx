import clsx from 'clsx';
import React from 'react';
import { useIntl } from 'react-intl';

import { BaseColors } from '@components/atoms/baseColors';
import { ButtonPlayFragment } from '@lib/generated/graphql';
import usePlaybackSession from '@lib/usePlaybackSession';

import IconPauseLarge from '../../../public/img/icon-pause-large.svg';
import IconPause from '../../../public/img/icon-pause-medium.svg';
import IconPlayLarge from '../../../public/img/icon-play-large.svg';
import IconPlay from '../../../public/img/icon-play-medium.svg';

import styles from './buttonPlay.module.scss';
import IconButton from './iconButton';

export const isBackgroundColorDark = (backgroundColor: BaseColors): boolean =>
	[
		BaseColors.DARK,
		BaseColors.BOOK_B,
		BaseColors.STORY_B,
		BaseColors.TOPIC_B,
	].includes(backgroundColor);

export default function ButtonPlay({
	recording,
	backgroundColor,
	large,
	active,
	className,
}: {
	recording: ButtonPlayFragment;
	backgroundColor: BaseColors;
	large?: boolean;
	active?: boolean;
	className?: string;
}): JSX.Element {
	const { isPaused, play, pause } = usePlaybackSession(recording);
	const intl = useIntl();

	const label = isPaused
		? intl.formatMessage({
				id: 'playButton__playLabel',
				defaultMessage: 'play',
				description: 'play button play label',
		  })
		: intl.formatMessage({
				id: 'playButton__pauseLabel',
				defaultMessage: 'pause',
				description: 'play button pause label',
		  });

	return (
		<IconButton
			Icon={
				isPaused
					? large
						? IconPlayLarge
						: IconPlay
					: large
					? IconPauseLarge
					: IconPause
			}
			onPress={() => (isPaused ? play() : pause())}
			color={
				active
					? isBackgroundColorDark(backgroundColor)
						? BaseColors.SALMON
						: BaseColors.RED
					: isBackgroundColorDark(backgroundColor)
					? BaseColors.WHITE
					: BaseColors.DARK
			}
			backgroundColor={backgroundColor}
			className={clsx(styles.base, large && styles.large, className)}
			aria-label={label}
		/>
	);
}
