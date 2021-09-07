import AudiobookDetail, {
	AudiobookDetailProps,
} from '@containers/audiobook/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getAudiobookDetailPageData,
	GetAudiobookDetailPageDataQuery,
	getAudiobookDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import getIntl from '@lib/getIntl';
import { makeAudiobookRoute } from '@lib/routes';
import writeFeedFile from '@lib/writeFeedFile';

export default AudiobookDetail;

export interface GetStaticPropsArgs {
	params: {
		language: string;
		id: string;
	};
}

export type AudiobookStaticProps = StaticProps<
	AudiobookDetailProps & { rssPath: string }
>;

export async function getStaticProps(props: {
	params: { language: string; id: string };
}): Promise<AudiobookStaticProps> {
	const { id } = props.params;

	const { audiobook: sequence } = await getAudiobookDetailPageData({
		id,
	}).catch(() => ({
		audiobook: null,
	}));

	const rssPath = await generateRssFeed(props.params, sequence);

	return {
		props: {
			sequence,
			rssPath,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getAudiobookDetailPathsData,
		(d) => d.audiobooks.nodes,
		(l, n) => makeAudiobookRoute(l, n.id)
	);
}

const generateRssFeed = async (
	params: GetStaticPropsArgs['params'],
	audiobook: GetAudiobookDetailPageDataQuery['audiobook']
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
		await writeFeedFile({
			recordings: audiobook?.recordings.nodes,
			projectRelativePath: `public${webPath}`,
			title,
		});
	}

	return webPath;
};
