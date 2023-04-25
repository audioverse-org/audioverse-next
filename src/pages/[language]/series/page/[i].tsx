import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import {
	getSeriesListPageData,
	getSeriesListPathsData,
} from '~containers/series/__generated__/list';
import SeriesList, { SeriesListProps } from '~containers/series/list';
import getIntl from '~lib/getIntl';
import { getLanguageIdByRoute } from '~lib/getLanguageIdByRoute';
import { getNumberedStaticPaths } from '~lib/getNumberedStaticPaths';
import { getPaginatedStaticProps } from '~lib/getPaginatedStaticProps';

export default SeriesList;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string; i: string }>): Promise<
	GetStaticPropsResult<SeriesListProps>
> {
	const intl = await getIntl(getLanguageIdByRoute(params?.language));
	return getPaginatedStaticProps(
		params,
		getSeriesListPageData,
		(d) => d.serieses.nodes,
		(d) => d.serieses.aggregate?.count,
		() => ({
			title: intl.formatMessage({
				id: 'seriesList__title',
				defaultMessage: 'All Series',
			}),
		})
	);
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return getNumberedStaticPaths(
		'series',
		getSeriesListPathsData,
		(d) => d.serieses.aggregate?.count
	);
}
