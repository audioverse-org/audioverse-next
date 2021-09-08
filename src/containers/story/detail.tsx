import withFailStates from '@components/HOCs/withFailStates';
import { Recording } from '@components/organisms/recording';
import { GetStoryDetailDataQuery } from '@lib/generated/graphql';

export interface StoryDetailProps {
	recording: GetStoryDetailDataQuery['story'];
	title?: string;
}

export default withFailStates<StoryDetailProps>(
	Recording,
	(props) => !props.recording
);
