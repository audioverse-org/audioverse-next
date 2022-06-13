import withFailStates from '@components/HOCs/withFailStates';
import { Recording } from '@components/organisms/recording';
import { GetSermonDetailDataQuery } from '@lib/generated/graphql';

export interface SermonDetailProps {
	recording: GetSermonDetailDataQuery['sermon'];
}

export default withFailStates<SermonDetailProps>(Recording, {
	useShould404: (props) => !props.recording,
});
