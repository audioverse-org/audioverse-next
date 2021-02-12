import React from 'react';
import { GetStoryDetailPageDataQuery } from '@lib/generated/graphql';
import { Recording } from '@components/organisms/recording';
import withFailStates from '@components/HOCs/withFailStates';

type Story = NonNullable<GetStoryDetailPageDataQuery['story']>;

export interface StoryProps {
	story: Story | null;
}

function Story({ story }: StoryProps): JSX.Element {
	return <>{story && <Recording recording={story} />}</>;
}

export default withFailStates(Story, ({ story }) => !story);
