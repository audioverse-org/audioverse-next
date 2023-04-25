import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { getSermonListFeedData } from '~containers/sermon/__generated__/list';
import { LANGUAGES } from '~lib/constants';
import { generateFeed, sendRSSHeaders } from '~lib/generateFeed';
import getIntl from '~lib/getIntl';
import { getLanguageIdByRouteOrLegacyRoute } from '~lib/getLanguageIdByRouteOrLegacyRoute';
import root from '~lib/routes';

export default (): void => void 0;

export async function getServerSideProps({
	params,
	res,
}: GetServerSidePropsContext<{ language: string }>): Promise<
	GetServerSidePropsResult<Record<string, unknown>>
> {
	const languageRoute = params?.language as string;
	const languageId = getLanguageIdByRouteOrLegacyRoute(languageRoute);
	if (!languageId) {
		return {
			notFound: true,
		};
	}
	const { sermons } = await getSermonListFeedData({
		language: languageId,
	});

	if (res) {
		sendRSSHeaders(res);
		const intl = await getIntl(languageRoute);
		const language = LANGUAGES[languageId].display_name;
		const link = `https://www.audioverse.org${root
			.lang(languageRoute)
			.teachings.all.get()}`;
		const feed = await generateFeed(
			languageRoute,
			{
				link,
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
