import clsx from 'clsx';
import Link from 'next/link';
import React, { MouseEvent } from 'react';

import Heading6 from '@components/atoms/heading6';

import styles from './mininav.module.scss';

const Theme = {
	default: undefined,
	light: styles.light,
};

type Props = {
	items: {
		id: string;
		label: JSX.Element | string;
		isActive?: boolean;
		url?: string;
		onClick?: (e: MouseEvent) => void;
	}[];
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
					<Heading6
						sans
						uppercase
						loose
						large
						unpadded
						key={id}
						className={clsx(isActive && styles.miniNavActive)}
					>
						<Link href={url} legacyBehavior>
							<a onClick={onClick}>{label}</a>
						</Link>
					</Heading6>
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
