import React from 'react';

import { CardRecordingFragment } from '@lib/generated/graphql';

import TeaseRecording from '../teaseRecording';

import CardWithTheme from './base/withTheme';
import CardHatStory from './hat/story';

interface CardStoryProps {
	story: CardRecordingFragment;
	hideHat?: boolean;
}

export default function CardStory({
	story,
	hideHat,
}: CardStoryProps): JSX.Element {
	const { sequence } = story;
	const theme = 'story';

	return (
		<CardWithTheme {...{ theme }}>
			{sequence && !hideHat && <CardHatStory sequence={sequence} />}
			<TeaseRecording {...{ recording: story, theme }} />
		</CardWithTheme>
	);
}
