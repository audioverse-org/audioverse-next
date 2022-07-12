import clsx from 'clsx';
import React from 'react';
import { useIntl } from 'react-intl';

import { BaseColors } from '@lib/constants';

import IconPauseLarge from '../../../public/img/icons/icon-pause-large.svg';
import IconPause from '../../../public/img/icons/icon-pause-medium.svg';
import IconPlayLarge from '../../../public/img/icons/icon-play-large.svg';
import IconPlay from '../../../public/img/icons/icon-play-medium.svg';

import styles from './buttonPlay.module.scss';
import IconButton from './iconButton';
import { AndMiniplayerFragment } from '@components/templates/__generated__/andMiniplayer';
import usePaused from '@lib/hooks/usePaused';

export const isBackgroundColorDark = (backgroundColor: BaseColors): boolean =>
	[
		BaseColors.DARK,
		BaseColors.BOOK_B,
		BaseColors.BOOK_H,
		BaseColors.STORY_B,
		BaseColors.STORY_H,
		BaseColors.TOPIC_B,
		BaseColors.BIBLE_H,
	].includes(backgroundColor);

export type ButtonPlayProps = {
	recording: AndMiniplayerFragment;
	backgroundColor: BaseColors;
	playlistRecordings?: AndMiniplayerFragment[];
	large?: boolean;
	active?: boolean;
	prefersAudio?: boolean;
	className?: string;
};

export default function ButtonPlay({
	recording,
	playlistRecordings,
	backgroundColor,
	large,
	active,
	prefersAudio,
	className,
}: ButtonPlayProps): JSX.Element {
	const intl = useIntl();

	// setPaused is not stable. If I use useEffect to run setPaused,
	// my test passes, implying that the original function is not
	// functional, but a later version of the function is.
	const [paused, setPaused] = usePaused(recording, {
		playlistRecordings,
		prefersAudio,
	});

	console.log('ButtonPlay', paused);

	const labelPlay = intl.formatMessage({
		id: 'playButton__playLabel',
		defaultMessage: 'play',
		description: 'play button play label',
	});

	const labelPause = intl.formatMessage({
		id: 'playButton__pauseLabel',
		defaultMessage: 'pause',
		description: 'play button pause label',
	});

	return (
		<IconButton
			Icon={
				paused
					? large
						? IconPlayLarge
						: IconPlay
					: large
					? IconPauseLarge
					: IconPause
			}
			onClick={() => setPaused(!paused)}
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
			aria-label={paused ? labelPlay : labelPause}
		/>
	);
}
