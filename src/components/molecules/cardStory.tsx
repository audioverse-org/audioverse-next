import React, { CSSProperties } from 'react';

import Card from '@components/molecules/card';
import { COLORS } from '@lib/constants';

import FeatherIcon from '../../../public/img/icon-feather-solid.svg';

export default function CardStory(): JSX.Element {
	return (
		<Card
			style={
				{
					'--hatBg': '#003849',
					'--hatColor': 'white',
					'--cardBg': '#325763',
					'--cardColor': COLORS.lightTone,
					'--headingColor': 'white',
					'--progressColor': COLORS.salmon,
					'--partColor': COLORS.salmon,
					'--iconColor': COLORS.salmon,
				} as CSSProperties
			}
			container={{
				icon: <FeatherIcon width={12} height={12} />,
				title: 'Discovery Mountain, Season 2: Summer of Strife',
				length: 10,
				index: 1,
			}}
			title={'01 - Goodnight, Blackfoot Cabin'}
			duration={1800}
			progress={0.3}
			persons={[
				{
					id: 'the_id',
					name: 'Jean Boonstra',
					summary: 'This is his summary.',
					website: 'the_website',
					viewerHasFavorited: false,
					imageWithFallback: {
						url:
							'https://s.audioverse.org/english/gallery/persons/_/86/86/default.png',
					},
				},
			]}
		/>
	);
}
