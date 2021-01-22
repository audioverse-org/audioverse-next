import TagDetail, { TagDetailProps } from '@containers/tag/detail';
import {
	getTagDetailPageData,
	getTagDetailPathsQuery,
} from '@lib/generated/graphql';
import { getDetailStaticPaths } from '@lib/getDetailStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';
import { makeTagRoute } from '@lib/routes';

export default TagDetail;

interface StaticProps {
	props: TagDetailProps;
	revalidate: number;
}

export async function getStaticProps({
	params,
}: {
	params: { slug: string; language: string; i: string };
}): Promise<StaticProps> {
	const { slug, language, i } = params;

	return getPaginatedStaticProps(
		language,
		i,
		async ({ language, offset, first }) => {
			const result = await getTagDetailPageData({
				language,
				offset,
				first,
				tagName: decodeURIComponent(slug),
			});

			return result?.recordings;
		}
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	// TODO: eventually switch to using API-supplied canonical URL
	return getDetailStaticPaths(
		getTagDetailPathsQuery,
		'tags.nodes',
		(languageRoute, node) => makeTagRoute(languageRoute, node.name)
	);
}
