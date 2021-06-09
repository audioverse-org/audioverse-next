import React from 'react';

import Card from '@components/molecules/card';
import { CardSongFragment } from '@lib/generated/graphql';

import HatIcon from '../../../public/img/icon-music-solid.svg';

interface CardSongProps {
	song: CardSongFragment;
}

export default function CardSong({ song }: CardSongProps): JSX.Element {
	const container = song.sequence
		? {
				icon: <HatIcon width={12} height={12} />,
				title: song.sequence.title,
		  }
		: undefined;

	return <Card container={container} theme={'song'} progress={0.3} {...song} />;
}
