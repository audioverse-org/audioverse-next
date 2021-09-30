import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { getStoryAlbumFeedData } from '@lib/generated/graphql';
import { generateFeed } from '@lib/generateFeed';
import { formatBooksDescription } from '@pages/[language]/books/[id]/feed.xml';

export default (): void => void 0;

export async function getServerSideProps({
	params,
	res,
}: GetServerSidePropsContext<{ language: string; id: string }>): Promise<
	GetServerSidePropsResult<any>
> {
	const id = params?.id as string;
	const languageRoute = params?.language as string;

	const { storySeason: sequence } = await getStoryAlbumFeedData({
		id,
	}).catch(() => ({
		storySeason: null,
	}));
	if (!sequence) {
		return {
			notFound: true,
		};
	}

	if (res) {
		res.setHeader('Content-Type', 'text/xml');

		const feed = generateFeed(
			languageRoute,
			{
				link: sequence.canonicalUrl,
				title: sequence.title,
				description: formatBooksDescription(languageRoute, sequence),
				image: sequence.image?.url,
			},
			sequence.recordings.nodes || []
		);
		res.write(feed);
		res.end();
	}

	return {
		props: {},
	};
}
