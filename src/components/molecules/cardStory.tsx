import React, { CSSProperties } from 'react';

import Card from '@components/molecules/card';
import { COLORS } from '@lib/constants';
import { CardStoryFragment } from '@lib/generated/graphql';

import FeatherIcon from '../../../public/img/icon-feather-solid.svg';

interface CardStoryProps {
	story: CardStoryFragment;
}

export default function CardStory({ story }: CardStoryProps): JSX.Element {
	const container = story.sequence
		? {
				icon: <FeatherIcon width={12} height={12} />,
				title: story.sequence?.title,
				length: story.sequence?.recordings.aggregate?.count,
				// TODO: set index to live data
				// https://trello.com/c/DSJLqX29/238-add-parts-info-eg-part-1-of-7
				index: 1,
		  }
		: undefined;

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
			container={container}
			progress={0.3}
			{...story}
		/>
	);
}
