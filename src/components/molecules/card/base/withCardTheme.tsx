import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import styles from './withCardTheme.module.scss';

const CARD_THEMES = [
	'audiobookTrack',
	'chapter',
	'sermon',
	'song',
	'story',
	'topic',
	'playlistItem',
] as const;

const EXTENDED_CARD_THEMES = [
	...CARD_THEMES,

	// Partially implemented
	'collection',
	'sequence',
	'playlist',
	'songBook',
] as const;

export type CardTheme = (typeof CARD_THEMES)[number];
export type ExtendedCardTheme = (typeof EXTENDED_CARD_THEMES)[number];

interface Props {
	theme: ExtendedCardTheme;
	className?: string;
}

export default function WithCardTheme({
	theme,
	children,
	className,
}: PropsWithChildren<Props>): JSX.Element {
	return (
		<div className={clsx(styles.base, styles[theme], className)}>
			{children}
		</div>
	);
}
