import withFailStates from '@components/HOCs/withFailStates';
import { Recording } from '@components/organisms/recording';
import { GetAudiobookTrackDetailDataQuery } from '@lib/generated/graphql';

export interface AudiobookTrackDetailProps {
	recording: GetAudiobookTrackDetailDataQuery['audiobookTrack'];
}

export default withFailStates<AudiobookTrackDetailProps>(Recording, {
	should404: (props) => !props.recording,
});
