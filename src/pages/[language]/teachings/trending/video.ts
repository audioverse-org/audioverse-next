import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '~containers/base';
import TrendingTeachings, {
	TrendingTeachingsProps,
} from '~containers/sermon/trending';
import { getLanguageRoutes } from '~lib/getLanguageRoutes';
import root from '~lib/routes';

import { trendingStaticProps } from './all';

export default TrendingTeachings;

export async function getStaticProps({
	params,
}: GetStaticPropsContext<{ language: string }>): Promise<
	GetStaticPropsResult<TrendingTeachingsProps & IBaseProps>
> {
	return trendingStaticProps(params, 'video');
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	const baseRoutes = getLanguageRoutes();
	return {
		paths: baseRoutes.map((l) => root.lang(l).teachings.trending.video.get()),
		fallback: false,
	};
}
