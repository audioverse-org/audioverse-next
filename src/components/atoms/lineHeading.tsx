import clsx from 'clsx';
import { ReactNode } from 'react';

import { BaseColors } from '~lib/constants';

import styles from './lineHeading.module.scss';

type Props = {
	children: ReactNode;
	color?: BaseColors.RED | BaseColors.SALMON;
	className?: string;
	small?: boolean;
	variant?: 'sideline' | 'overline';
};

export default function LineHeading({
	children,
	color,
	className,
	small,
	variant = 'sideline',
}: Props): JSX.Element {
	return (
		<h5
			className={clsx(
				styles.heading,
				className,
				color === BaseColors.SALMON && styles.salmon,
				small && styles.small,
				styles[variant]
			)}
		>
			{children}
		</h5>
	);
}
