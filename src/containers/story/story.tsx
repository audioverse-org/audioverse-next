import React from 'react';

import withFailStates from '@components/HOCs/withFailStates';
import { Recording } from '@components/organisms/recording';
import { GetStoryDetailPageDataQuery } from '@lib/generated/graphql';

type Story = NonNullable<GetStoryDetailPageDataQuery['story']>;

export interface StoryProps {
	story: Story | null;
}

function Story({ story }: StoryProps): JSX.Element {
	return <>{story && <Recording recording={story} />}</>;
}

export default withFailStates(Story, ({ story }) => !story);
