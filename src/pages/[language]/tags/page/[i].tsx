import TagList, { TagListProps } from '@containers/tag/list';
import {
	getTagListPageData,
	getTagListPathsData,
} from '@lib/generated/graphql';
import { getNumberedStaticPaths } from '@lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '@lib/getPaginatedStaticProps';

export default TagList;

type GetStaticPropsArgs = {
	params: { language: string; i: string };
};

interface StaticProps {
	props: TagListProps;
	revalidate: number;
}

export async function getStaticProps({
	params,
}: GetStaticPropsArgs): Promise<StaticProps> {
	return getPaginatedStaticProps(
		params,
		getTagListPageData,
		(d) => d.tags.nodes,
		(d) => d.tags.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<StaticPaths> {
	return getNumberedStaticPaths(
		'tags',
		getTagListPathsData,
		(d) => d.tags?.aggregate?.count
	);
}
