import clsx from 'clsx';
import React from 'react';

import { BaseColors } from '@components/atoms/baseColors';

import baseColorsStyles from '../atoms/baseColors.module.scss';

import styles from './iconButton.module.scss';

type Props = {
	Icon: any;
	onPress: (event: any) => void;
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
		<a
			onClick={onPress}
			className={clsx(
				styles.base,
				className,
				`hover-bg--darkened-${backgroundColor}`
			)}
			{...props}
		>
			<Icon className={baseColorsStyles[color]} />
		</a>
	);
}
