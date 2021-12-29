import withFailStates from '@components/HOCs/withFailStates';
import { Recording } from '@components/organisms/recording';
import type { GetStoryDetailDataQuery } from '@lib/generated/graphql';

export interface StoryDetailProps {
	recording: GetStoryDetailDataQuery['story'];
}

export default withFailStates<StoryDetailProps>(
	Recording,
	(props) => !props.recording
);
