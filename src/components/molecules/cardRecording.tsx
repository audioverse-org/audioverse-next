import React from 'react';

import Card from '@components/molecules/card';
import { CardRecordingFragment } from '@lib/generated/graphql';

import ListIcon from '../../../public/img/icon-list-alt-solid.svg';

// TODO:
// Only show top hat of container exists
// Show speakers dynamically
// Dynamically render progress bar
// Dynamically render all content

interface CardRecordingProps {
	recording: CardRecordingFragment;
}

export default function CardRecording({
	recording,
}: CardRecordingProps): JSX.Element {
	const container = recording.sequence
		? {
				icon: <ListIcon width={12} height={12} />,
				title: recording.sequence.title,
				length: recording.sequence.recordings.aggregate?.count,
				// TODO: set index dynamically
				index: 1,
		  }
		: undefined;

	return (
		<Card
			container={container}
			// TODO: set progress dynamically
			progress={0}
			{...recording}
		/>
	);
}
