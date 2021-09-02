import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import { useState } from 'react';

import Heading6 from '@components/atoms/heading6';

import Card from '../';
import DisclosureIcon from '../../../../../public/img/icon-disclosure-slim.svg';

import styles from './withHat.module.scss';

export type CardTheme =
	| 'audiobookTrack'
	| 'chapter'
	| 'sermon'
	| 'song'
	| 'story'
	| 'topic';

interface CardProps {
	hat?: {
		icon?: any;
		label: string;
		title: string | JSX.Element;
		content: JSX.Element;
		url: string;
	};
	theme: CardTheme;
}

export default function CardWithHat({
	hat,
	theme,
	children,
}: PropsWithChildren<CardProps>): JSX.Element {
	const [hatExpanded, setHatExpanded] = useState(false);
	const router = useRouter();
	const longHat = theme === 'audiobookTrack' || theme === 'story';
	return (
		<Card>
			<div className={clsx(styles.base, styles[theme])}>
				{hat && (
					<div
						className={clsx(
							styles.hat,
							hatExpanded && styles.hatExpanded,
							longHat && styles.longHat
						)}
						onClick={() => setHatExpanded(!hatExpanded)}
					>
						<div className={styles.hatBar}>
							<span className={styles.hatIcon}>{hat.icon}</span>
							<span className={styles.hatTitle}>{hat.title}</span>
							<Heading6
								loose
								sans
								unpadded
								uppercase
								className={styles.hatLabel}
							>
								{hat.label}
							</Heading6>
							<span className={styles.hatCaret}>
								<DisclosureIcon />
							</span>
						</div>
						<div
							className={styles.hatContent}
							onClick={() => router.push(hat.url)}
						>
							{hat.content}
						</div>
					</div>
				)}
				{children}
			</div>
		</Card>
	);
}
