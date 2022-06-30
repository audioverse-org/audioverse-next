import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { generateFeed, sendRSSHeaders } from '@lib/generateFeed';
import { getLanguageIdByRouteOrLegacyRoute } from '@lib/getLanguageIdByRouteOrLegacyRoute';
import { getSeriesFeedData } from '@containers/series/__generated__/detail';

export default (): void => void 0;

export async function getServerSideProps({
	params,
	res,
}: GetServerSidePropsContext<{ language: string; id: string }>): Promise<
	GetServerSidePropsResult<Record<string, unknown>>
> {
	const id = params?.id as string;
	const languageRoute = params?.language as string;
	const { series } = await getSeriesFeedData({ id }).catch(() => ({
		series: null,
	}));
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
