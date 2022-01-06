import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { getSermonListFeedData } from '@lib/generated/graphql';
import { generateFeed, sendRSSHeaders } from '@lib/generateFeed';
import getIntl from '@lib/getIntl';
import getLanguageByBaseUrl from '@lib/getLanguageByBaseUrl';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { makeSermonListRoute } from '@lib/routes';

export default (): void => void 0;

export async function getServerSideProps({
	params,
	res,
}: GetServerSidePropsContext<{ language: string }>): Promise<
	GetServerSidePropsResult<Record<string, unknown>>
> {
	const languageRoute = params?.language as string;
	const { sermons } = await getSermonListFeedData({
		language: getLanguageIdByRoute(languageRoute),
	});

	if (res) {
		sendRSSHeaders(res);
		const intl = await getIntl(languageRoute);
		const language = getLanguageByBaseUrl(languageRoute, 'en')?.display_name;
		const feed = await generateFeed(
			languageRoute,
			{
				link: `https://www.audioverse.org${makeSermonListRoute(languageRoute)}`,
				title: intl.formatMessage(
					{
						id: 'teachingsFeed__title',
						defaultMessage: 'AudioVerse Presentations ({language})',
					},
					{ language }
				),
				description: intl.formatMessage(
					{
						id: 'teachingsFeed__description',
						defaultMessage: 'AudioVerse Presentation in {language}',
					},
					{ language }
				),
			},
			sermons.nodes || []
		);
		res.write(feed);

		res.end();
	}

	return {
		props: {},
	};
}
