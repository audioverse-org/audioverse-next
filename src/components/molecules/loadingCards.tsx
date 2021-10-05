import clsx from 'clsx';
import React from 'react';
import { useIntl } from 'react-intl';

import { ExtendedCardTheme } from './card/base/withCardTheme';
import CardWithTheme from './card/base/withTheme';
import CardGroup from './cardGroup';
import styles from './loadingCards.module.scss';

export default function LoadingCards(): JSX.Element {
	const intl = useIntl();
	const themes: ExtendedCardTheme[] = [
		'sermon',
		'sequence',
		'topic',
		'audiobookTrack',
		'chapter',
		'playlist',
		'song',
		'story',
		'collection',
	];
	return (
		<div
			aria-label={intl.formatMessage({
				id: 'loadingCards-ariaLabel',
				defaultMessage: 'Loading…',
			})}
		>
			<CardGroup>
				{themes.map((theme, i) => (
					<CardWithTheme
						theme={theme}
						className={clsx(styles.card, styles[`card-offset-${i % 3}`])}
						key={i}
					/>
				))}
			</CardGroup>
		</div>
	);
}
