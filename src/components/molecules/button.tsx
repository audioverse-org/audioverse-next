import clsx from 'clsx';
import Link from 'next/link';
import React, { MouseEvent } from 'react';

import styles from './button.module.scss';

export type IButtonType =
	| 'super'
	| 'primary'
	| 'primaryInverse'
	| 'secondary'
	| 'secondaryInverse';
// | 'tertiary' someday

type Props = {
	type: IButtonType;
	text?: JSX.Element | string;
	href?: string;
	onClick?: (e: MouseEvent<HTMLElement>) => void;
	Icon?: any;
	iconPosition?: 'left' | 'right';
	target?: '_blank';
	className?: string;
	'aria-label'?: string;
	disabled?: boolean;
	centered?: boolean;
};

export default function Button({
	type,
	text,
	href,
	Icon,
	iconPosition,
	className,
	centered,
	disabled,
	...props
}: Props): JSX.Element {
	const inner = (
		<a
			className={clsx(
				styles.base,
				styles[type],
				centered && styles.centered,
				disabled && styles.disabled,
				className
			)}
			{...props}
		>
			{Icon && iconPosition !== 'right' && (
				<Icon className={clsx(text && styles.iconLeftOfText)} />
			)}
			{text}
			{Icon && iconPosition === 'right' && (
				<Icon className={clsx(text && styles.iconRightOfText)} />
			)}
		</a>
	);
	return href ? <Link href={href}>{inner}</Link> : inner;
}
