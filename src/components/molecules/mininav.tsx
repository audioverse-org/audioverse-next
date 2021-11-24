import clsx from 'clsx';
import Link from 'next/link';
import React, { MouseEvent } from 'react';

import Heading6 from '@components/atoms/heading6';

import styles from './mininav.module.scss';

type Props = {
	items: {
		label: JSX.Element | string;
		isActive?: boolean;
		url?: string;
		onClick?: (e: MouseEvent) => void;
	}[];
	disabled?: boolean;
};

export default function Mininav({ items, disabled }: Props): JSX.Element {
	return (
		<div className={clsx(styles.miniNav, disabled && styles.miniNavDisabled)}>
			{items.map(({ label, url, onClick, isActive }) => {
				const inner = <a onClick={onClick}>{label}</a>;
				return (
					<Heading6
						sans
						uppercase
						loose
						large
						unpadded
						key={url}
						className={clsx(isActive && styles.miniNavActive)}
					>
						{url ? <Link href={url}>{inner}</Link> : inner}
					</Heading6>
				);
			})}
		</div>
	);
}
