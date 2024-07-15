import clsx from 'clsx';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

import styles from './index.module.scss';

type SimpleProps = {
	icon?: React.ReactElement;
	title: string | JSX.Element;
	url: string;
	fullBleed?: boolean;
};

type ExpandableProps = PropsWithChildren<
	{
		label: string | JSX.Element;
		longHat?: true;
	} & SimpleProps
>;

const isSimple = (p: SimpleProps | ExpandableProps): p is SimpleProps => {
	return (p as ExpandableProps).label === undefined;
};

export default function CardHat(
	props: SimpleProps | ExpandableProps
): JSX.Element {
	const { title, url, icon, fullBleed } = props;

	if (isSimple(props)) {
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

	const { longHat } = props;

	return (
		<div className={clsx(styles.hat, longHat && styles.longHat)}>
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
