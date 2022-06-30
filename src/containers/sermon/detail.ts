import withFailStates from '@components/HOCs/withFailStates';
import { Recording, RecordingProps } from '@components/organisms/recording';
import { Maybe } from '@src/__generated__/graphql';

export type SermonDetailProps = {
	recording: Maybe<RecordingProps['recording']>;
};

export default withFailStates<SermonDetailProps>(Recording, {
	useShould404: (props) => !props.recording,
});
