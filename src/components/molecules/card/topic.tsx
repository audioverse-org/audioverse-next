import React from 'react';

import CardWithPlayable from '@components/molecules/card/base/withPlayable';
import { CardTopicFragment } from '@lib/generated/graphql';

import HatIcon from '../../../../public/img/icon-layer-group-solid.svg';

interface CardTopicProps {
	topicRecording: CardTopicFragment;
}

export default function CardTopic({
	topicRecording,
}: CardTopicProps): JSX.Element {
	return (
		<CardWithPlayable
			recording={topicRecording}
			theme={'topic'}
			container={{
				icon: <HatIcon width={12} height={12} />,
				// TODO: Replace hard-coded tag name (also hard-coded in home.graphql)
				title: 'Family',
				content: <h1>TODO</h1>,
				label: 'TODO',
				url: topicRecording.sequence?.canonicalPath || '',
			}}
			{...topicRecording}
		/>
	);
}
