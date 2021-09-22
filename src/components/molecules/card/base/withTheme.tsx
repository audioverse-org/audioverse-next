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
	| 'topic';

interface CardProps {
	theme: CardTheme;
}

export interface ICardHat {
	icon?: any;
	label: string | JSX.Element;
	title: string | JSX.Element;
	content: JSX.Element;
	url: string;
}

export default function CardWithTheme({
	theme,
	children,
}: PropsWithChildren<CardProps>): JSX.Element {
	return (
		<Card>
			<div className={clsx(styles.base, styles[theme])}>{children}</div>
		</Card>
	);
}
