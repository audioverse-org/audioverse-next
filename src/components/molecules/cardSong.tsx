import React, { CSSProperties } from 'react';

import Card from '@components/molecules/card';
import { COLORS } from '@lib/constants';
import { CardSongFragment } from '@lib/generated/graphql';

import HatIcon from '../../../public/img/icon-music-solid.svg';

interface CardSongProps {
	song: CardSongFragment;
}

export default function CardSong({ song }: CardSongProps): JSX.Element {
	const container = song.collection
		? {
				icon: <HatIcon width={12} height={12} />,
				title: song.collection.title,
		  }
		: undefined;

	return (
		<Card
			style={
				{
					'--hatBg': '#D7EBFB',
					'--hatColor': COLORS.dark,
					'--cardBg': '#EBF2F9',
					'--cardColor': COLORS.midTone,
					'--headingColor': COLORS.dark,
					'--progressColor': COLORS.red,
					'--partColor': COLORS.red,
					'--iconColor': COLORS.red,
				} as CSSProperties
			}
			container={container}
			progress={0.3}
			{...song}
		/>
	);
}
