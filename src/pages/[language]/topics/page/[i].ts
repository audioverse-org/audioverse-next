import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import {
	getTopicListData,
	getTopicListPathsData,
} from '~src/containers/topic/__generated__/list';
import Topics, { CollectionListProps } from '~src/containers/topic/list';
import { getNumberedStaticPaths } from '~src/lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '~src/lib/getPaginatedStaticProps';

export default Topics;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{
	language: string;
	i: string;
}>): Promise<GetStaticPropsResult<CollectionListProps>> {
	return getPaginatedStaticProps(
		params,
		getTopicListData,
		(d) => d?.topics.nodes,
		(d) => d?.topics.aggregate?.count
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getNumberedStaticPaths(
		'topics',
		getTopicListPathsData,
		(d) => d?.topics.aggregate?.count
	);
}
