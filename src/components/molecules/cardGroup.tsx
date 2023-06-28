import clsx from 'clsx';
import { ReactNode } from 'react';

import styles from '~components/molecules/cardGroup.module.scss';

interface CardGroupProps {
	children?: ReactNode;
	className?: string;
}

export default function CardGroup({
	children,
	className,
}: CardGroupProps): JSX.Element {
	return <div className={clsx(styles.base, className)}>{children}</div>;
}
