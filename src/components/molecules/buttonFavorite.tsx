import React, { Ref } from 'react';
import { useIntl } from 'react-intl';

import { BaseColors } from '~lib/constants';
import IconLike from '~public/img/icons/icon-like.svg';
import IconLikeActive from '~public/img/icons/icon-like-active.svg';
import IconLikeLight from '~public/img/icons/icon-like-light.svg';

import { analytics } from '../atoms/analytics';
import { isBackgroundColorDark } from './buttonPlay';
import IconButton from './iconButton';

type Props = {
	favoritedType?: string;
	favoritedId?: string | number;
	favoritedTitle?: string;
	isFavorited: boolean;
	toggleFavorited: () => void;
	light?: boolean;
	backgroundColor: BaseColors;
	className?: string;
	ref?: Ref<HTMLButtonElement>;
};

const ButtonFavorite: React.VoidFunctionComponent<Props> = React.forwardRef(
	function ButtonFavorite(
		{
			favoritedType,
			favoritedId,
			favoritedTitle,
			isFavorited,
			toggleFavorited,
			light,
			backgroundColor,
			className,
		}: Props,
		ref: Ref<HTMLButtonElement>
	): JSX.Element {
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
		const isDarkTheme = isBackgroundColorDark(backgroundColor);

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
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					toggleFavorited();
					if (favoritedType) {
						analytics.track(isFavorited ? 'Unfavorited' : 'Favorited', {
							Type: favoritedType,
							Id: favoritedId,
							Title: favoritedTitle,
						});
					}
				}}
				color={iconColor}
				{...{
					backgroundColor,
					className,
					'aria-label': label,
					'aria-pressed': isFavorited,
					'data-testid': isFavorited ? 'unfavorite-icon' : 'favorite-icon',
					ref,
				}}
			/>
		);
	}
);

export default ButtonFavorite;
