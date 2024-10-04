import clsx from 'clsx';
import React, { ReactNode } from 'react';

import { BaseColors } from '~lib/constants';

import baseStyles from './headingBase.module.scss';
import styles from './lineHeading.module.scss';

type Props = {
	children: ReactNode;
	color?: BaseColors.RED | BaseColors.SALMON;
	className?: string;
	small?: boolean;
	unpadded?: boolean;
	variant?: 'sideline' | 'overline';
};

export default function LineHeading({
	children,
	color,
	className,
	small,
	unpadded,
	variant = 'sideline',
}: Props): JSX.Element {
	return (
		<h5
			className={clsx(
				styles.heading,
				className,
				color === BaseColors.SALMON && styles.salmon,
				small && styles.small,
				unpadded && baseStyles.unpadded,
				styles[variant],
			)}
		>
			{children}
		</h5>
	);
}
