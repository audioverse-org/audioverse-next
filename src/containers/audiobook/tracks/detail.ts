import withFailStates from '@components/HOCs/withFailStates';
import { Recording } from '@components/organisms/recording';
import { GetAudiobookTrackDetailDataQuery } from '@containers/audiobook/tracks/detail.gql';

export interface AudiobookTrackDetailProps {
	recording: GetAudiobookTrackDetailDataQuery['audiobookTrack'];
}

export default withFailStates<AudiobookTrackDetailProps>(
	Recording,
	(props) => !props.recording
);
