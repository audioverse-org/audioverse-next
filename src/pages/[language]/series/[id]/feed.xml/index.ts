import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { getSeriesFeedData } from '@lib/generated/graphql';
import { generateFeed } from '@lib/generateFeed';

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
	if (!series) {
		return {
			notFound: true,
		};
	}

	if (res) {
		res.setHeader('Content-Type', 'text/xml');

		const feed = generateFeed(
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
