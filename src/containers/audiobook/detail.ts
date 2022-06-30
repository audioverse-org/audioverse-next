import withFailStates from '@components/HOCs/withFailStates';
import { Sequence } from '@components/organisms/sequence';
import { GetAudiobookDetailPageDataQuery } from '@containers/audiobook/__generated__/detail';

export interface AudiobookDetailProps {
	sequence: GetAudiobookDetailPageDataQuery['audiobook'];
}

export default withFailStates<AudiobookDetailProps>(Sequence, {
	useShould404: (props) => !props.sequence,
});
