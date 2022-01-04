import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { getSeriesFeedData } from '@lib/generated/graphql';
import { generateFeed } from '@lib/generateFeed';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

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
	if (!series || series.language !== getLanguageIdByRoute(params?.language)) {
		return {
			notFound: true,
		};
	}

	if (res) {
		res.setHeader('Content-Type', 'text/xml');

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
