import clsx from 'clsx';
import React, { MouseEvent } from 'react';

import { BaseColors } from '@components/atoms/baseColors';

import baseColorsStyles from '../atoms/baseColors.module.scss';

import styles from './iconButton.module.scss';

type Props = {
	Icon: any;
	onPress: (event: MouseEvent) => void;
	color: BaseColors;
	backgroundColor: BaseColors;
	className?: string;
	'aria-label'?: string;
	'aria-controls'?: string;
};

export default function IconButton({
	Icon,
	onPress,
	color,
	backgroundColor,
	className,
	...props
}: Props): JSX.Element {
	return (
		<div
			role="button"
			onClick={onPress}
			className={clsx(
				styles.base,
				className,
				`hover-bg--darkened-${backgroundColor}`
			)}
			{...props}
		>
			<Icon className={baseColorsStyles[color]} />
		</div>
	);
}
