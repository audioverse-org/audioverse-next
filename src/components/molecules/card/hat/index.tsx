import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import { useState } from 'react';

import Heading6 from '@components/atoms/heading6';

import ClosureIcon from '../../../../../public/img/icon-closure-slim.svg';
import DisclosureIcon from '../../../../../public/img/icon-disclosure-slim.svg';

import styles from './index.module.scss';

interface Props {
	icon?: any;
	label: string | JSX.Element;
	title: string | JSX.Element;
	url: string;
	longHat?: true;
}

export default function CardHat({
	label,
	title,
	url,
	icon,
	longHat,
	children,
}: PropsWithChildren<Props>): JSX.Element {
	const [hatExpanded, setHatExpanded] = useState(false);
	const router = useRouter();
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
