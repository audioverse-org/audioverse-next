import React, { CSSProperties } from 'react';

import Card from '@components/molecules/card';
import { COLORS } from '@lib/constants';

import HatIcon from '../../../public/img/icon-layer-group-solid.svg';

export default function CardTopic(): JSX.Element {
	return (
		<Card
			style={
				{
					'--hatBg': '#040253',
					'--hatColor': 'white',
					'--cardBg': '#3E3D6D',
					'--cardColor': COLORS.lightTone,
					'--headingColor': 'white',
					'--progressColor': COLORS.salmon,
					'--partColor': COLORS.salmon,
					'--iconColor': COLORS.salmon,
				} as CSSProperties
			}
			container={{
				icon: <HatIcon width={12} height={12} />,
				title: 'Marriage and the Family',
			}}
			title={'Virtuous Valentine: The Love of Your Life'}
			duration={2520}
			progress={0.3}
			persons={[
				{
					id: 'the_id',
					name: 'Ron du Preez',
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
