import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import { useState } from 'react';

import Heading6 from '@components/atoms/heading6';

import ClosureIcon from '../../../../../public/img/icons/icon-closure-slim.svg';
import DisclosureIcon from '../../../../../public/img/icons/icon-disclosure-slim.svg';

import styles from './index.module.scss';

type SimpleProps = {
	icon?: React.ReactElement;
	title: string | JSX.Element;
	url: string;
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
	const router = useRouter();
	const [hatExpanded, setHatExpanded] = useState(false);
	const { title, url, icon } = props;

	if (isSimple(props)) {
		return (
			<Link href={url} className={clsx(styles.hat)}>
				<a>
					<div className={styles.hatBar}>
						<span className={styles.hatIcon}>{icon}</span>
						<span className={styles.hatTitle}>{title}</span>
					</div>
				</a>
			</Link>
		);
	}

	const { label, longHat, children } = props;

	return (
		<div
			className={clsx(
				styles.hat,
				hatExpanded && styles.hatExpanded,
				longHat && styles.longHat
			)}
			onClick={() => setHatExpanded(!hatExpanded)}
		>
			<div className={styles.hatBar}>
				<span className={styles.hatIcon}>{icon}</span>
				<span className={styles.hatTitle}>{title}</span>
				<Heading6 loose sans unpadded uppercase className={styles.hatLabel}>
					{label}
				</Heading6>
				<span className={styles.hatCaret}>
					{hatExpanded ? <ClosureIcon /> : <DisclosureIcon />}
				</span>
			</div>
			<div className={styles.hatContent} onClick={() => router.push(url)}>
				{children}
			</div>
		</div>
	);
}
