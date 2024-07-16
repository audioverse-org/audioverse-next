import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import styles from './index.module.scss';

type SimpleProps = {
	icon?: React.ReactElement;
	title: string | JSX.Element;
	url: string;
	fullBleed?: boolean;
};

export default function CardHat(props: SimpleProps): JSX.Element {
	const { title, url, icon, fullBleed } = props;

	if (!fullBleed) {
		return (
			<Link href={url} legacyBehavior>
				<a className={clsx(styles.hat)}>
					<div
						className={clsx(
							styles.hatBar,
							fullBleed ? styles.fullBleed : undefined
						)}
					>
						<span className={styles.hatIcon}>{icon}</span>
						<span className={styles.hatTitle}>{title}</span>
					</div>
				</a>
			</Link>
		);
	}

	return (
		<div className={clsx(styles.hat)}>
			<div
				className={clsx(
					styles.hatBar,
					fullBleed ? styles.fullBleed : undefined
				)}
			>
				<span className={styles.hatIcon}>{icon}</span>
				<span className={styles.hatTitle}>{title}</span>
			</div>
		</div>
	);
}
