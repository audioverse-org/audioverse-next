import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { getStoryAlbumFeedData } from '@lib/generated/graphql';
import { generateFeed, sendRSSHeaders } from '@lib/generateFeed';
import { getLanguageIdByLegacyRoute } from '@lib/getLanguageIdByLegacyRoute';
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
		sequence.language !== getLanguageIdByLegacyRoute(languageRoute)
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
