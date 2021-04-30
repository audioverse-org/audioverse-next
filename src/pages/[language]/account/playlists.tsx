import { GetServerSidePropsResult } from 'next';

import Playlists from '@containers/account/playlists';

export default Playlists;

export async function getServerSideProps(): Promise<
	GetServerSidePropsResult<any>
> {
	return {
		props: {},
	};
}
