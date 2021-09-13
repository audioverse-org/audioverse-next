import AudiobookDetail, {
	AudiobookDetailProps,
} from '@containers/audiobook/detail';
import { REVALIDATE } from '@lib/constants';
import { createFeed } from '@lib/createFeed';
import {
	getAudiobookDetailPageData,
	getAudiobookDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { makeAudiobookRoute } from '@lib/routes';

export default AudiobookDetail;

export interface GetStaticPropsArgs {
	params: {
		language: string;
		id: string;
	};
}

export type AudiobookStaticProps = StaticProps<
	AudiobookDetailProps & { rssPath: string | null }
>;

export async function getStaticProps(props: {
	params: { language: string; id: string };
}): Promise<AudiobookStaticProps> {
	const { id, language } = props.params;

	const { audiobook: sequence } = await getAudiobookDetailPageData({
		id,
	}).catch(() => ({
		audiobook: null,
	}));

	const rssPath = await createFeed(
		sequence?.title,
		props.params,
		sequence?.recordings.nodes || [],
		`/${language}/books/${id}.xml`
	);

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
