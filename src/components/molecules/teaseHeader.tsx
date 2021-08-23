import React, { ReactNode } from 'react';

import styles from '@components/molecules/teaseHeader.module.scss';

interface TeaseHeaderProps {
	children?: ReactNode;
}

export default function TeaseHeader({
	children,
}: TeaseHeaderProps): JSX.Element {
	return <div className={styles.base}>{children}</div>;
}
