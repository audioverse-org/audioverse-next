import clsx from 'clsx';
import React, { MouseEvent } from 'react';

import Link from '~components/atoms/linkWithoutPrefetch';

import styles from './button.module.scss';

export type IButtonType =
	| 'super'
	| 'primary'
	| 'primaryInverse'
	| 'secondary'
	| 'secondaryInverse'
	| 'none'
	| 'tertiary';

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
	buttonType?: 'button' | 'submit' | 'reset';
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
			className,
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
		<button
			disabled={disabled === true}
			type={props.buttonType || 'button'}
			{..._props}
		>
			{inner}
		</button>
	);
}
