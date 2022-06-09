import withFailStates from '@components/HOCs/withFailStates';
import { Sequence } from '@components/organisms/sequence';
import { GetAudiobookDetailPageDataQuery } from '@containers/audiobook/detail.gql';

export interface AudiobookDetailProps {
	sequence: GetAudiobookDetailPageDataQuery['audiobook'];
}

export default withFailStates<AudiobookDetailProps>(
	Sequence,
	(props) => !props.sequence
);
