import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { getSponsorTeachingsPageData } from '@lib/generated/graphql';
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

	const { sponsor } = await getSponsorTeachingsPageData({
		id,
		offset: 0,
		first: 25,
	}).catch(() => ({
		sponsor: null,
	}));
	if (!sponsor) {
		return {
			notFound: true,
		};
	}

	if (res) {
		res.setHeader('Content-Type', 'text/xml');

		const feed = generateFeed(
			sponsor.title,
			sponsor.recordings.nodes || [],
			languageRoute
		);
		res.write(feed);

		res.end();
	}

	return {
		props: {},
	};
}
