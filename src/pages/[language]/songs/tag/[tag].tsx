import SongDetail, { SongDetailProps } from '@containers/song/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getSongDetailTagPageData,
	getSongDetailTagPathsData,
} from '@lib/generated/graphql';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { makeTagMusicRoute } from '@lib/routes';

export default SongDetail;

export async function getStaticProps({
	params,
}: {
	params: { language: string; tag: string };
}): Promise<StaticProps<SongDetailProps>> {
	const { language, tag } = params;
	const languageId = getLanguageIdByRoute(language);

	let response;
	try {
		response = await getSongDetailTagPageData({
			language: languageId,
			tag,
		});
	} catch {
		// do nothing
	}

	return {
		props: {
			songs: response?.musicTracks.nodes || [],
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getSongDetailTagPathsData,
		'musicMoodTags.nodes',
		(languageRoute, node) => makeTagMusicRoute(languageRoute, node.name)
	);
}
