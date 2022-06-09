import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { getStoryAlbumFeedData } from '@containers/story/albums/detail.gql';
import { generateFeed, sendRSSHeaders } from '@lib/generateFeed';
import { getLanguageIdByRouteOrLegacyRoute } from '@lib/getLanguageIdByRouteOrLegacyRoute';
import { formatBooksDescription } from '@pages/[language]/books/[id]/feed.xml';

export default (): void => void 0;

export async function getServerSideProps({
	params,
	res,
}: GetServerSidePropsContext<{ language: string; id: string }>): Promise<
	GetServerSidePropsResult<Record<string, unknown>>
> {
	const id = params?.id as string;
	const languageRoute = params?.language as string;

	const { storySeason: sequence } = await getStoryAlbumFeedData({
		id,
	}).catch(() => ({
		storySeason: null,
	}));
	if (
		!sequence ||
		sequence.language !== getLanguageIdByRouteOrLegacyRoute(languageRoute)
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
				link: sequence.canonicalUrl,
				title: sequence.title,
				description: await formatBooksDescription(languageRoute, sequence),
				image: sequence.image?.url,
			},
			sequence.recordings.nodes || []
		);
		res.write(feed);
		res.end();
	}

	return {
		props: {},
	};
}
