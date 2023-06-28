import clsx from 'clsx';
import { ReactNode } from 'react';

import styles from '~components/molecules/card/index.module.scss';

interface CardProps {
	children?: ReactNode;
	className?: string;
}

export default function Card({ children, className }: CardProps): JSX.Element {
	return <div className={clsx(styles.card, className)}>{children}</div>;
}
