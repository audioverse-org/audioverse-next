import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import styles from './alert.module.scss';

export default function Alert({
	children,
	className,
}: PropsWithChildren<{
	className?: string;
}>): JSX.Element {
	return <div className={clsx(styles.base, className)}>{children}</div>;
}
