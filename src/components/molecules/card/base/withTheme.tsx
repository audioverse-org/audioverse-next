import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import Card from '..';

import styles from './withTheme.module.scss';

export const CARD_THEMES = [
	'audiobookTrack',
	'chapter',
	'sermon',
	'song',
	'story',
	'topic',
	'playlistItem',
] as const;

export const EXTENDED_CARD_THEMES = [
	...CARD_THEMES,

	// Partially implemented
	'collection',
	'sequence',
	'playlist',
] as const;

export type CardTheme = typeof CARD_THEMES[number];
export type ExtendedCardTheme = typeof EXTENDED_CARD_THEMES[number];

interface Props {
	theme: ExtendedCardTheme;
	className?: string;
}

export default function CardWithTheme({
	theme,
	children,
	className,
}: PropsWithChildren<Props>): JSX.Element {
	return (
		<Card>
			<div className={clsx(styles.base, styles[theme], className)}>
				{children}
			</div>
		</Card>
	);
}
