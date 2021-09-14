import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { getPresenterRecordingsPageData } from '@lib/generated/graphql';
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
	const { person } = await getPresenterRecordingsPageData({
		id,
		offset: 0,
		first: 25,
	}).catch(() => ({
		person: null,
	}));

	if (res && person) {
		res.setHeader('Content-Type', 'text/xml');

		const feed = generateFeed(
			person.name,
			person.recordings.nodes || [],
			languageRoute
		);
		res.write(feed);

		res.end();
	}

	return {
		props: {},
	};
}
