import withFailStates from '@components/HOCs/withFailStates';
import { Sequence } from '@components/organisms/sequence';
import { GetStoryAlbumDetailPageDataQuery } from '@lib/generated/graphql';

export interface StoryAlbumDetailProps {
	sequence: GetStoryAlbumDetailPageDataQuery['storySeason'];
}

export default withFailStates<StoryAlbumDetailProps>(Sequence, {
	useShould404: (props) => !props.sequence,
});
