import withFailStates from '@components/HOCs/withFailStates';
import { Sequence } from '@components/organisms/sequence';
import { GetSongAlbumsDetailPageDataQuery } from '@containers/song/albums/detail.gql';

export interface SongAlbumDetailProps {
	sequence: GetSongAlbumsDetailPageDataQuery['musicAlbum'];
}

export default withFailStates<SongAlbumDetailProps>(
	Sequence,
	({ sequence }) => !sequence
);
