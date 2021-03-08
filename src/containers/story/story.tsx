import React from 'react';

import withFailStates from '@components/HOCs/withFailStates';
import Playlist from '@components/organisms/playlist';
import { Recording } from '@components/organisms/recording';
import { GetStoryDetailPageDataQuery } from '@lib/generated/graphql';

type Story = NonNullable<GetStoryDetailPageDataQuery['story']>;

export interface StoryProps {
	story: Story | null;
}

function Story({ story }: StoryProps): JSX.Element {
	const recordings = story?.sequence?.recordings.nodes || [];

	return (
		<Playlist recordings={recordings} initial={story?.id}>
			{(recording) => <Recording recording={recording} />}
		</Playlist>
	);
}

export default withFailStates(Story, ({ story }) => !story);
