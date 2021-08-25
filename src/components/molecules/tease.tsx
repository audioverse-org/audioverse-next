import clsx from 'clsx';
import React, { ReactNode } from 'react';

import styles from '@components/molecules/tease.module.scss';

interface TeaseProps {
	children?: ReactNode;
	className?: string;
}

export default function Tease({
	children,
	className,
}: TeaseProps): JSX.Element {
	return <div className={clsx(styles.tease, className)}>{children}</div>;
}
