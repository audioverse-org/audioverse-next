import withFailStates from '@components/HOCs/withFailStates';
import { Recording } from '@components/organisms/recording';
import { GetSongDetailDataQuery } from '@lib/generated/graphql';

export type SongTrack = NonNullable<GetSongDetailDataQuery['musicTrack']>;

export interface SongDetailProps {
	recording: SongTrack | null | undefined;
}

export default withFailStates<SongDetailProps>(Recording, {
	useShould404: (props) => !props.recording,
});
