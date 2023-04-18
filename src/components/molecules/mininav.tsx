import clsx from 'clsx';
import Link from 'next/link';
import React, { MouseEvent } from 'react';

import styles from './mininav.module.scss';

const Theme = {
	default: undefined,
	light: styles.light,
};

type ItemBase = {
	id: string;
	label: JSX.Element | string;
	isActive?: boolean;
};

type ItemLink = ItemBase & {
	url: string;
	onClick?: never;
};

type ItemButton = ItemBase & {
	url?: never;
	onClick: (e: MouseEvent) => void;
};

type Item = ItemLink | ItemButton;

type Props = {
	items: Item[];
	compact?: boolean;
	disabled?: boolean;
	className?: string;
	theme?: keyof typeof Theme;
};

export default function Mininav({
	items,
	compact,
	disabled,
	className,
	theme = 'default',
}: Props): JSX.Element {
	return (
		<div
			className={clsx(
				styles.miniNav,
				compact && styles.compact,
				disabled && styles.miniNavDisabled,
				className,
				Theme[theme]
			)}
		>
			{items.map(({ label, url, onClick, isActive, id }) => {
				return url ? (
					<div
						key={id}
						className={clsx(styles.button, isActive && styles.miniNavActive)}
					>
						<Link href={url} legacyBehavior>
							<a>{label}</a>
						</Link>
					</div>
				) : (
					<button
						key={id}
						className={clsx(styles.button, isActive && styles.miniNavActive)}
						onClick={onClick}
					>
						{label}
					</button>
				);
			})}
		</div>
	);
}
