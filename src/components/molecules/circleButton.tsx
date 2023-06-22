import clsx from 'clsx';
import React, { MouseEvent, PropsWithChildren, Ref } from 'react';

import { BaseColors } from '~lib/constants';

import styles from './circleButton.module.scss';

export type ICircleButtonProps = PropsWithChildren<{
	onClick: (event: MouseEvent<HTMLElement>) => void;
	backgroundColor: BaseColors;
	className?: string;
	'aria-label'?: string;
	'aria-controls'?: string;
	ref?: Ref<HTMLButtonElement>;
}>;

const CircleButton: React.FC<ICircleButtonProps> = React.forwardRef(
	function CircleButton(
		{
			onClick,
			backgroundColor,
			className,
			children,
			...props
		}: ICircleButtonProps,
		ref: Ref<HTMLButtonElement>
	): JSX.Element {
		return (
			<button
				onClick={onClick}
				className={clsx(
					styles.base,
					className,
					`hover-bg--darkened-${backgroundColor}`
				)}
				title={props['aria-label']}
				{...props}
				ref={ref}
			>
				{children}
			</button>
		);
	}
);

export default CircleButton;
