import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import Card from '..';

import styles from './withTheme.module.scss';

export type CardTheme =
	| 'audiobookTrack'
	| 'chapter'
	| 'sermon'
	| 'song'
	| 'story'
	| 'topic'
	| 'playlist';

interface Props {
	theme: CardTheme;
}

export default function CardWithTheme({
	theme,
	children,
}: PropsWithChildren<Props>): JSX.Element {
	return (
		<Card>
			<div className={clsx(styles.base, styles[theme])}>{children}</div>
		</Card>
	);
}
