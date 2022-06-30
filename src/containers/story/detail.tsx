import withFailStates from '@components/HOCs/withFailStates';
import { Recording } from '@components/organisms/recording';
import { GetStoryDetailDataQuery } from '@containers/story/__generated__/detail';

export interface StoryDetailProps {
	recording: GetStoryDetailDataQuery['story'];
}

export default withFailStates<StoryDetailProps>(Recording, {
	useShould404: (props) => !props.recording,
});
