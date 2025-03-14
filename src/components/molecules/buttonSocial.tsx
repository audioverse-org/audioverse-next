import clsx from 'clsx';
import React, { MouseEvent } from 'react';

import Link from '~components/atoms/linkWithoutPrefetch';

import styles from './button.module.scss';

type IButtonType =
	| 'super'
	| 'primary'
	| 'primaryInverse'
	| 'secondary'
	| 'secondaryInverse'
	| 'none';
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
			styles.social,
			styles[type],
			centered && styles.centered,
			disabled && styles.disabled,
			className,
		),
		...props,
	};

	const inner = (
		<div className={IconLeft ? styles.spaceIcon : ''}>
			{IconLeft && (
				<div className={styles.leftIcon}>
					<IconLeft className={clsx(text && styles.iconLeftOfText)} />
				</div>
			)}

			<div className={styles.text}>{text}</div>
			{IconRight && (
				<div>
					<IconRight className={clsx(text && styles.iconRightOfText)} />
				</div>
			)}
		</div>
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
