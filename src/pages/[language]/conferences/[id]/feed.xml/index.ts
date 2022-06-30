import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { generateFeed, sendRSSHeaders } from '@lib/generateFeed';
import { getLanguageIdByRouteOrLegacyRoute } from '@lib/getLanguageIdByRouteOrLegacyRoute';
import { getCollectionFeedData } from '@containers/collection/__generated__/detail';

export default function Feed(): void {
	return void 0;
}

export async function getServerSideProps({
	params,
	res,
}: GetServerSidePropsContext<{ language: string; id: string }>): Promise<
	GetServerSidePropsResult<Record<string, unknown>>
> {
	const id = params?.id as string;
	const languageRoute = params?.language as string;

	const { collection } = await getCollectionFeedData({
		id,
	}).catch(() => ({
		collection: null,
	}));
	if (
		!collection ||
		collection.language !== getLanguageIdByRouteOrLegacyRoute(languageRoute)
	) {
		return {
			notFound: true,
		};
	}

	if (res) {
		sendRSSHeaders(res);

		const feed = await generateFeed(
			languageRoute,
			{
				link: collection.canonicalUrl,
				title: collection.title,
				image: collection.image?.url,
			},
			collection.recordings.nodes || []
		);
		res.write(feed);

		res.end();
	}

	return {
		props: {},
	};
}
