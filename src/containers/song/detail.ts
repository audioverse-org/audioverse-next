import withFailStates from '@components/HOCs/withFailStates';
import { Recording } from '@components/organisms/recording';
import { GetSongDetailDataQuery } from '@containers/song/detail.gql';

export type SongTrack = NonNullable<GetSongDetailDataQuery['musicTrack']>;

export interface SongDetailProps {
	recording: SongTrack | null | undefined;
}

export default withFailStates<SongDetailProps>(
	Recording,
	(props) => !props.recording
);
