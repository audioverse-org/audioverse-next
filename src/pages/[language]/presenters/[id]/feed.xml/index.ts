import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { getPresenterRecordingsFeedData } from '@lib/generated/graphql';
import { generateFeed } from '@lib/generateFeed';
import getIntl from '@lib/getIntl';
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
	const { person } = await getPresenterRecordingsFeedData({
		id,
	}).catch(() => ({
		person: null,
	}));
	if (!person || person.language !== getLanguageIdByRoute(params?.language)) {
		return {
			notFound: true,
		};
	}

	if (res) {
		res.setHeader('Content-Type', 'text/xml');
		const intl = await getIntl(languageRoute);
		const feed = generateFeed(
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
