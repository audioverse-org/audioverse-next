import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import {
	getSermonListPageData,
	getSermonListPagePathsData,
} from '~containers/sermon/__generated__/list';
import SermonList, { SermonListProps } from '~containers/sermon/list';
import getIntl from '~lib/getIntl';
import { getLanguageIdByRoute } from '~lib/getLanguageIdByRoute';
import { getNumberedStaticPaths } from '~lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '~lib/getPaginatedStaticProps';

export default SermonList;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ i: string; language: string }>): Promise<
	GetStaticPropsResult<SermonListProps & IBaseProps>
> {
	const response = await getPaginatedStaticProps(
		params,
		async (variables) => {
			return getSermonListPageData({
				...variables,
				hasVideo: false,
			});
		},
		(d) => d.sermons.nodes,
		(d) => d.sermons.aggregate?.count,
	);

	const intl = await getIntl(getLanguageIdByRoute(params?.language));
	return {
		...response,
		props: {
			...response.props,
			filter: 'audio',
			title: intl.formatMessage({
				id: 'teachings__title',
				defaultMessage: 'All Teachings',
			}),
		},
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getNumberedStaticPaths(
		'teachings/audio',
		({ language }) => getSermonListPagePathsData({ language, hasVideo: false }),
		(d) => d?.sermons.aggregate?.count,
	);
}
