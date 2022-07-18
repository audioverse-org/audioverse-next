import clsx from 'clsx';
import React from 'react';

import RoundImage from '@components/atoms/roundImage';
import { BaseColors } from '@lib/constants';

import baseColorStyles from '../atoms/baseColors.module.scss';

import LinkButton, { ILinkButtonProps } from './linkButton';
import styles from './namedAvatar.module.scss';

export type INamedAvatarProps = {
	name: string;
	image?: string;
	href?: string;
	textColor:
		| BaseColors.DARK
		| BaseColors.WHITE
		| BaseColors.LIGHT_TONE
		| BaseColors.MID_TONE;
	hoverColor?: BaseColors.RED | BaseColors.SALMON;
	small?: boolean;
} & Pick<ILinkButtonProps, 'isOptionalLink'>;

export default function NamedAvatar({
	name,
	image,
	href,
	isOptionalLink,
	textColor,
	hoverColor,
	small,
}: INamedAvatarProps): JSX.Element {
	const inner = (
		<>
			{image && <RoundImage image={image} small={small} alt={name} />}
			<div className={clsx(styles.title, image && styles.titleWithImage)}>
				{name}
			</div>
		</>
	);
	const containerClasses = clsx(styles.container, baseColorStyles[textColor]);
	return href ? (
		<LinkButton
			{...{
				href,
				isOptionalLink,
				className: clsx(
					containerClasses,
					styles.link,
					hoverColor === BaseColors.SALMON && styles.linkSalmon
				),
			}}
		>
			{inner}
		</LinkButton>
	) : (
		<div className={containerClasses}>{inner}</div>
	);
}
