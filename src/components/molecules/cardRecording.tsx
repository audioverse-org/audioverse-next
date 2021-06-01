import React from 'react';

import Card from '@components/molecules/card';

import ListIcon from '../../../public/img/icon-list-alt-solid.svg';

// TODO:
// Only show top hat of container exists
// Show speakers dynamically
// Dynamically render progress bar
// Dynamically render all content

export default function CardRecording(): JSX.Element {
	return (
		<Card
			container={{
				icon: <ListIcon width={12} height={12} />,
				title: 'Leading People From Health To Him',
				length: 6,
				index: 1,
			}}
			title={'Leading People From Health To Him, Part I'}
			persons={[
				{
					id: 'the_id',
					name: 'Don Mackintosh',
					summary: 'This is his summary.',
					website: 'the_website',
					viewerHasFavorited: false,
					imageWithFallback: {
						url:
							'https://s.audioverse.org/english/gallery/persons/_/36/36/Mackintosh_Don.jpg',
					},
				},
			]}
			duration={4980}
			progress={0}
		/>
	);
}
