import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { getCollectionFeedData } from '@lib/generated/graphql';
import { generateFeed } from '@lib/generateFeed';
import { getLanguageIdByRoute } from '@lib/getLanguageIdByRoute';

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
		collection.language !== getLanguageIdByRoute(languageRoute)
	) {
		return {
			notFound: true,
		};
	}

	if (res) {
		res.setHeader('Content-Type', 'text/xml');

		const feed = generateFeed(
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
