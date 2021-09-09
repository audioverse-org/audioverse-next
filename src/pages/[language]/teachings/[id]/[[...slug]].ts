import SermonDetail, { SermonDetailProps } from '@containers/sermon/detail';
import { REVALIDATE } from '@lib/constants';
import {
	getSermonDetailData,
	getSermonDetailStaticPaths,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { makeSermonRoute } from '@lib/routes';

export default SermonDetail;

export type SermonStaticProps = StaticProps<
	SermonDetailProps & {
		title?: string;
	}
>;

export async function getStaticProps({
	params,
}: {
	params: { id: string };
}): Promise<SermonStaticProps> {
	const { id } = params;
	const { sermon: recording } = await getSermonDetailData({ id }).catch(() => ({
		sermon: null,
	}));

	return {
		props: {
			recording,
			title: recording?.title,
		},
		revalidate: REVALIDATE,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getSermonDetailStaticPaths,
		(d) => d.sermons.nodes,
		(baseUrl, node) => makeSermonRoute(baseUrl, node.id)
	);
}
