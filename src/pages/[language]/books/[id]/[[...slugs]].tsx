import AudiobookDetail, {
	AudiobookDetailProps,
} from '@containers/audiobook/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getAudiobookDetailPageData,
	getAudiobookDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { makeAudiobookRoute } from '@lib/routes';

export default AudiobookDetail;

type AudiobookStaticProps = StaticProps<AudiobookDetailProps>;

export async function getStaticProps(props: {
	params: { id: string };
}): Promise<AudiobookStaticProps> {
	const { id } = props.params;

	const { audiobook: sequence } = await getAudiobookDetailPageData({
		id,
	}).catch(() => ({
		audiobook: null,
	}));

	return {
		props: {
			sequence,
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
