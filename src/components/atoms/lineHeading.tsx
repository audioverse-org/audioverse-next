import clsx from 'clsx';
import React, { ReactNode } from 'react';

import { BaseColors } from '@lib/constants';

import styles from './lineHeading.module.scss';

export default function LineHeading({
	children,
	color,
	className,
	small,
}: {
	children: ReactNode;
	color?: BaseColors.RED | BaseColors.SALMON;
	className?: string;
	small?: boolean;
}): JSX.Element {
	return (
		<h5
			className={clsx(
				styles.heading,
				className,
				color === BaseColors.SALMON && styles.salmon,
				small && styles.small
			)}
		>
			{children}
		</h5>
	);
}
