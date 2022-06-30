import {
	GetStaticPathsResult,
	GetStaticPropsContext,
	GetStaticPropsResult,
} from 'next';

import { IBaseProps } from '@containers/base';
import TrendingTeachings from '@containers/sermon/trending';
import { TrendingTeachingsProps } from '@containers/sermon/trending';
import { getLanguageRoutes } from '@lib/getLanguageRoutes';

import { trendingStaticProps } from './all';
import { makeTrendingSermonRoute } from '@lib/routes/makeTrendingSermonRoute';

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
		paths: baseRoutes.map((l) => makeTrendingSermonRoute(l, 'video')),
		fallback: false,
	};
}
