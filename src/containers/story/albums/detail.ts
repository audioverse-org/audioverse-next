import withFailStates from '@components/HOCs/withFailStates';
import { Sequence } from '@components/organisms/sequence';
import { GetStoryAlbumDetailPageDataQuery } from '@containers/story/albums/detail.gql';

export interface StoryAlbumDetailProps {
	sequence: GetStoryAlbumDetailPageDataQuery['storySeason'];
}

export default withFailStates<StoryAlbumDetailProps>(
	Sequence,
	(props) => !props.sequence
);
