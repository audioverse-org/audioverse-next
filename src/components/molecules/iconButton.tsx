import React from 'react';

import { BaseColors } from '@components/atoms/baseColors';

import baseColorsStyles from '../atoms/baseColors.module.scss';

import CircleButton, { ICircleButtonProps } from './circleButton';

type Props = {
	Icon: any;
	color: BaseColors;
} & ICircleButtonProps;

export default function IconButton({
	Icon,
	color,
	...props
}: Props): JSX.Element {
	return (
		<CircleButton {...props}>
			<Icon className={baseColorsStyles[color]} />
		</CircleButton>
	);
}
