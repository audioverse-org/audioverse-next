import withFailStates from '@components/HOCs/withFailStates';
import { Recording } from '@components/organisms/recording';
import { GetStoryDetailDataQuery } from '@lib/generated/graphql';

export interface StoryDetailProps {
	recording: GetStoryDetailDataQuery['story'];
}

export default withFailStates<StoryDetailProps>(Recording, {
	useShould404: (props) => !props.recording,
});
