import React, { ReactNode } from 'react';

import styles from './contentWidthLimiter.module.scss';

interface Props {
	children?: ReactNode;
}

export default function ContentWidthLimiter({ children }: Props): JSX.Element {
	return <div className={styles.base}>{children}</div>;
}
