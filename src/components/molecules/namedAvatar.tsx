import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import { BaseColors } from '@components/atoms/baseColors';
import RoundImage from '@components/atoms/roundImage';

import baseColorStyles from '../atoms/baseColors.module.scss';

import styles from './namedAvatar.module.scss';

type Props = {
	name: string;
	image?: string;
	href?: string;
	textColor: BaseColors.DARK | BaseColors.WHITE | BaseColors.LIGHT_TONE;
	hoverColor?: BaseColors.RED | BaseColors.SALMON;
	small?: boolean;
};

export default function NamedAvatar({
	name,
	image,
	href,
	textColor,
	hoverColor,
	small,
}: Props): JSX.Element {
	const inner = (
		<>
			{image && <RoundImage image={image} small={small} />}
			<div className={styles.title}>{name}</div>
		</>
	);
	const containerClasses = clsx(styles.container, baseColorStyles[textColor]);
	return href ? (
		<Link href={href}>
			<a
				className={clsx(
					containerClasses,
					styles.link,
					hoverColor === BaseColors.SALMON && 'hover--salmon',
					hoverColor === BaseColors.SALMON && styles.linkSalmon
				)}
			>
				{inner}
			</a>
		</Link>
	) : (
		<div className={containerClasses}>{inner}</div>
	);
}
