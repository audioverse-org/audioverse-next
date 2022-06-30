import React from 'react';

import HatIcon from '../../../../public/img/icons/fa-layer-group.svg';
import TeaseRecording from '../teaseRecording';

import CardWithTheme from './base/withTheme';
import CardHat from './hat';
import { CardRecordingFragment } from '@components/molecules/card/__generated__/recording';

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
				/* eslint-disable-next-line @calm/react-intl/missing-formatted-message */
				label="TODO"
				url={topicRecording.sequence?.canonicalPath || ''}
				icon={<HatIcon />}
				longHat
			>
				{/* eslint-disable-next-line @calm/react-intl/missing-formatted-message */}
				<h1>TODO</h1>
			</CardHat>
			<TeaseRecording {...{ recording: topicRecording, theme }} />
		</CardWithTheme>
	);
}
