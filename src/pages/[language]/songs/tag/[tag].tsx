import SongDetail, { SongDetailProps } from '@containers/song/detail';
import { REVALIDATE } from '@lib/constants';

export default SongDetail;

export async function getStaticProps(): Promise<StaticProps<SongDetailProps>> {
	return {
		props: {
			songs: [],
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return {
		paths: [],
		fallback: true,
	};
}
