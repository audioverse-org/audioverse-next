import withFailStates from '@components/HOCs/withFailStates';
import { Sequence } from '@components/organisms/sequence';
import { GetAudiobookDetailPageDataQuery } from '@lib/generated/graphql';

export interface AudiobookDetailProps {
	sequence: GetAudiobookDetailPageDataQuery['audiobook'];
}

export default withFailStates<AudiobookDetailProps>(Sequence, {
	should404: (props) => !props.sequence,
});
