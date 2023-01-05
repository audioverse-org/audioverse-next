import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { getSponsorTeachingsFeedData } from '@/lib/generated/graphql';
import { generateFeed, sendRSSHeaders } from '@/lib/generateFeed';
import getIntl from '@/lib/getIntl';
import { getLanguageIdByRouteOrLegacyRoute } from '@/lib/getLanguageIdByRouteOrLegacyRoute';

export default (): void => void 0;

export async function getServerSideProps({
	params,
	res,
}: GetServerSidePropsContext<{ language: string; id: string }>): Promise<
	GetServerSidePropsResult<Record<string, unknown>>
> {
	const id = params?.id as string;
	const languageRoute = params?.language as string;

	const { sponsor } = await getSponsorTeachingsFeedData({
		id,
	}).catch(() => ({
		sponsor: null,
	}));
	if (
		!sponsor ||
		sponsor.language !== getLanguageIdByRouteOrLegacyRoute(params?.language)
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
				link: sponsor.canonicalUrl,
				title: intl.formatMessage(
					{
						id: 'sponsorTeachingsFeed__title',
						defaultMessage: 'Sermons by {name}',
					},
					{ name: sponsor.title }
				),
				description: intl.formatMessage(
					{
						id: 'sponsorTeachingsFeed__description',
						defaultMessage: 'The latest recordings from {title} at AudioVerse',
					},
					{ title: sponsor.title }
				),
			},
			sponsor.recordings.nodes || []
		);
		res.write(feed);

		res.end();
	}

	return {
		props: {},
	};
}
