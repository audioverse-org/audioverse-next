import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { getAudiobookDetailPageData } from '@lib/generated/graphql';
import { generateFeed } from '@lib/generateFeed';

export default (): void => void 0;

export async function getServerSideProps({
	params,
	res,
}: GetServerSidePropsContext<{ language: string; id: string }>): Promise<
	GetServerSidePropsResult<any>
> {
	const id = params?.id as string;
	const languageRoute = params?.language as string;

	const { audiobook: sequence } = await getAudiobookDetailPageData({
		id,
	}).catch(() => ({
		audiobook: null,
	}));
	if (!sequence) {
		return {
			notFound: true,
		};
	}

	if (res) {
		res.setHeader('Content-Type', 'text/xml');

		const feed = generateFeed(
			sequence.title,
			sequence.recordings.nodes || [],
			languageRoute
		);
		res.write(feed);

		res.end();
	}

	return {
		props: {},
	};
}
