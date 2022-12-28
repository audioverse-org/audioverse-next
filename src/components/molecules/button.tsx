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
	IconLeft?: React.ElementType;
	IconRight?: React.ElementType;
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
	IconLeft,
	IconRight,
	className,
	centered,
	disabled,
	...props
}: Props): JSX.Element {
	const _props = {
		className: clsx(
			styles.base,
			styles[type],
			centered && styles.centered,
			disabled && styles.disabled,
			className
		),
		...props,
	};

	const inner = (
		<>
			{IconLeft && <IconLeft className={clsx(text && styles.iconLeftOfText)} />}
			{text}
			{IconRight && (
				<IconRight className={clsx(text && styles.iconRightOfText)} />
			)}
		</>
	);
	return href ? (
		<Link href={href} legacyBehavior>
			<a {..._props}>{inner}</a>
		</Link>
	) : (
		<button disabled={disabled === true} {..._props}>
			{inner}
		</button>
	);
}
