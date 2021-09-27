import clsx from 'clsx';
import React, { MouseEvent } from 'react';
import { PropsWithChildren } from 'react';

import { BaseColors } from '@lib/constants';

import styles from './circleButton.module.scss';

export type ICircleButtonProps = {
	onClick: (event: MouseEvent<HTMLElement>) => void;
	backgroundColor: BaseColors;
	className?: string;
	'aria-label'?: string;
	'aria-controls'?: string;
};

export default function CircleButton({
	onClick,
	backgroundColor,
	className,
	children,
	...props
}: PropsWithChildren<ICircleButtonProps>): JSX.Element {
	return (
		<div
			role="button"
			onClick={onClick}
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
