import withFailStates from '@components/HOCs/withFailStates';
import { Sequence } from '@components/organisms/sequence';
import { GetStoryAlbumDetailPageDataQuery } from '@lib/generated/graphql';

export interface StoryAlbumDetailProps {
	sequence: GetStoryAlbumDetailPageDataQuery['storySeason'];
	title?: string;
}

export default withFailStates<StoryAlbumDetailProps>(
	Sequence,
	(props) => !props.sequence
);
