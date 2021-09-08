import clsx from 'clsx';
import Link from 'next/link';
import React, { MouseEvent } from 'react';

import styles from './button.module.scss';

type Props = {
	type:
		| 'super'
		| 'primary'
		| 'primaryInverse'
		| 'secondary'
		| 'secondaryInverse'
		| 'tertiary';
	text?: JSX.Element | string;
	href?: string;
	onClick?: (e: MouseEvent<HTMLElement>) => void;
	Icon?: any;
	iconPosition?: 'left' | 'right';
	target?: '_blank';
	className?: string;
	'aria-label'?: string;
};

export default function Button({
	type,
	text,
	href,
	Icon,
	iconPosition,
	className,
	...props
}: Props): JSX.Element {
	const inner = (
		<a className={clsx(styles.base, styles[type], className)} {...props}>
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
