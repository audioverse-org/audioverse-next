import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';

import Icon from '@components/atoms/icon';
import styles from '@components/molecules/cardHat.module.scss';

import Card from './card';

export type CardTheme =
	| 'collection'
	| 'chapter'
	| 'sermon'
	| 'song'
	| 'story'
	| 'topic';

interface CardProps {
	hat?: {
		icon?: any;
		title: string | JSX.Element;
	};
	hero?: string;
	preTitle?: string;
	title: string;
	url?: string;
	titleAdornment?: ReactNode;
	children?: ReactNode;
	theme?: CardTheme;
}

export default function CardHat({
	hat,
	hero,
	preTitle,
	title,
	url,
	titleAdornment,
	children,
	theme,
}: CardProps): JSX.Element {
	const heroImage = hero && (
		<Image
			className={styles.hero}
			src={hero}
			alt={title}
			width={500}
			height={260}
		/>
	);

	return (
		<Card>
			<div className={`${(theme && styles[theme]) || ''}`}>
				{hat && (
					// TODO: Link the hat
					<div className={styles.hat}>
						<span className={styles.hatIcon}>{hat.icon}</span>
						<span className={styles.hatTitle}>{hat.title}</span>
						<span className={styles.hatCarrot}>
							<Icon icon={'chevron-down-custom'} size={16} />
						</span>
					</div>
				)}
				<div className={styles.content}>
					{hero &&
						(url ? (
							<Link href={url}>
								<a>{heroImage}</a>
							</Link>
						) : (
							heroImage
						))}
					{preTitle && <span className={styles.part}>{preTitle}</span>}
					<div className={styles.heading}>
						<h2 className={styles.title}>
							{url ? (
								<Link href={url}>
									<a>{title}</a>
								</Link>
							) : (
								title
							)}
						</h2>
						{titleAdornment}
					</div>
					{children}
				</div>
			</div>
		</Card>
	);
}
