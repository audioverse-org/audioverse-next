import Song, { SongDetailProps } from '@containers/song/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getSongSponsorPageData,
	getSongSponsorPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { makeSponsorMusicRoute } from '@lib/routes';

export default Song;

export async function getStaticProps({
	params,
}: {
	params: { language: string; id: string };
}): Promise<StaticProps<SongDetailProps>> {
	const { id } = params;

	let response = undefined;

	try {
		response = await getSongSponsorPageData({ id });
	} catch {
		// do nothing
	}

	return {
		props: { songs: response?.sponsor?.recordings.nodes || [] },
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getSongSponsorPathsData,
		'sponsors.nodes',
		(languageRoute, node) => makeSponsorMusicRoute(languageRoute, node.id)
	);
}
