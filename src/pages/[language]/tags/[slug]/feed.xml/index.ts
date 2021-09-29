import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { getTagDetailPageData } from '@lib/generated/graphql';
import { generateFeed } from '@lib/generateFeed';
import getIntl from '@lib/getIntl';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { makeTagListRoute } from '@lib/routes';

export default (): void => void 0;

export async function getServerSideProps({
	params,
	res,
}: GetServerSidePropsContext<{ language: string; slug: string }>): Promise<
	GetServerSidePropsResult<any>
> {
	const languageRoute = params?.language as string;
	const slug = params?.slug as string;
	const tag = decodeURIComponent(slug);

	const { recordings } = await getTagDetailPageData({
		language: getLanguageIdByRoute(languageRoute),
		tagName: tag,
		first: 25,
		offset: 0,
	});

	if (res) {
		const intl = getIntl(languageRoute);

		const title = intl.formatMessage(
			{
				id: 'tag-feed-title',
				defaultMessage: 'Recordings Tagged {tag}',
				description: 'Tag feed title',
			},
			{
				tag,
			}
		);
		res.setHeader('Content-Type', 'text/xml');

		const feed = generateFeed(
			languageRoute,
			{
				link: `https://www.audioverse.org${makeTagListRoute(languageRoute)}`,
				title,
			},
			recordings.nodes || []
		);
		res.write(feed);

		res.end();
	}

	return {
		props: {},
	};
}
