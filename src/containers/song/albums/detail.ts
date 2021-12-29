import withFailStates from '@components/HOCs/withFailStates';
import { Sequence } from '@components/organisms/sequence';
import type { GetSongAlbumsDetailPageDataQuery } from '@lib/generated/graphql';

export interface SongAlbumDetailProps {
	sequence: GetSongAlbumsDetailPageDataQuery['musicAlbum'];
}

export default withFailStates<SongAlbumDetailProps>(
	Sequence,
	({ sequence }) => !sequence
);
