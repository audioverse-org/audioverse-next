import clsx from 'clsx';
import React, { MouseEvent } from 'react';
import { PropsWithChildren } from 'react';

import { BaseColors } from '@components/atoms/baseColors';

import styles from './circleButton.module.scss';

export type ICircleButtonProps = {
	onPress: (event: MouseEvent<HTMLElement>) => void;
	backgroundColor: BaseColors;
	className?: string;
	'aria-label'?: string;
	'aria-controls'?: string;
};

export default function CircleButton({
	onPress,
	backgroundColor,
	className,
	children,
	...props
}: PropsWithChildren<ICircleButtonProps>): JSX.Element {
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
			{children}
		</div>
	);
}
