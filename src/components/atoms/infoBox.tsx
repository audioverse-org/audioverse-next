import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import styles from './infoBox.module.scss';

export default function InfoBox({
	children,
	className,
}: PropsWithChildren<{
	className?: string;
}>): JSX.Element {
	return <div className={clsx(styles.base, className)}>{children}</div>;
}
