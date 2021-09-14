import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { getSermonListStaticProps } from '@lib/generated/graphql';
import { generateFeed } from '@lib/generateFeed';
import getIntl from '@lib/getIntl';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

export default (): void => void 0;

export async function getServerSideProps({
	params,
	res,
}: GetServerSidePropsContext<{ language: string }>): Promise<
	GetServerSidePropsResult<any>
> {
	const languageRoute = params?.language as string;
	const { sermons } = await getSermonListStaticProps({
		offset: 0,
		first: 25,
		language: getLanguageIdByRoute(languageRoute),
		hasVideo: null,
	});

	if (res) {
		res.setHeader('Content-Type', 'text/xml');

		const intl = getIntl(languageRoute);
		const feed = generateFeed(
			intl.formatMessage({
				id: 'sermons-all-rss-identifier',
				defaultMessage: 'All Teachings',
				description: 'All teachings RSS feed pretty identifier',
			}),
			sermons.nodes || [],
			languageRoute
		);
		res.write(feed);

		res.end();
	}

	return {
		props: {},
	};
}
