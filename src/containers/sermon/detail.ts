import withFailStates from '@components/HOCs/withFailStates';
import { Recording } from '@components/organisms/recording';
import type { GetSermonDetailDataQuery } from '@lib/generated/graphql';

export interface SermonDetailProps {
	recording: GetSermonDetailDataQuery['sermon'];
}

export default withFailStates<SermonDetailProps>(
	Recording,
	(props) => !props.recording
);
