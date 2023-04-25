import React, { Ref } from 'react';

import { BaseColors } from '~lib/constants';

import baseColorsStyles from '../atoms/baseColors.module.scss';
import CircleButton, { ICircleButtonProps } from './circleButton';

type Props = {
	Icon: React.ElementType;
	color: BaseColors;
} & ICircleButtonProps;

const IconButton: React.VoidFunctionComponent<Props> = React.forwardRef(
	function IconButton(
		{ Icon, color, ...props }: Props,
		ref: Ref<HTMLButtonElement>
	) {
		return (
			<CircleButton {...props} ref={ref}>
				<Icon className={baseColorsStyles[color]} />
			</CircleButton>
		);
	}
);

export default IconButton;
