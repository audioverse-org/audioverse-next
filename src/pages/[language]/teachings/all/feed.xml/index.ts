import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { getSermonListStaticProps } from '@lib/generated/graphql';
import { generateFeed } from '@lib/generateFeed';
import getIntl from '@lib/getIntl';
import getLanguageByBaseUrl from '@lib/getLanguageByBaseUrl';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';
import { makeSermonListRoute } from '@lib/routes';

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
		const language = getLanguageByBaseUrl(languageRoute, 'en')?.display_name;
		const feed = generateFeed(
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
