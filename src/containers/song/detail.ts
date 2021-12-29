import withFailStates from '@components/HOCs/withFailStates';
import { Recording } from '@components/organisms/recording';
import type { GetSongDetailDataQuery } from '@lib/generated/graphql';

export type SongTrack = NonNullable<GetSongDetailDataQuery['musicTrack']>;

export interface SongDetailProps {
	recording: SongTrack | null;
}

export default withFailStates<SongDetailProps>(
	Recording,
	(props) => !props.recording
);
