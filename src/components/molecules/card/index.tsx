import clsx from 'clsx';
import React, { ReactNode } from 'react';

import styles from '~components/molecules/card/index.module.scss';

interface CardProps {
	children?: ReactNode;
	className?: string;
	fullBleed?: boolean;
}

export default function Card({
	children,
	className,
	fullBleed,
}: CardProps): JSX.Element {
	return (
		<div
			className={clsx(
				fullBleed ? styles.card_fullBleed : styles.card,
				className
			)}
		>
			{children}
		</div>
	);
}
