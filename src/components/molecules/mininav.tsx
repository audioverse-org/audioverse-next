import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import Heading6 from '@components/atoms/heading6';

import styles from './mininav.module.scss';

type Props = {
	items: {
		label: JSX.Element | string;
		url: string;
		isActive?: boolean;
	}[];
	disabled?: boolean;
};

export default function Mininav({ items, disabled }: Props): JSX.Element {
	return (
		<div className={clsx(styles.miniNav, disabled && styles.miniNavDisabled)}>
			{items.map(({ label, url, isActive }) => (
				<Heading6
					sans
					uppercase
					loose
					large
					unpadded
					key={url}
					className={clsx(isActive && styles.miniNavActive)}
				>
					<Link href={url}>
						<a>{label}</a>
					</Link>
				</Heading6>
			))}
		</div>
	);
}
