import React, { ReactNode } from 'react';

import styles from './lineHeading.module.scss';

export default function LineHeading({
	children,
}: {
	children: ReactNode;
}): JSX.Element {
	return <h5 className={styles.heading}>{children}</h5>;
}
