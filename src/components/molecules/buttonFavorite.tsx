import React, { forwardRef, Ref } from 'react';
import { useIntl } from 'react-intl';

import { BaseColors } from '~lib/constants';
import IconLike from '~public/img/icons/icon-like.svg';
import IconLikeActive from '~public/img/icons/icon-like-active.svg';
import IconLikeLight from '~public/img/icons/icon-like-light.svg';
import { gtmPushEvent } from '~src/utils/gtm';

import { analytics } from '../../lib/analytics';
import { isBackgroundColorDark } from './buttonPlay';
import { ShareContentType } from './buttonShare';
import IconButton from './iconButton';

type FavoriteContentType = ShareContentType;

type Props = {
	isFavorited: boolean;
	toggleFavorited: () => void;
	light?: boolean;
	backgroundColor: BaseColors;
	className?: string;
	ref?: Ref<HTMLButtonElement>;
	contentType: FavoriteContentType;
	id: string | number | undefined;
	title: string;
};

const ButtonFavorite = forwardRef<HTMLButtonElement, Props>(
	function ButtonFavorite(
		{
			isFavorited,
			toggleFavorited,
			light,
			backgroundColor,
			className,
			contentType,
			id,
			title,
		}: Props,
		ref,
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

		const IconUnfavorite = light ? IconLikeLight : IconLike;
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
				Icon={isFavorited ? IconLikeActive : IconUnfavorite}
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					toggleFavorited();
					analytics.track(isFavorited ? 'Unfavorite' : 'Favorite', {
						type: contentType,
						id,
						title,
					});
					if (!isFavorited) {
						gtmPushEvent('favorite', {
							content_type: contentType,
							item_id: id,
							title,
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
	},
);

export default ButtonFavorite;
