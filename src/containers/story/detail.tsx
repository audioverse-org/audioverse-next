import withFailStates from '@components/HOCs/withFailStates';
import { Recording } from '@components/organisms/recording';
import { GetStoryDetailDataQuery } from '@containers/story/detail.gql';

export interface StoryDetailProps {
	recording: GetStoryDetailDataQuery['story'];
}

export default withFailStates<StoryDetailProps>(
	Recording,
	(props) => !props.recording
);
