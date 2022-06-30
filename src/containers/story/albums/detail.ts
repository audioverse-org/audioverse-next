import withFailStates from '@components/HOCs/withFailStates';
import { Sequence } from '@components/organisms/sequence';
import { GetStoryAlbumDetailPageDataQuery } from '@containers/story/albums/__generated__/detail';

export interface StoryAlbumDetailProps {
	sequence: GetStoryAlbumDetailPageDataQuery['storySeason'];
}

export default withFailStates<StoryAlbumDetailProps>(Sequence, {
	useShould404: (props) => !props.sequence,
});
