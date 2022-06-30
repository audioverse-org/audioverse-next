import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { generateFeed, sendRSSHeaders } from '@lib/generateFeed';
import getIntl from '@lib/getIntl';
import { getLanguageIdByRouteOrLegacyRoute } from '@lib/getLanguageIdByRouteOrLegacyRoute';
import { getPresenterRecordingsFeedData } from '@containers/presenter/__generated__/recordings';

export default (): void => void 0;

export async function getServerSideProps({
	params,
	res,
}: GetServerSidePropsContext<{ language: string; id: string }>): Promise<
	GetServerSidePropsResult<Record<string, unknown>>
> {
	const id = params?.id as string;
	const languageRoute = params?.language as string;
	const { person } = await getPresenterRecordingsFeedData({
		id,
	}).catch(() => ({
		person: null,
	}));
	if (
		!person ||
		person.language !== getLanguageIdByRouteOrLegacyRoute(params?.language)
	) {
		return {
			notFound: true,
		};
	}

	if (res) {
		sendRSSHeaders(res);
		const intl = await getIntl(languageRoute);
		const feed = await generateFeed(
			languageRoute,
			{
				link: person.canonicalUrl,
				title: intl.formatMessage(
					{ id: 'presentersFeed__title', defaultMessage: 'Sermons by {name}' },
					{ name: person.name }
				),
				description: intl.formatMessage(
					{
						id: 'presentersFeed__description',
						defaultMessage: 'The latest AudioVerse sermons by {name}',
					},
					{ name: person.name }
				),
				image: person.image?.url,
			},
			person.recordings.nodes || []
		);
		res.write(feed);

		res.end();
	}

	return {
		props: {},
	};
}
