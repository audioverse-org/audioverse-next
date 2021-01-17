import SermonDetail, { SermonDetailProps } from '@containers/sermon/detail';
import { getSermon, getSermonDetailStaticPaths } from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';

export default SermonDetail;

interface StaticProps {
	props: SermonDetailProps;
	revalidate: number;
}

export async function getStaticProps({
	params,
}: {
	params: { id: string };
}): Promise<StaticProps> {
	const { id } = params;
	const { sermon } = await getSermon({ id }).catch(() => ({
		sermon: undefined,
	}));

	return {
		props: {
			sermon,
		},
		revalidate: 10,
	};
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getDetailStaticPaths(
		getSermonDetailStaticPaths,
		'sermons.nodes',
		(node, baseUrl) => `/${baseUrl}/sermons/${node.id}`
	);
}
