import React, { ReactNode } from 'react';

import styles from '@components/molecules/card/index.module.scss';

interface CardProps {
	children?: ReactNode;
}

export default function Card({ children }: CardProps): JSX.Element {
	return <div className={styles.card}>{children}</div>;
}
