import clsx from 'clsx';
import { ReactNode } from 'react';

import styles from '~components/molecules/tease.module.scss';

interface TeaseProps {
	children?: ReactNode;
	fullBleed?: boolean;
	className?: string;
}

export default function Tease({
	children,
	fullBleed = true,
	className,
}: TeaseProps): JSX.Element {
	return (
		<div
			className={clsx(styles.tease, fullBleed && styles.fullBleed, className)}
		>
			{children}
		</div>
	);
}
