import clsx from 'clsx';
import React, { MouseEvent, PropsWithChildren } from 'react';

import { BaseColors } from '@lib/constants';

import styles from './circleButton.module.scss';

export type ICircleButtonProps = {
	onClick: (event: MouseEvent<HTMLElement>) => void;
	backgroundColor: BaseColors;
	className?: string;
	'aria-label'?: string;
	'aria-controls'?: string;
	ref?: any;
};

const CircleButton: React.FC<ICircleButtonProps> = React.forwardRef(
	function CircleButton(
		{
			onClick,
			backgroundColor,
			className,
			children,
			...props
		}: PropsWithChildren<ICircleButtonProps>,
		ref: any
	): JSX.Element {
		return (
			<button
				onClick={onClick}
				className={clsx(
					styles.base,
					className,
					`hover-bg--darkened-${backgroundColor}`
				)}
				{...props}
				ref={ref}
			>
				{children}
			</button>
		);
	}
);

export default CircleButton;
