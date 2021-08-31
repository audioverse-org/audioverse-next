import React from 'react';

import CardWithPlayable from '@components/molecules/card/base/withPlayable';
import { CardSermonFragment } from '@lib/generated/graphql';
import { makeSermonRoute } from '@lib/routes';
import useLanguageRoute from '@lib/useLanguageRoute';

import ListIcon from '../../../../public/img/icon-list-alt-solid.svg';

// TODO:
// Only show top hat of container exists
// Show speakers dynamically
// Dynamically render progress bar
// Dynamically render all content

interface CardSermonProps {
	recording: CardSermonFragment;
	hideHat?: boolean;
}

export default function CardSermon({
	recording,
	hideHat,
}: CardSermonProps): JSX.Element {
	const languageRoute = useLanguageRoute();
	const container = recording.sequence
		? {
				icon: <ListIcon width={12} height={12} />,
				title: recording.sequence.title,
				length: recording.sequence.recordings.aggregate?.count,
				index: recording.sequenceIndex,
		  }
		: undefined;

	return (
		<CardWithPlayable
			recording={recording}
			url={makeSermonRoute(languageRoute, recording.id)}
			container={container}
			// TODO: set progress dynamically
			progress={0}
			theme={'sermon'}
			{...recording}
			hideHat={hideHat}
		/>
	);
}
