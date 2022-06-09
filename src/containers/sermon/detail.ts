import withFailStates from '@components/HOCs/withFailStates';
import { Recording } from '@components/organisms/recording';
import { GetSermonDetailDataQuery } from '@containers/sermon/detail.gql';

export interface SermonDetailProps {
	recording: GetSermonDetailDataQuery['sermon'];
}

export default withFailStates<SermonDetailProps>(
	Recording,
	(props) => !props.recording
);
