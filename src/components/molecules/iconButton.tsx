import React from 'react';

import { BaseColors } from '@lib/constants';

import baseColorsStyles from '../atoms/baseColors.module.scss';

import CircleButton, { ICircleButtonProps } from './circleButton';

type Props = {
	Icon: any;
	color: BaseColors;
} & ICircleButtonProps;

const IconButton: React.FC<Props> = React.forwardRef(function IconButton(
	{ Icon, color, ...props }: Props,
	ref: any
) {
	return (
		<CircleButton {...props} ref={ref}>
			<Icon className={baseColorsStyles[color]} />
		</CircleButton>
	);
});

export default IconButton;
