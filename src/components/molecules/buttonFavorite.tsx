import React from 'react';
import { useIntl } from 'react-intl';

import { BaseColors } from '@components/atoms/baseColors';

import IconLikeActive from '../../../public/img/icon-like-active.svg';
import IconLikeLight from '../../../public/img/icon-like-light.svg';
import IconLike from '../../../public/img/icon-like.svg';

import IconButton from './iconButton';

export default function ButtonFavorite({
	isFavorited,
	toggleFavorited,
	light,
	backgroundColor,
	className,
}: {
	isFavorited: boolean;
	toggleFavorited: () => void;
	light?: boolean;
	backgroundColor: BaseColors;
	className?: string;
}): JSX.Element {
	const intl = useIntl();
	const label = isFavorited
		? intl.formatMessage({
				id: 'RecordingFavorite__unfavorite',
				defaultMessage: 'Unfavorite',
				description: 'Recording unfavorite button label',
		  })
		: intl.formatMessage({
				id: 'RecordingFavorite__favorite',
				defaultMessage: 'Favorite',
				description: 'Recording favorite button label',
		  });

	const IconUnavorite = light ? IconLikeLight : IconLike;
	const isDarkTheme = ['dark', 'bookB', 'storyB', 'topic'].includes(
		backgroundColor as any
	);
	const iconColor = isFavorited
		? isDarkTheme
			? BaseColors.SALMON
			: BaseColors.RED
		: isDarkTheme
		? BaseColors.WHITE
		: BaseColors.DARK;

	return (
		<IconButton
			Icon={isFavorited ? IconLikeActive : IconUnavorite}
			onPress={() => toggleFavorited()}
			color={iconColor}
			{...{
				backgroundColor,
				className,
				'aria-label': label,
				'aria-pressed': isFavorited,
				'data-testid': isFavorited ? 'unfavorite-icon' : 'favorite-icon',
			}}
		/>
	);
}
