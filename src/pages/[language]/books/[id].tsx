import Audiobook, { AudiobookProps } from '@containers/audiobook/audiobook';
import { REVALIDATE } from '@lib/constants';
import {
	getAudiobookDetailPageData,
	getAudiobookDetailPathsData,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
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

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps> {
	const { id } = params;

	const { audiobook = undefined } =
		(await getAudiobookDetailPageData({ id })) || {};

	return {
		props: { audiobook },
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
