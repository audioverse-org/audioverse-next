import TagDetail, { TagDetailProps } from '@containers/tag/detail';
import { getTagDetailPageData } from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

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
				tagName: slug,
			});

			return result?.recordings;
		}
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	// TODO: fix
	return getNumberedStaticPaths('', async () => 0);
}
