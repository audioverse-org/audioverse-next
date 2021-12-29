import React from 'react';

import type { CardRecordingFragment } from '@lib/generated/graphql';

import HatIcon from '../../../../public/img/fa-layer-group.svg';
import TeaseRecording from '../teaseRecording';

import CardWithTheme from './base/withTheme';
import CardHat from './hat';

interface CardTopicProps {
	topicRecording: CardRecordingFragment;
}

// TODO: finish this component when replacing tags
export default function CardTopic({
	topicRecording,
}: CardTopicProps): JSX.Element {
	const theme = 'topic';

	// Replace hard-coded tag name (also hard-coded in home.graphql)
	return (
		<CardWithTheme {...{ theme }}>
			<CardHat
				title="Family"
				label="TODO"
				url={topicRecording.sequence?.canonicalPath || ''}
				icon={<HatIcon />}
				longHat
			>
				<h1>TODO</h1>
			</CardHat>
			<TeaseRecording {...{ recording: topicRecording, theme }} />
		</CardWithTheme>
	);
}
