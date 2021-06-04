import React, { CSSProperties } from 'react';

import Card from '@components/molecules/card';
import { COLORS } from '@lib/constants';
import { CardTopicFragment } from '@lib/generated/graphql';

import HatIcon from '../../../public/img/icon-layer-group-solid.svg';

interface CardTopicProps {
	topicRecording: CardTopicFragment;
}

export default function CardTopic({
	topicRecording,
}: CardTopicProps): JSX.Element {
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
				// TODO: Replace hard-coded tag name (also hard-coded in home.graphql)
				title: 'Family',
			}}
			// TODO: Set progress dynamically
			progress={0.3}
			{...topicRecording}
		/>
	);
}
