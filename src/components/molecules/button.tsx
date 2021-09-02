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
	text: JSX.Element | string;
	href?: string;
	onClick?: (e: MouseEvent) => void;
	Icon?: any;
	iconPosition?: 'left' | 'right';
	target?: '_blank';
	className?: string;
};

export default function Button({
	type,
	text,
	href,
	onClick,
	Icon,
	iconPosition,
	target,
	className,
}: Props): JSX.Element {
	const inner = (
		<a
			className={clsx(styles.base, styles[type], className)}
			onClick={onClick}
			target={target}
		>
			{Icon && iconPosition !== 'right' && (
				<Icon className={clsx(styles.iconLeft)} />
			)}
			{text}
			{Icon && iconPosition === 'right' && (
				<Icon className={clsx(styles.iconRight)} />
			)}
		</a>
	);
	return href ? <Link href={href}>{inner}</Link> : inner;
}
