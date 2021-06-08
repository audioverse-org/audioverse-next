import React from 'react';

import Card from '@components/molecules/card';

import HatIcon from '../../../public/img/icon-music-solid.svg';

export default function CardSong(): JSX.Element {
	return (
		<Card
			theme={'song'}
			container={{
				icon: <HatIcon width={12} height={12} />,
				title: 'Hope Sabbath School Special Edition',
			}}
			title={'Behold, Bless the Lord - Psalm 134:1-3'}
			duration={2520}
			progress={0.3}
			persons={[
				{
					id: '1',
					name: 'Ashley Hold',
					summary: 'This is his summary.',
					website: 'the_website',
					viewerHasFavorited: false,
					imageWithFallback: {
						url:
							'https://s.audioverse.org/english/gallery/persons/_/150/150/dupreez_ron.jpg',
					},
				},
				{
					id: '2',
					name: 'Bodil Moris',
					summary: 'This is his summary.',
					website: 'the_website',
					viewerHasFavorited: false,
					imageWithFallback: {
						url:
							'https://s.audioverse.org/english/gallery/persons/_/150/150/dupreez_ron.jpg',
					},
				},
			]}
		/>
	);
}
