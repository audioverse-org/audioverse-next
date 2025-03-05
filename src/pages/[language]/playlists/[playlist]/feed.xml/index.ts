import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { generateFeed, sendRSSHeaders } from '~lib/generateFeed';
import { getPlaylistFeedData } from '~src/containers/library/playlist/__generated__/detail';
import root from '~src/lib/routes';

export default (): void => void 0;

export async function getServerSideProps({
	params,
	res,
}: GetServerSidePropsContext<{ language: string; playlist: string }>): Promise<
	GetServerSidePropsResult<Record<string, unknown>>
> {
	const id = params?.playlist as string;
	const languageRoute = params?.language as string;

	const { playlist } = await getPlaylistFeedData({
		id,
	}).catch(() => ({
		playlist: null,
	}));

	if (!playlist) {
		return {
			notFound: true,
		};
	}

	if (res) {
		sendRSSHeaders(res);

		const feed = await generateFeed(
			languageRoute,
			{
				link: root.lang(languageRoute).playlists.playlist(id).get(),
				title: playlist.title,
				description: playlist.summary,
			},
			playlist.recordings.nodes || [],
		);
		res.write(feed);

		res.end();
	}

	return {
		props: {},
	};
}
