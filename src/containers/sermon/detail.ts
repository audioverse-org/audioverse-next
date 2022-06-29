import withFailStates from '@components/HOCs/withFailStates';
import { Recording, RecordingProps } from '@components/organisms/recording';
import { Maybe } from '@lib/generated/graphql';

export type SermonDetailProps = {
	recording: Maybe<RecordingProps['recording']>;
};

export default withFailStates<SermonDetailProps>(Recording, {
	useShould404: (props) => !props.recording,
});
