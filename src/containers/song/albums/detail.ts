import withFailStates from '@components/HOCs/withFailStates';
import { Sequence } from '@components/organisms/sequence';
import { GetSongAlbumsDetailPageDataQuery } from './__generated__/detail';

export interface SongAlbumDetailProps {
	sequence: GetSongAlbumsDetailPageDataQuery['musicAlbum'];
}

export default withFailStates<SongAlbumDetailProps>(Sequence, {
	useShould404: ({ sequence }) => !sequence,
});
