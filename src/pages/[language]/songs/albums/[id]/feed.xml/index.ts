import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { generateFeed, sendRSSHeaders } from '@lib/generateFeed';
import { getLanguageIdByRouteOrLegacyRoute } from '@lib/getLanguageIdByRouteOrLegacyRoute';
import { getSongAlbumFeedData } from '@containers/song/albums/__generated__/detail';

export default (): void => void 0;

export async function getServerSideProps({
	params,
	res,
}: GetServerSidePropsContext<{ language: string; id: string }>): Promise<
	GetServerSidePropsResult<Record<string, unknown>>
> {
	const id = params?.id as string;
	const languageRoute = params?.language as string;
	const { musicAlbum: series } = await getSongAlbumFeedData({ id }).catch(
		() => ({
			musicAlbum: null,
		})
	);
	if (
		!series ||
		series.language !== getLanguageIdByRouteOrLegacyRoute(params?.language)
	) {
		return {
			notFound: true,
		};
	}

	if (res) {
		sendRSSHeaders(res);

		const feed = await generateFeed(
			languageRoute,
			{
				link: series.canonicalUrl,
				title: series.title,
			},
			series.recordings.nodes || []
		);
		res.write(feed);

		res.end();
	}

	return {
		props: {},
	};
}
