import clsx from 'clsx';
import React from 'react';

import Link from '~components/atoms/linkWithoutPrefetch';

import styles from './index.module.scss';

type Props = {
	icon?: React.ReactElement;
	title: string | JSX.Element;
	url: string;
	fullBleed?: boolean;
};

export default function CardHat(props: Props): JSX.Element {
	const { title, url, icon, fullBleed } = props;

	const content = (
		<div
			className={clsx(styles.hatBar, fullBleed ? styles.fullBleed : undefined)}
		>
			<span className={styles.hatIcon}>{icon}</span>
			<span className={styles.hatTitle}>{title}</span>
		</div>
	);

	if (!fullBleed) {
		return (
			<Link href={url} legacyBehavior>
				<a className={clsx(styles.hat)}>{content}</a>
			</Link>
		);
	}

	return <div className={clsx(styles.hat)}>{content}</div>;
}
