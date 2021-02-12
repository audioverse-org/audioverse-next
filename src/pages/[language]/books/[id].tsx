import Audiobook, { AudiobookProps } from '@containers/audiobook/audiobook';
import { REVALIDATE } from '@lib/constants';
import createFeed from '@lib/createFeed';
import {
	getAudiobookDetailPageData,
	getAudiobookDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import getIntl from '@lib/getIntl';
import { makeAudiobookRoute } from '@lib/routes';

export default Audiobook;

interface StaticProps {
	props: AudiobookProps;
	revalidate: number;
}

export interface GetStaticPropsArgs {
	params: {
		language: string;
		id: string;
	};
}

const generateRssFeed = async (
	params: GetStaticPropsArgs['params'],
	audiobook: AudiobookProps['audiobook']
) => {
	const { id, language: languageRoute } = params;

	const intl = getIntl(languageRoute);

	const title = intl.formatMessage(
		{
			id: 'audiobook-feed-title',
			defaultMessage: '{title} : AudioVerse audiobook',
			description: 'Audiobook feed title',
		},
		{
			title: audiobook?.title,
		}
	);

	const webPath = `/${languageRoute}/books/${id}.xml`;

	if (audiobook?.recordings.nodes) {
		await createFeed({
			recordings: audiobook?.recordings.nodes,
			projectRelativePath: `public${webPath}`,
			title,
		});
	}

	return webPath;
};

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps> {
	const { id } = params;

	const { audiobook = undefined } =
		(await getAudiobookDetailPageData({ id })) || {};

	const rssPath = await generateRssFeed(params, audiobook);

	return {
		props: { audiobook, rssPath },
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getAudiobookDetailPathsData,
		'audiobooks.nodes',
		(languageRoute, node) => makeAudiobookRoute(languageRoute, node.id)
	);
}
